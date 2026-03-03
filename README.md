1.) What file is acting as your “main screen” right now?
Index.tsx is acting as the main screen

2.)What is state here, and what does it control?
State is like a live-variable that can change over time and should cause the screen to re-render when it changes

3.)What happens when fetch receives a non-200 response?
When fetch receives a non-200 response, fetch() still resolves the promise and the browser shows 404 in Network.

4.)Why shouldn’t we assume the response JSON always has the fields we want?
We shouldn't assume the response JSON always has the fields we want because 404 responses return different structures, some fields may be nulll, apis can change and error responses dont match success responses.                                                              

