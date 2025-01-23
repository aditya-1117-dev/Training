import {lazy, Suspense, useState} from 'react'
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import log from "eslint-plugin-react/lib/util/log.js";
import Layout from "./Layout.jsx";
import Shivam from "./pages/shivam/index.jsx";
import UserPage from "./pages/shivam/[userID]/index.jsx";

const pages = import.meta.glob('./pages/**/index.jsx');

const layouts = import.meta.glob('./pages/**/layout.jsx');

// in next the id or any req params as /path/{ID}
// to create path for that id we need to specify the name of jsx/folder in brackets [].js -- confirm once

const routes = Object.keys(pages).map((path) => {
    const routePath = path
        .replace('./pages', '')
        .replace('/index.jsx', '')
        .replace(/^\//, '')
        .replace(/\[([^\]]+)\]/g, ':$1');

    const layoutPath = path.replace('index.jsx', 'layout.jsx');


    const LayoutComponent = layouts[layoutPath] ? lazy(layouts[layoutPath]) : null;

    if(LayoutComponent) {
        const ResultCompoent = LayoutComponent;
        const currentPath = layoutPath;
        while(currentPath) {
            // /layout.js
            patentComp = func() => // /layout.js
            if(parentComp) {
                <ParentCaomp><resComp/> </ParentCaomp>
                restcomp = parentComp
            }
        }
    }

    const allParentLayouts = [];

    const parentLayoutPaths = routePath
        // .replace('./pages', '')
        // .replace('/index.jsx', '')
        // .replace(':', '')
        .split('/');

    let parentLayoutsRoute = './pages';

    parentLayoutPaths.map((parentPath)=>{
        parentLayoutsRoute += "/" + parentPath;
        const layoutRoute = parentLayoutsRoute + "/layout.jsx";
        // layoutRoute.replace(/:([^/]+)/g, '[$1]');
        if(layouts[layoutRoute]){
            allParentLayouts.push( { path : parentLayoutsRoute.replace('./pages', ''),
                                        layout : lazy(layouts[layoutRoute]) } );
            // console.log(lay)
        }

        console.log( parentLayoutsRoute.replace('./pages', '') , allParentLayouts )
    })
    // console.log(layoutPath, LayoutComponent)
    // console.log( path, routePath ,parentLayoutPaths);

    const Component = lazy(pages[path]);
    // console.log(Component, path, routePath);
    return { path: routePath === '' ? '/' : `/${routePath}`, Component, LayoutComponent, allParentLayouts };
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

                            {routes.map(({ path, Component, LayoutComponent, allParentLayouts }) => {
                                console.log(allParentLayouts);

                                // if(allParentLayouts.length){
                                //
                                //     let nestElement = <Route index element={<Component />} />;
                                //
                                //     for(let i = allParentLayouts.length-1; i>=0; i++ ){
                                //         const element = allParentLayouts[i];
                                //         console.log(element);
                                //         let layoutComponent;
                                //         if(i===0) {
                                //             layoutComponent = <Route path={element.path} element={<element.layout/>}> {nestElement} </Route>;
                                //         }else{
                                //             layoutComponent = <Route path={element.path} element={<element.layout/>}> {nestElement} </Route>;
                                //         }
                                //         nestElement = layoutComponent ;
                                //     }
                                //     return nestElement;
                                //
                                // }


                                if (LayoutComponent) {
                                    return (
                                        <Route key={path} path={path} element={<LayoutComponent />}>
                                            <Route index element={<Component />} />
                                        </Route>
                                    );
                                }
                                return <Route key={path} path={path} element={<Component />} />;
                                // return nestElement;
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




<Route key={"/"} path={"about"} element={ <Layout /> } >
    <Route key={"/"} path={"/informatib"} element={ <Layout /> } >

    </Route>
</Route>
