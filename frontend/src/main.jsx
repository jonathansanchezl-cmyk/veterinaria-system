import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/forms.css";
import "./styles/tables.css";
import "./styles/charts.css";
import "./styles/login.css";
import "./styles/modal.css";


ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <App/>

    </React.StrictMode>

);
