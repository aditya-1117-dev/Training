import {Child1, Child2} from "./Childs.tsx";
import {observer} from "mobx-react-lite";

export const Parent = observer((): JSX.Element  => {
    return(
        <>
            <h2> Childe 1 </h2>
            <Child1/>

            <h2> Childe 2 </h2>
            <Child2/>
        </>
    )
})