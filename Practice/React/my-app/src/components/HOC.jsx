import React, {Fragment, Profiler} from "react";
import {useCustomStates} from "./custom-hooks";

export const EnhancedComponent = HigherOrderComponent(WrappedComponent);

function HigherOrderComponent(WrappedComponent) {
    function onRenderCallback(
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
    ) {
        // Aggregate or log render timings...
        console.log(`id : ${id} , phase  : ${phase} , actualDuration  : ${actualDuration}, baseDuration  : ${baseDuration}, startTime  : ${startTime}, commitTime  : ${commitTime}, interactions  : ${interactions} `);
    }
    return class extends React.Component {
        constructor(props) {
            super(props);
            console.log(this.props);
            this.state = {
            };
        }

        componentDidMount() {
            console.log('Component Mount')
        }

        componentWillUnmount() {
            console.log('Component Unmount')
        }

        render() {
            const {hocPops, wrappedComponentProps, stateVariables} = this.props;
            // console.log("Hoc Props : ",hocPops, "  Wrapped Props : ", wrappedComponentProps, "state variables : ", stateVariables);
            // console.log(stateVariables)
            return (
                <div style={{border: 'green solid', padding:"5%"}}>
                    {console.log("re-rendered : HOC")}
                    <Fragment>
                         {/*Fragment tag created just to wrap the  components*/}
                         {/*it disappears in DOM tree*/}
                        <h1>Inside HOC</h1>
                        {this.props.render(hocPops)}

                        <Profiler id="Panel" onRender={onRenderCallback} >
                        <WrappedComponent wrappedComponentProps={wrappedComponentProps} stateVariables={stateVariables} />
                        </Profiler>
                    </Fragment>
                    {/*<Fragment>*/}
                    {/*</Fragment>*/}
                </div>
            )
        }
    };
}

function WrappedComponent(props) {
    // const initialStates = props.stateVariables;

    const [get, set] = useCustomStates(props.stateVariables);
    console.log("re-rendered : Wrapped-Component")

    // console.log(props, props.stateVariables, props.wrappedComponentProps)
    return(
        <div style={{border: 'red solid', padding : "5%"}}>
            <h2>Wrapped Component</h2>
            {JSON.stringify(props)}

            <p>Counter : {get("counterValue")}</p>
            <button onClick={e=>set("counterValue", get("counterValue")+1)}>Increase Counter</button> <br/>
            <input type="text" value={get("inputValue")} onChange={e=> set("inputValue",e.target.value)}/>
        </div>
    );
}

