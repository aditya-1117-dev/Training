import React, {Component, useEffect, useState} from 'react';

function Child({childValue}){
    console.log('Child component rendered');
    // constructor() {
    //     super();
    //     console.log("Child Called");
    // }
    // render() {
        return <div>Child value: {childValue}</div>;
    // }
}

export default function Parent() {
    const [parentValue, setParentValue] = useState(0);
    const [childValue, setChildValue] = useState(0);

    useEffect(() => {
        // console.log("Components Mounted");
        return () => {
            console.log("Components Unmounted")
        }
    }, []);


    useEffect(() => {
        console.log("Components Updated");
    }, [parentValue, childValue]);


    console.log("Parent Re-rendered")
    return (
        <div>
            <button onClick={() => setParentValue(parentValue + 1)}>
                Increment Parent Value
            </button>
            <button onClick={() => setChildValue(childValue + 1)}>
                Increment Child Value
            </button>
            <Child childValue={childValue}/>
        </div>
    );
}

