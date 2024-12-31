import React, {Component, useState} from 'react';

class Child extends Component{
    // console.log('Child component rendered');
    constructor() {
        super();
        console.log("Child Called");
    }
    render() {
        return <div>Child value:</div>;
    }
}

export default function Parent() {
    const [parentValue, setParentValue] = useState(0);
    // const [childValue, setChildValue] = useState(0);

    console.log("Parent Re-rendered")
    return (
        <div>
            <button onClick={() => setParentValue(parentValue + 1)}>
                Increment Parent Value
            </button>
            {/*<button onClick={() => setChildValue(childValue + 1)}>*/}
            {/*    Increment Child Value*/}
            {/*</button>*/}
            <Child />
        </div>
    );
}

