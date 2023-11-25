import React from "react";
import './index.css'
import IndexRouter from "./router/IndexRouter";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
const app = () => {

  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <IndexRouter />
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  )
};

export default app;