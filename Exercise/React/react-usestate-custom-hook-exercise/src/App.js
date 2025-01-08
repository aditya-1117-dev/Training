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

        <input type="text" name="name" value={get("name")} onChange={e => set("name", e.target.value)}/>
        <input type="text" name="age" value={get("age")} onChange={e => set("age", e.target.value)}/>
      </div>
  );
}

function InputComponent() {
    
}

export default App;
