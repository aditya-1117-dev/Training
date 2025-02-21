import {Outlet} from "react-router-dom";

export default function InnerShivamLayout() {
    console.log("Inside Inner Shivam layout");
    return (
        <>
            <h1> Shivam Layout...</h1>
            <div className={"child-routes"}>
                <Outlet />
            </div>
        </>
    );
}