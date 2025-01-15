import logo from './logo.svg';
import './App.css';
import ProductListing from "./components/productListing";
import React from "react";
import {BrowserRouter, Route, Routes, Link, NavLink} from 'react-router-dom';
import Game from "./components/game";
import Profile, {DomHandling, KeyForm} from "./components/pracctice";
import ComponentLifecycle from "./components/componentLifecycle";
import Parent from "./components/parent-child-re-rendering";
import RecipeList from "./components/pracctice";
import {Counter, Counter2, ParentH} from "./components/hooks";
import {EnhancedComponent} from "./components/HOC";
import {Products} from "./components/products.tsx";
import {NavLinkRenderProps} from "react-router-dom";

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
          <div>
              <NavLink to="HOC" className={({ isActive }) => (isActive ? 'Active' : 'Inactive') }> NavLink to Product Listing </NavLink>
              <NavLink to="product-listing" className={({ isActive }) => (isActive ? 'Active' : 'Inactive') }> NavLink to Product Listing </NavLink>
              <NavLink to="tic-tac-toe" className={({ isActive }) => (isActive ? 'Active' : 'Inactive') }> NavLink to tic tac toe </NavLink>
          </div>
          
        <Link to="/product-listing">Go to Product Listing</Link> <br/>
        <Link to="/HOC">Go to Higher Order Components</Link> <br/>
        <Link to="/tic-tac-toe">Tic-Tac-Toe Game</Link> <br/>
        <Link to="/practice">Go to Practice Page</Link> <br/>
        <Link to="/key">Go to key form Page</Link> <br/>
        <Link to="/domHandling">Go to Practice DOM handling Page</Link> <br/>
        <Link to="/lifecycle">Go to Lifecycle Page</Link> <br/>
        <Link to="/hooks">Go to Hooks Page</Link> <br/>
        <Link to="/hooks/additional">Go to Additional Hooks Page</Link> <br/>
        <Link to="/parent-child-re-rendering">Go to Parent Child Re-Rendering Page</Link> <br/>
        <Link to="/products">Products Practice</Link> <br/>
      {/*</header>*/}

      <Routes>
        <Route path="/" element={<Welcome name="Home" />} />
          <Route path="/HOC" element={<EnhancedComponent render={(obj)=> <div> {Object.entries(obj).map(([key,val])=><div>{key} : {val}</div> )} </div> } wrappedComponentProps={{name:"Adi", age:12}} hocPops={{hocName:"Enhanced-HOC"}} stateVariables={{counterValue:0, inputValue:""}} />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/parent-child-re-rendering" element={<Parent />} />
        <Route path="/domHandling" element={<DomHandling />} />
          <Route path="/tic-tac-toe" element={<Game />} />
          <Route path="/practice" element={<Profile />} />
          <Route path="/key" element={<KeyForm />} />
          <Route path="/hooks" element={<Counter />} />
          <Route path="/products" element={<Products  arr={[1,2,3]}/>} />
          <Route path="/hooks/additional" element={<> <ParentH /> <br/> <Counter2/> </>} />
          {/*<Route path="hooks" element={<Counter />} >*/}
          {/*    <Route path="additional" element={<> <ParentH /> <br/> <Counter2/> </>} /> /!* Not Working*!/*/}
          {/*</Route>*/} // Expired
          <Route
              loader={({ params }) => {
                  setTimeout(()=> console.log("its loader"), 10000)
                  return "Hello";
              }}
              path="/lifecycle" element={<ComponentLifecycle />} />
      </Routes>
    {/*</div>*/}
      </BrowserRouter>
  );
}

export default App;
