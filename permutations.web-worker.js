let current;

/**
 * @author https://stackoverflow.com/q/24979179
 */
function* permutate(inputs) {
  if (inputs.length === 1) {
    yield inputs;
  } else {
    for (let i = 0; i < inputs.length; i++) {
      for (const perm of permutate(inputs.slice(0, i).concat(inputs.slice(i + 1)))) {
        yield [inputs[i]].concat(perm);
      }
    }
  }
}

self.addEventListener("message", event => {
  if (event == null) {
    return;
  }
  const { data } = event;
  switch (data.type) {
    case "INIT":
      current = permutate(data.inputs);
      postMessage({ type: "INIT", ok: true });
      break;
    case "NEXT":
      if (current == null) {
        postMessage({ type: "NEXT", ok: false });
      } else {
        const results = {
          done: false,
          values: [],
        };
        for (let i = 0; i < 200; i++) {
          const next = current.next();
          if (next.done) {
            results.done = true;
            break;
          }
          results.values.push(next.value.join(''));
        }

        postMessage({ type: "NEXT", ok: true, results });
      }
      break;
    case "RESET":
      current = undefined;
      postMessage({ type: "RESET", ok: true });
      break;
  }
});
