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
