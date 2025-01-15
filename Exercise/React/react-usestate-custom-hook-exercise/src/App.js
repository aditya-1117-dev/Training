import React from "react";
import {useCustomStates} from "./components/customHooks";

function App() {
  const [get, set] = useCustomStates({ count: 0, name: "Aditya", age : 10 });
  console.log("Calledd=====================")
  return (
      <div>
        <h1>Count: {get("count")}</h1>
        <button onClick={()=> set("count", get("count")+1)}>Increment Value</button>
          <br/><br/>

          <InputComponent get={get} set={set} Key="name"/>
          <InputComponent get={get} set={set} Key="age"/>
        {/*<input type="text" name="age" value={get("age")} onChange={e => set("age", e.target.value)}/>*/}
      </div>
  );
}

function InputComponent({get, set, Key}) {
    return <input type="text" name={Key} value={get(Key)} onChange={e => set(Key, e.target.value)}/>
}

export default App;
