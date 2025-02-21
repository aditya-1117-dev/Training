import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
      <>
          <h1> Root Path Header Man...</h1>
          <div className={"child-routes"}>
              <Outlet />
          </div>
      </>
    );
}