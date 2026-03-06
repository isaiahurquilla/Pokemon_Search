1.) What file is acting as your “main screen” right now?
Index.tsx is acting as the main screen

2.)What is state here, and what does it control?
State is like a live-variable that can change over time and should cause the screen to re-render when it changes

3.)What happens when fetch receives a non-200 response?
When fetch receives a non-200 response, fetch() still resolves the promise and the browser shows 404 in Network.

4.)Why shouldn’t we assume the response JSON always has the fields we want?
We shouldn't assume the response JSON always has the fields we want because 404 responses return different structures, some fields may be nulll, apis can change and error responses dont match success responses.                                                              

5.)Where does “app truth” live right now?
It lives in the component's React state(the values stored in the useState hooks)

6.)What bug happens if you forget to set loading=false on failure?
The app will get stuck in loading mode forever

7.)What is the difference between rendering raw JSON vs. rendering a shaped object?
The difference is that a raw JSON dumps everything as is and rendering a shaped object only shows whats needed and is a lot cleaner

8.)Which part of the file is UI responsibility vs. logic responsibility?
Logic handles data fetching, validation, state updates and error handling. UI is responsible for rendering visual elements and displaying state to the user.

9.)List 3 different responsibilities currently inside index.tsx.
    -API/data responsibility
    -State management responsibility
    -UI/presentation responsibility

10.)If you wanted to reuse the Pokémon API logic in another screen, what would you do?
I’d extract the API logic into a reusable function or custom hook and import it in both screens.

11.)If you wanted to test the API parsing logic, how would you do it right now?
If I wanted to test the API Parsing logic, I would run the app, search  a pokemon name, inspect the logged JSON and confirm the UI shows the expected fields.

12.)Why is it a win that the service doesn’t import React?
Because it keeps the service portable and testable. The service becomes a plain TypeScript module with a stable interface.

13.)What is the contract of the service function (inputs/outputs/errors)?
The service function takes a Pokémon name string as input and returns a Promise containing the normalized Pokémon data. It either resolves with that data or throws an Error for invalid input, a failed request, or network/parse failures.


14.)What does a builder pattern buy you here?
A builder pattern gives you a clean, step-by-step way to construct a valid Pokemon object, and it keeps the transformation logic readable and easy to change without touching the UI.

15.)In what way is a model safer than raw API JSON?
A model is safer than raw API JSON because the model guarantees a consistent shape and types, so your UI isn’t relying on fragile, nested API fields that might be missing.

16.)What responsibilities does the controller own?
The Controller orchestrates the flow, owns UI-facing state, and exposes actions to the view

17.)Why is the controller a better place for input validation than the view?
The controller is a better place for input validation because validation is behavior/business logic. Keeping it in the controller makes it reusable, testable and keeps the view focused on display.

18.)What props does the view need?
    -The current input value (pokemonName)
    -A way to update input (onChangePokemonName)
    -A button action (onSearch)
    -UI state to render (loading, error, pokemon)

19.)What would break if the view tried to call the API directly?
If the view tried to all the API directly, then it'd break the seperation of concerns. This would force you to rewrite UI components instead of just updating the service/controller.

20.)Why should favorites live in the controller and not the view?
The favorites should live in the controller because favorites are state+behavior. 

21.)What does “derived state” mean for isFavorite?
This means that you don't store it seperately, you compute it from an existing state.

22.)Why is persistence implemented as a service?
Persistence is implemented as a service because it is an external side effect that should be reusable and isolated from UI logic so that you can swap AsyncStorage later without rewriting your controller/view

23.)What is the difference between “state” and “persisted state”?
State is the in-memory values used while the app is running. Persisted state is the version saved to disk so it can be restored after the app restarts.

24.)Why does this animation belong in the view layer?
This animation belongs in the view layer because animation is presentation/UI behavior. Keeping it in the view prevents controller/service from becoming UI dependent.

25.)What triggers the animation and why?
The trigger is pokemon changing from null to a real Pokemon object. That's when new results appear on screen, so resetting the animated values and starting the fade/spin there guarantees the animation plays every time a new Pokemon loads.