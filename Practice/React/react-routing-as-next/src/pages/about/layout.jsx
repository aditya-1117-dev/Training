import {Outlet} from "react-router-dom";

export default function AboutLayout() {
    console.log("Inside about layout");
    return (
        <>
            <h1> About Layout...</h1>
            <div className={"child-routes"}>
                <Outlet />
            </div>
        </>
    );
}