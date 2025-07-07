import {Outlet} from "react-router-dom";

export default function ShivamLayout() {
    console.log("Inside Shivam layout");
    return (
        <>
            <h1> Shivam Layout...</h1>
            <div className={"child-routes"}>
                <Outlet />
            </div>
        </>
    );
}