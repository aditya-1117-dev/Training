import React, { Component } from 'react';

class ComponentLifecycle extends Component {
    constructor(props) {
        console.log("Constructor called : ComponentLifecycle");
        super(props);
        this.state = {
            showComponent: true
        };
    }

    toggleComponent = () => {
        this.setState({ showComponent: !this.state.showComponent });
    };

    render() {
        return (
            <div>
                <button onClick={this.toggleComponent}>
                    Toggle MyComponent
                </button>
                {this.state.showComponent && <MyComponent />}
            </div>
        );
    }
}

export default ComponentLifecycle;


class MyComponent extends Component {
    constructor(props) {
        super(props);
        console.log("Constructor called : MyComponent");
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        console.log("componentDidMount called : MyComponent");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate called : MyComponent");
        console.log("Previous state:", prevState.count);
        console.log("Current state:", this.state.count);
    }

    componentWillUnmount() {
        console.log("componentWillUnmount called : MyComponent");
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        console.log("Render called");
        return (
            <div>
                <h1>My Component</h1>
                <p>Count: {this.state.count}</p>
                <button onClick={this.handleClick}>Increment Count</button>
            </div>
        );
    }
}