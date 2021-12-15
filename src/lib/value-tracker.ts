import { binaryInsert, getAmountOfPermutations, getAmountOfPermutationsWithoutRepetitions } from "$lib/utils";

export class ValueTracker {

  private resultSet = new Set<string>();
  private _results: string[] = [];
  get results(): string[] {
    return this._results;
  }

  private _totalComputations = 0;
  get totalComputations(): number {
    return this._totalComputations;
  }

  permutations = 0;
  permutationsWithoutRepetitions = 0;

  init(values: string[]) {
    this.permutations = getAmountOfPermutations(values);
    this.permutationsWithoutRepetitions = getAmountOfPermutationsWithoutRepetitions(values, this.permutations);
  }

  private comparator = (a: string, b: string) => a.localeCompare(b)

  add(value: string): boolean {
    this._totalComputations++;
    if (!this.resultSet.has(value)) {
      this._results = binaryInsert(this._results, value, this.comparator);
      return true;
    }
    return false;
  }

  addAll(values: Array<IteratorYieldResult<string>>): { someAdded: boolean, done: boolean } {
    let someAdded = false;
    let done = false;
    for (const value of values) {
      if (value.done) {
        done = true;
        break;
      }
      someAdded = someAdded || this.add(value.value);
    }
    return { someAdded, done }
  }

  reset() {
    this.permutations = 0;
    this.permutationsWithoutRepetitions = 0;
    this._totalComputations = 0;
    this.resultSet = new Set();
    this._results = [];
  }
}
