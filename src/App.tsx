import "./App.css";
import "./index.scss";
import "./index.css";
import React from "react";

import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
