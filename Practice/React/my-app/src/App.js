import logo from './logo.svg';
import './App.css';
import ProductListing from "./components/productListing";
import React from "react";
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom';
import Game from "./components/game";
import Profile, {DomHandling} from "./components/pracctice";
import ComponentLifecycle from "./components/componentLifecycle";
import Parent from "./components/parent-child-re-rendering";
import RecipeList from "./components/pracctice";

function Welcome(props) {
    return <h1>Hello {props.name}</h1>;
}

function App() {
  return (
      <BrowserRouter>
          <Welcome name="Sara" />
          <Welcome name="Cahal" />
          <Welcome name="Edite" />
    {/*<div className="App">*/}
      {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo"/>*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*    className="App-link"*/}
        {/*    href="https://reactjs.org"*/}
        {/*    target="_blank"*/}
        {/*    rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
        <Link to="/product-listing">Go to Product Listing</Link> <br/>
        <Link to="/tic-tac-toe">Tic-Tac-Toe Game</Link> <br/>
        <Link to="/practice">Go to Practice Page</Link> <br/>
        <Link to="/domHandling">Go to Practice DOM handling Page</Link> <br/>
        <Link to="/lifecycle">Go to Lifecycle Page</Link> <br/>
        <Link to="/parent-child-re-rendering">Go to Parent Child Re-Rendering Page</Link> <br/>
      {/*</header>*/}

      <Routes>
        <Route path="/" element={<Welcome name="Home" />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/parent-child-re-rendering" element={<Parent />} />
        <Route path="/domHandling" element={<DomHandling />} />
          <Route path="/tic-tac-toe" element={<Game />} />
          <Route path="/practice" element={<Profile />} />
          <Route path="/lifecycle" element={<ComponentLifecycle />} />
      </Routes>
    {/*</div>*/}
      </BrowserRouter>
  );
}

export default App;
