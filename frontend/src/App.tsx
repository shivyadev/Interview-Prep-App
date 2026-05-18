import "./App.css";
import Layout from "./components/layout";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

function App() {
  return (
    <BrowserRouter>
      <Layout />;
    </BrowserRouter>
  );
}

export default App;
