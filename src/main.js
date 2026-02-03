import "./styles/style.css";
import { App } from "./app/App";

const app = new App(document.querySelector("#app"));

window.__APP__ = app; // handy for debugging in console
