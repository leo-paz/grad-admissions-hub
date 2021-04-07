import * as React from "react";
import * as ReactDOM from "react-dom";

import About from "./About";

test ("renders the correct heading", () => {
    const root = document.createElement("div");
    ReactDOM.render(<About/>,root);

    expect (root.querySelector("h1").textContent).toBe("About");
    // expect (root.querySelector("div").className).toBe("page");
})

test ("renders the component with proper div className", () => {
    const root = document.createElement("div");
    ReactDOM.render(<About/>,root);

    expect (root.querySelector("div").className).toBe("page");
})