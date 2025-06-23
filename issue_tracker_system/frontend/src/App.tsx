import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={ <PageNotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
