# Computed Properties

Computed properties are one of my favorite features of Vue! Compared to Props, they can be more complex, so testing them can also a bit more involved.

We will take a look at a simple example, and discuss a few different approaches, and some general testing philosophy.

## The Component

The component we will test is the `<Numbers>` component. The numbers change, depending on the prop passed - valid options are `even` or `odd`.

The component looks like this:

```vue
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  parity: "odd" | "even";
}>();

const numbers = computed(() => {
  const evens: number[] = [];
  const odds: number[] = [];

  for (let i = 1; i < 10; i++) {
    if (i % 2 === 0) {
      evens.push(i);
    } else {
      odds.push(i);
    }
  }

  return props.parity === "odd" ? odds.join(", ") : evens.join(", ");
});
</script>

<template>
  <ul>
    <li v-for="n of numbers" :key="n">
      {{ n }}
    </li>
  </ul>
</template>
```

## What To Test?

This component has some complexity, but ultimately, the only thing that changes what is rendered is the `parity` prop. There are several approaches to testing this feature, though, depending on your philosophy. Let's take a look at each.

## Testing With Cypress - No Isolation

This particular example is simple enough to test using a Cypress Component Test:

```ts
import Numbers from "./Numbers.vue";

describe("<Numbers />", () => {
  it("renders", () => {
    cy.mount(Numbers, {
      props: {
        parity: "odd",
      },
    });

    cy.get("li").contains("1");
    cy.get("li").contains("3");
    cy.get("li").contains("5");
    cy.get("li").contains("7");
    cy.get("li").contains("9");
  });
});
```

This _passes_, but we can do better. Let's also assert:

- No even numbers are rendered
- No _additional_ odd numbers

```ts
import Numbers from "./Numbers.vue";

describe("<Numbers />", () => {
  it("renders", () => {
    cy.mount(Numbers, {
      props: {
        parity: "odd",
      },
    });

    for (const i of [1, 3, 5, 7, 9]) {
      cy.get("li").contains(i).should("exist");
    }

    for (const i of [-1, 0, 2, 4, 6, 8, 10, 11]) {
      cy.get("li").contains(i).should("not.exist");
    }
  });
});
```

This is more concise, _and_ a lot more thorough. The `shoud("exist")` in `cy.get("li").contains(i).should("exist")` is technically not needed, but I like the parallel between `should("exist")` and `should("not.exist")`. The test now doubles as documentation - it's clear what the intent of this component is.

Writing the test for `parity: "even"` is basically the same - I will leave this as an exercise. I would recomend just duplicating the test and reversing the conditions.

## More Complex Logic

Testing both the user interface and behavior using Cypress is reasonable for this trivial example, but in practice, components are usually not the bulk of the complexity in any given application - it's the domain knowledge and business logic. It can be beneficial, or sometimes essential, to test logic in an isolated fashion.

Good tests should be reslient to refactors - Cypress tests tend to be, since they test components from a user's point of view - behaviors, not implementation details.

In general, I like to separate my logic into plain old JavaScript functions, and then wrap the logic using my framework's reactivity primitives (Vue and React have composables and hooks, which are conceptually similar, and Angular uses RxJS).

Let's separate the logic from the user interface. The logic will go in a separate module, `numbers.ts`:

```ts
// numbers.ts
export type Parity = "odd" | "even";

export function numbers(parity: Parity): number[] {
  const evens: number[] = [];
  const odds: number[] = [];

  for (let i = 1; i < 10; i++) {
    if (i % 2 === 0) {
      evens.push(i);
    } else {
      odds.push(i);
    }
  }

  return parity === "odd" ? odds : evens;
}
```

No reactivity or user interface concerns here - it's plain old JavaScript. As a bonus, it's a pure function - easy to test and validate. You could test this with Cypress:

```ts
describe("numbers", () => {
  it("returns even numbers", () => {
    // ...
  });

  it("returns odd numbers", () => {
    // ...
  });
});
```

I tend to use a tool like [Jest](https://jestjs.io) or [Vitest](https://vitest.dev) for these types of tests. I tend to write a lot more tests around business logic, and I like to run those using a terminal based runner.

Cypress is designed and optimized for testing and debugging by mimicing user interactions such as clicking (`cy.get('button').click()`), typing (`cy.get('input').type('abc')`), etc. The user never directly interacts with the business logic, they interact with the _user interface_, so I don't find Cypress to be a good fit here.

The `<Numbers>` component is now vastly simplified:

```vue
<script lang="ts" setup>
import { computed } from "vue";
import type { Parity } from "./numbers.js";
import { getNumbers } from "./numbers.js";

const props = defineProps<{
  parity: Parity;
}>();

const numbers = computed(() => {
  return getNumbers(props.parity);
});
</script>

<template>
  <ul>
    <li v-for="n of numbers" :key="n">
      {{ n }}
    </li>
  </ul>
</template>
```

The test doesn't need any changes - this is expected, since we haven't actually changed the feature, just made a refactor. If we _did_ need to change the test, that could indicate a code smell - good tests are resilient and should survive a refactor.

## Conclusion

- Use a for loop to express many test cases concisely.
- Test simple computed properties via a user interface test (we use Cypress, but the concept is general).
- Simplify components by isolate business logic from reactivity and framework primitives to be easily testable.
