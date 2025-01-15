import {lazy, Suspense, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import log from "eslint-plugin-react/lib/util/log.js";

const pages = import.meta.glob('./pages/**/index.jsx');

const routes = Object.keys(pages).map((path) => {
  const routePath = path
      .replace('./pages', '')
      .replace('/index.jsx', '')
      .replace(/^\//, '');

  const Component = lazy(pages[path]);
  // console.log(Component, path, routePath);
  return { path: routePath === '' ? '/' : `/${routePath}`, Component };
});

function App() {
  const [count, setCount] = useState(0)

    return (
    <>
      <BrowserRouter>
        <div>
          <NavLink to="home">Home </NavLink>
          <NavLink to="about"> About </NavLink>
        </div>
        <br/><br/>

      {/*<div>*/}
      {/*  <a href="https://vite.dev" target="_blank">*/}
      {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
      {/*  </a>*/}
      {/*  <a href="https://react.dev" target="_blank">*/}
      {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
      {/*  </a>*/}
      {/*</div>*/}
      {/*<h1>Vite + React</h1>*/}
      {/*<div className="card">*/}
      {/*  <button onClick={() => setCount((count) => count + 1)}>*/}
      {/*    count is {count}*/}
      {/*  </button>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.jsx</code> and save to test HMR*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<p className="read-the-docs">*/}
      {/*  Click on the Vite and React logos to learn more*/}
      {/*</p>*/}


        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route key={"/"} path={""} element={<div> --- Root Path --- </div>}/>
            {routes.map(({path, Component}) => {
              console.log(path, Component);
              return <Route key={path} path={path} element={<Component/>}/>
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
    )
}

export default App;
