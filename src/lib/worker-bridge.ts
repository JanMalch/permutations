import { browser } from '$app/env';
import workerURL from '../../static/permutations.web-worker.js?url';

const worker = browser ? new Worker(workerURL) : null;

export function initGenerator(inputs: any[]): Promise<void> {
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', ({ data: { ok } }) => {
      if (ok) {
        resolve()
      } else {
        reject()
      }
    }, { once: true });
    worker.postMessage({
      type: 'INIT',
      inputs
    })
  });
}

export function getNextValue(): Promise<IteratorYieldResult<string[]>> {
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', ({ data: { ok, result } }) => {
      if (ok) {
        resolve(result)
      } else {
        reject()
      }
    }, { once: true });
    worker.postMessage({
      type: 'NEXT'
    })
  });
}

export function resetGenerator(): Promise<void> {
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', ({ data: { ok } }) => {
      if (ok) {
        resolve()
      } else {
        reject()
      }
    }, { once: true });
    worker.postMessage({
      type: 'RESET'
    })
  });
}
