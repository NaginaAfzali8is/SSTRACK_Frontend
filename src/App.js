import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./config/router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;