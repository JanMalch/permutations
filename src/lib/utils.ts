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

export function getAmountOfPermutations(values: string[]): number {
  return factorial(values.length);
}

export function getAmountOfPermutationsWithoutRepetitions(values: string[], permutationsWithRepetitions: number = getAmountOfPermutations(values)): number {
  const counts = new Map<string, number>();
  for (const text of values) {
    counts.set(text, (counts.get(text) ?? 0) + 1);
  }
  return permutationsWithRepetitions / Array.from(counts.values()).reduce((acc, count) => acc * factorial(count), 1);
}

/**
 * @author https://stackoverflow.com/a/28755126
 */
export function binarySearch<T>(items: T[], target: T, comparator: (a: T, b: T) => number): number {
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
export function binaryInsert<T>(items: T[], target: T, comparator: (a: T, b: T) => number): T[] {
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

export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

type StringPredicate = (value: string) => boolean;
const alwaysTrue: StringPredicate = () => true;

function createPredicate(filterValues: string | string[] | undefined, callback: (filterValues: string[]) => StringPredicate): StringPredicate {
  if (filterValues == null) {
    return alwaysTrue;
  }
  return callback(coerceArray<string>(filterValues));
}

export function createFilterPredicate(parsedFilter: Record<string, any>): StringPredicate {
  const passesExcludedStartsCheck = createPredicate(parsedFilter.exclude?.s, (excludedStarts) => (result: string) => !excludedStarts.some(excludedStart => result.startsWith(excludedStart)));
  const passesIncludedStartsCheck = createPredicate(parsedFilter.s, (requiredStarts) => (result: string) => requiredStarts.some(requiredStart => result.startsWith(requiredStart)));
  const passesExcludedEndsCheck = createPredicate(parsedFilter.exclude?.e, (excludedEnds) => (result: string) => !excludedEnds.some(excludedEnd => result.endsWith(excludedEnd)));
  const passesIncludedEndsCheck = createPredicate(parsedFilter.e, (requiredEnds) => (result: string) => requiredEnds.some(requiredEnd => result.endsWith(requiredEnd)));
  const passesExcludedSubstringsCheck = createPredicate(parsedFilter.exclude?.text, (excludedSubstrings) => (result: string) => !excludedSubstrings.some(excludedStart => result.includes(excludedStart)));
  const passesIncludedSubstringsCheck = createPredicate(parsedFilter.text, (requiredSubstrings) => (result: string) => requiredSubstrings.some(requiredSubstring => result.includes(requiredSubstring)));

  return (result: string) =>
    passesExcludedStartsCheck(result) &&
    passesIncludedStartsCheck(result) &&
    passesExcludedEndsCheck(result) &&
    passesIncludedEndsCheck(result) &&
    passesExcludedSubstringsCheck(result) &&
    passesIncludedSubstringsCheck(result);
}
