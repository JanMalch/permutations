<script lang="ts">
  import { coerceArray, createFilterPredicate } from "$lib/utils";
  import { ValueTracker } from "$lib/value-tracker";
  import { getNextValue, getNextValues, initGenerator, resetGenerator } from "$lib/worker-bridge";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import searchQuery, { ISearchParserDictionary, SearchParserOffset } from "search-query-parser";

  let input = "Hello \" \" \"my friend\"!";
  let filter = "";
  let started = false;
  let paused = false;
  let done = false;
  let results = [];
  let totalComputations = 0;
  let permutations = 0;
  let permutationsWithoutRepetitions = 0;

  const valueTracker = new ValueTracker();

  $: parsedInput = parseInput(input);
  $: {
    valueTracker.init(parsedInput.text);
    permutations = valueTracker.permutations;
    permutationsWithoutRepetitions = valueTracker.permutationsWithoutRepetitions;
  }
  $: parsedFilter = parseFilter(filter);
  $: filterPredicate = createFilterPredicate(parsedFilter);
  $: filteredResults = !filter ? results : results.filter(filterPredicate);
  $: uniqueInputCount = new Set(parsedInput.text).size;

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

  async function start() {
    started = true;
    done = false;
    await initGenerator(parsedInput.text);
    next();
  }

  async function next() {
    // Technically the permutations could be divided by the bulk size,
    // but having it like this doesn't hurt performance and instead
    // prevents accidental errors when the bulk size in the web worker changes.
    for (let i = 0; i <= valueTracker.permutations; i++) {
      if (paused) {
        break;
      }
      const result = await getNextValues();
      if (result.done) {
        done = true;
        break;
      }
      if (valueTracker.addAll(result.values)) {
        results = valueTracker.results.slice(0);
      }
      totalComputations = valueTracker.totalComputations;
    }
  }

  function resume() {
    paused = false;
    next();
  }

  function pause() {
    paused = true;
  }

  function reset() {
    started = false;
    paused = false;
    totalComputations = 0;
    valueTracker.reset();
    valueTracker.init(parsedInput.text)
  }
</script>

<section id="input">

  <textarea bind:value={input} disabled="{started}" aria-label="Main input"></textarea>

  <div>&darr;</div>

  <div id="parsed-inputs">
    {#each parsedInput.text as input}
      <span>{input}</span>
    {/each}
  </div>

  <div id="analysis">
    <strong>{uniqueInputCount.toLocaleString()} of {parsedInput.text.length.toLocaleString()}</strong> elements are
    unique.<br />
    There are {permutations.toLocaleString()} possible permutations<br/>
    and <strong>{permutationsWithoutRepetitions.toLocaleString()} without repetitions</strong>.
  </div>

  <div id="input-actions">
    {#if !started}
      <button on:click={start}>Start</button>
      <button disabled>Pause</button>
    {:else}
      {#if done}
        <button on:click={reset}>Reset</button>
        <button disabled>Done!</button>
        {:else}
        {#if paused}
          <button on:click={reset}>Reset</button>
          <button on:click={resume}>Resume</button>
        {:else}
          <button disabled>Reset</button>
          <button on:click={pause}>Pause</button>
        {/if}
        {/if}
    {/if}
  </div>
</section>


<section id="output">
  <div id="output-options">

    <!-- TODO: validator: all chars must be included in textarea input to ignore case matching (did you mean _uppercase_ A?) -->

    <input placeholder="Filter results that include, -exclude, s:tart or e:nd with ..." bind:value={filter} id="filter">

  </div>
  <div id="progress-bar">
    { (valueTracker.permutations - totalComputations).toLocaleString() } left to check
    <div role="progressbar"
         aria-valuenow="{totalComputations}"
         aria-valuemin="{0}"
         aria-valuemax="{valueTracker.permutations}"
         style="width: {totalComputations * 100 / valueTracker.permutations}%">
      { totalComputations.toLocaleString() } computed
    </div>
  </div>

  {#if started}
  <div id="stats">
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
         height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff">
      <g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
    <small>{filteredResults.length.toLocaleString()} / {results.length.toLocaleString()}</small>
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
        padding: 0 8px;
    background: var(--primary-color);
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
