import {lazy, Suspense, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import log from "eslint-plugin-react/lib/util/log.js";
import Layout from "./Layout.jsx";

const pages = import.meta.glob('./pages/**/index.jsx');

const layouts = import.meta.glob('./pages/**/layout.jsx');

const routes = Object.keys(pages).map((path) => {
  const routePath = path
      .replace('./pages', '')
      .replace('/index.jsx', '')
      .replace(/^\//, '');

  const layoutPath = `./pages/${routePath}/layout.jsx`;
  const LayoutComponent = layouts[layoutPath] ? lazy(layouts[layoutPath]) : null;
  // console.log(layoutPath, LayoutComponent)

  const Component = lazy(pages[path]);
  // console.log(Component, path, routePath);
  return { path: routePath === '' ? '/' : `/${routePath}`, Component, LayoutComponent };
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

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route key={"/"} path={""} element={ <Layout /> } >

              {routes.map(({ path, Component, LayoutComponent }) => {
                if (LayoutComponent) {
                  return (
                      <Route key={path} path={path} element={<LayoutComponent />}>
                        <Route index element={<Component />} />
                      </Route>
                  );
                }
                return <Route key={path} path={path} element={<Component />} />;
              })}

            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
    )
}

export default App;


// console.log( routes);
// Object.keys(layouts).map((path)=>{
//   const routePath = path
//       .replace('./pages', '')
//       .replace('/layout.jsx', '');
//
//   let routesWithLayout =  routes.map((element,index)=> {
//     if (element["path"] === routePath){
//       // console.log(element["path"], " - ", routePath, " - ", index)
//       element["LayoutComponent"] = layouts[path];
//       routes[index] = element;
//     }
//     return element;
//   } );
//
//   console.log(routesWithLayout, routes)
//
// });
