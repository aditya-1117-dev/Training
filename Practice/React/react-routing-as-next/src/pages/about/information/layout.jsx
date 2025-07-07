import {Outlet} from "react-router-dom";

export default function InformationLayout() {
    return (
        <>
            <h1> Information Layout...</h1>
            <div className={"child-routes"}>
                <Outlet />
            </div>
        </>
    );
}