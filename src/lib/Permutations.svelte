<script lang="ts">
  import { getNextValue, initGenerator, resetGenerator } from "$lib/worker-bridge";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import searchQuery, { ISearchParserDictionary, SearchParserOffset } from "search-query-parser";

  let input = "Hello \" \" \"my friend\"!";
  let filter = "";
  let loading = false;
  let done = false;
  let initialised = false;
  let xNext = 100;
  let totalComputations = 0;

  let _results = new Set();
  let results = [];

  $: parsedInput = parseInput(input);
  $: parsedFilter = parseFilter(filter);
  $: filteredResults = !filter ? results : results.filter(result => {
    if (parsedFilter.exclude.s != null && coerceArray<string>(parsedFilter.exclude.s).some(excludedStart => result.startsWith(excludedStart))) {
      return false;
    }
    if (parsedFilter.s != null && coerceArray<string>(parsedFilter.s).every(requiredStart => !result.startsWith(requiredStart))) {
      return false;
    }
    if (parsedFilter.exclude.e != null && coerceArray<string>(parsedFilter.exclude.e).some(excludedEnd => result.endsWith(excludedEnd))) {
      return false;
    }
    if (parsedFilter.e != null && coerceArray<string>(parsedFilter.e).every(requiredEnd => !result.endsWith(requiredEnd))) {
      return false;
    }
    if (parsedFilter.exclude.text != null && coerceArray<string>(parsedFilter.exclude.text).some(excludedText => result.includes(excludedText))) {
      return false;
    }
    if (parsedFilter.text != null && coerceArray<string>(parsedFilter.text).every(requiredText => !result.includes(requiredText))) {
      return false;
    }
    return true;
  });
  $: uniqueInputCount = new Set(parsedInput.text).size;
  $: maxPermutationsWithRepetitions = factorial(parsedInput.text.length);
  $: maxPermutations = maxPermutationsWithRepetitions / individualCounts().reduce((acc, count) => acc * factorial(count), 1);

  function coerceArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
  }

  function factorial(value: number): number {
    if (value <= 1) {
      return 1;
    }
    let result = value;
    while (value > 1) {
      value--;
      result *= value;
    }
    return result;
  }

  function individualCounts(): number[] {
    const counts = new Map<string, number>();
    for (const text of parsedInput.text) {
      counts.set(text, (counts.get(text) ?? 0) + 1);
    }
    return Array.from(counts.values());
  }

  function parseInput(query: string): { [p: string]: any; offsets?: SearchParserOffset[]; exclude?: ISearchParserDictionary; text: string[] } {
    const parsed = searchQuery.parse(query, {
      tokenize: true,
      offsets: false
    });
    const text: string[] = parsed.text == null ? [] :
      Array.isArray(parsed.text) ? parsed.text : [parsed.text];
    const initial: string[] = parsed.exclude.text == null ? [] :
      coerceArray<string>(parsed.exclude.text).flatMap(text => text.split("")).concat(["-"]);
    return {
      ...parsed,
      text: text.reduce<string[]>((acc, str) => {
        if (str === "undefined:undefined") {
          return acc;
        }
        if (str.includes(" ")) {
          acc.push(str);
        } else {
          acc.push(...str.split(""));
        }
        return acc;
      }, initial)
    };
  }

  function parseFilter(query: string) {
    return searchQuery.parse(query, {
      keywords: ["s", "e"],
      tokenize: true,
      offsets: false
    });
  }

  async function init() {
    loading = true;
    await initGenerator(parsedInput.text).then(() => {
      filter = "";
      done = false;
      loading = false;
      initialised = true;
      _results = new Set();
      results = [];
      xNext = 100;
      totalComputations = 0;
    });
    await next();
    xNext = Math.floor(maxPermutations * 0.1);
  }

  /**
   * @author https://stackoverflow.com/a/28755126
   */
  function binarySearch<T>(items: T[], target: T, comparator: (a: T, b: T) => number): number {
    let l = 0;
    let h = items.length - 1;
    let m;
    let comparison;
    while (l <= h) {
      m = (l + h) >>> 1; /* equivalent to Math.floor((l + h) / 2) but faster */
      comparison = comparator(items[m], target);
      if (comparison < 0) {
        l = m + 1;
      } else if (comparison > 0) {
        h = m - 1;
      } else {
        return m;
      }
    }
    return ~l;
  }

  /**
   * @author https://stackoverflow.com/a/28755126
   */
  function binaryInsert<T>(items: T[], target: T, comparator: (a: T, b: T) => number): T[] {
    const result = items.slice(0);
    let i = binarySearch(result, target, comparator);
    if (i >= 0) { /* if the binarySearch return value was zero or positive, a matching object was found */
      return result;
    } else { /* if the return value was negative, the bitwise complement of the return value is the correct index for this object */
      i = ~i;
    }
    result.splice(i, 0, target);
    return result;
  }

  async function next() {
    loading = true;
    const initialXNext = xNext;
    let remainingPermutations = maxPermutations - results.length;
    for (let i = 0; i < initialXNext;) {
      const result = await getNextValue();
      if (result.done) {
        done = true;
        break;
      }
      totalComputations++;
      const value = result.value.join("");
      if (!_results.has(value)) {
        _results.add(value);
        results = binaryInsert(results, value, (a, b) => a.localeCompare(b));
        i++;
          xNext = Math.min(xNext, --remainingPermutations);
      }
    }
    if (!done) {
      done = results.length === maxPermutations;
    }
    loading = false;
  }


  function reset() {
    loading = true;
    resetGenerator().then(() => {
      filter = "";
      done = false;
      initialised = false;
      loading = false;
      _results = new Set();
      results = [];
      xNext = 100;
      totalComputations = 0;
    });
  }
</script>

<section id="input">

  <textarea bind:value={input} disabled="{loading || initialised}" aria-label="Main input"></textarea>

  <div>&darr;</div>

  <div id="parsed-inputs">
    {#each parsedInput.text as input}
      <span>{input}</span>
    {/each}
  </div>

  <div id="analysis">
    <strong>{uniqueInputCount.toLocaleString()} of {parsedInput.text.length.toLocaleString()}</strong> elements are
    unique.<br />
    There are {maxPermutationsWithRepetitions.toLocaleString()} possible permutations<br/>
    and <strong>{maxPermutations.toLocaleString()}  without repetitions</strong>.
  </div>

  <div id="input-actions">
    <button id="init" on:click={init} disabled="{loading || initialised}">Init</button>
    <button id="reset" on:click={reset} disabled="{loading || !initialised}">Reset</button>
  </div>
</section>


<section id="output">
  <div id="output-options">

    <!-- TODO: validator: all chars must be included in textarea input to ignore case matching (did you mean _uppercase_ A?) -->

    <input placeholder="Filter results that include, -exclude, s:tart or e:nd with ..." bind:value={filter} id="filter"
           disabled="{!initialised}">

    <div id="x-next">
      <button on:click={() => xNext = Math.max(1, xNext - Math.floor(maxPermutations * 0.1))}
              disabled="{!initialised || done || loading || (xNext === 1)}"
              class="xnext-control">-
      </button>
      <input placeholder="Next ..." bind:value={xNext} type="number" max="{maxPermutations}" min="{1}"
             disabled="{!initialised || done || loading}">
      <button on:click={() => xNext = Math.min(maxPermutations - results.length, xNext + Math.floor(maxPermutations * 0.1))}
              disabled="{!initialised || done || loading || (xNext === maxPermutations - results.length)}" class="xnext-control">+</button>
    </div>
    <button on:click={next} disabled="{!initialised || done || loading}"
            id="next">{ loading ? 'Computing ...' : done ? 'Done!' : 'Load more'}</button>
  </div>

  <div id="stats">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
         height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
      <g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
    <small>{filteredResults.length.toLocaleString()} / {results.length.toLocaleString()}</small>
  </div>

  {#if loading}
  <div id="progress-bar">
    { (maxPermutationsWithRepetitions - totalComputations).toLocaleString() } left to check
    <div role="progressbar"
         aria-valuenow="{totalComputations}"
         aria-valuemin="{0}"
         aria-valuemax="{maxPermutationsWithRepetitions}"
         style="width: {totalComputations * 100 / maxPermutationsWithRepetitions}%">
      { totalComputations.toLocaleString() } computed
    </div>
  </div>
  {/if}

  {#if filteredResults.length > 0}
    <VirtualList items={filteredResults} let:item itemHeight="{32}" height="70vh">
      <div role="listitem">{item}</div>
    </VirtualList>
  {/if}
</section>


<style lang="css">
    #input {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 32px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    #output {
        padding: 32px;
    }

    #parsed-inputs {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    #parsed-inputs > span {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        background-color: rgba(255, 255, 255, 0.2);
    }


    #output-options {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
    }

    #filter {
        flex: 1;
    }

    #x-next {
        display: flex;
        align-items: center;
    }

    #x-next input {
        width: 10ch;
        text-align: center;
    }

    div[role=listitem] {
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    :global(svelte-virtual-list-viewport) {
        border: 1px solid rgba(255, 255, 255, 0.12);
    }

    button {
        outline: none;
        border: none;
        padding: 8px 16px;
        transition: all 0.22s;
    }

    button:not(:disabled) {
        background-color: #5db785;
        color: #202124;
        cursor: pointer;
    }


    button:not(:disabled):hover {
        filter: brightness(120%);
    }

    input:disabled,
    button:disabled,
    textarea:disabled {
        background: transparent;
        border: 1px solid #505050;
        color: #505050;
    }

    #x-next input:disabled {
        border-left: none;
        border-right: none;
    }

    #progress-bar {
        position: relative;
        height: 16px;
        width: 100%;
        background: #808080;
        font-size: 0.7em;
        margin-bottom: 16px;
        text-align: right;
        padding: 0 8px;
        line-height: 16px;
    }

    #progress-bar > div {
        position: absolute;
        top: 0;
        left: 0;
        background: var(--primary-color);
        padding: 0 8px;
        white-space: nowrap;
    }

    #stats {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 24px 0 8px;
        padding-right: 8px;
    }

    #analysis {
        text-align: center;
        line-height: 1.65;
    }

    @media only screen and (max-width: 599px) {
        #output {
            padding: 32px 16px;
        }

        #parsed-inputs {
            justify-content: center;
        }
    }
</style>
