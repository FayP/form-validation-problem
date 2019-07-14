## Technology Decision

I chose to keep the form validation in native JS and HTML5. This meant it was compatiable across all browsers, very fast and lightweight. As this is only a small application the need to bring in heavier frameworks seemed like overkill for something so simple. If this were part of a bigger application then a framework such as react etc may be more suitable.

#### Documentation

To me the tests provide the best documentation for the validation rules. This way the documentation doesn't go stale if they change, new tests should be added to cover the new rules and any that are no longer needed can be removed.

#### Accessibility

I've added some aria tags that I believe are applicable to the DOM nodes in the `index.html` file.

#### Progressive enhancement

I thought this was fairly important for such a small form that it could be usable even if a browser didn't have javascript available. This is why I chose to add the validation rules that I could in the DOM nodes and not rely on JavaScript solely.

#### Browser support

This version would be usable in all modern browsers as it's written in ES5. I chose not to bring in any compilers and rather than use ES6 features that are not available across the board in the most popular browsers. I thought ES5 was more suited to solving this problem.

#### Testing

I wanted to have a try at writing some Jest tests for this. I'd never written tests for native JS code before and it was really quick to set up so why not.

#### Tooling

I'm a big believer of only using tools when you need to. Thats why even though I brought in the Jest framework for testing I didn't feel the need for much other tooling around this. A few thinsg I would consider if I were to spend some more time on this would be linting, perhaps E2E tests with tools such as test cafe and maybe some CSS compiler such as SASS.
