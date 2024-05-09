0.4: uusi muistiinpano

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
Note right of browser: The browser sends the information regarding the new note to be created
    server-->>server:  The new note is created inside the server
    server-->>browser: The server redirects the browser to the notes page
    deactivate server
Note right of browser: The notes page is fetched and rendered as in the example chart
```
0.5: Single Page App

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    browser->>browser: The JavaScript code that fetches the JSON from the server is executed
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "SPA", date: "2024-05-08T19:28:33.516Z"}, {content: "hi", date: "2024-05-08T19:32:56.184Z"},…]
    deactivate server    

    browser->>browser: The callback function for rendering the notes is executed
```
0.6: Uusi muistiinpano
```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
Note right of browser: The browser sends the information regarding the new note to be created
    server-->>server:  The new note is created inside the server
    server-->>browser: {content: "Indeed", date: "2024-05-09T09:46:24.805Z"}
Note left of server: The data of the created note is sent back in JSON alongside {message: "note created"}
    deactivate server
Note right of browser: The notes page is fetched and rendered as in the 0.5 chart now with the new note
```
