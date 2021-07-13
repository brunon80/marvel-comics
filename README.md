# Marvel challange

## Functional requirements

- When I open the page I want to see a list of all Marvel’s released comic books covers ordered from most recent to the oldest so I can scroll trough the the Marvel universe;
- When I see the list of comics I want to be able to search by character (eg. `deadpool`) so that I can find my favorite comics;
- When I see the list of comics I want to be able to upvote any of them so that the most popular are easy to find in the future.

[Link to a GIF for final result](https://i.imgur.com/zhk7jjE.gif)

## Architecture

The architecture was based on events, more precisely on the page events and on the url parameter that represents the character, if any of these two elements vary the page will react without the need for interaction.

This makes it possible, for example, to share a link of a certain character on a certain page without the need to manually browse N pages by clicking N times on the next page button.

Functions were reused as far as possible and constructor functions were created to abstract the real data obtained from the marvel API from that used in the screen.

## Stylesheet

The scss was used instead of the simple css because of features like inheritance and a better readability of pseudo classes, in addition, CSS Modules Stylesheet was used with the advantage of avoiding class name collisions.

## Organization

In this project, a simplification of the atomic design pattern was used, fundamental components such as inputs, texts or buttons would be in the atoms folder, header, sibebars and elements such as the comic, which are often formed by atoms, in molecules and the page itself it would be joining of molecules.

## State and reactivity storage

For this project, I used only the React Context API and hooks to access the data contained in the context as well as some functions that allow an active interaction with the store, the biggest advantage of this model is the ability to use closures where it is possible to encapsulate the implementation, just exposing some functions, keeping others private in context.

## Tests

The tests were organized in the same way as the folders inside /src, they were tested:
- Atoms
- Molecules
- Pages
- Interaction simulation
- Navigation simulation
- Research simulation
- Hooks
- Context API

## Responsiveness

The application can be used perfectly on a mobile device of any screen size.

## Improvements

More decoupling in the context API (possibly creating a hook that abstracts the logic)

Greater test coverage, the tests are simple, but show well all testable elements and give a preview of what to test.

More snapshot tests

## Comments

My git history is pretty bad, I'd like to use this space to comment that in my usual workflow I don't commit that big and in such a small amount, but given the time conditions I ended up neglecting it.