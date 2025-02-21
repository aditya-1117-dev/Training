import { useRouterStore } from 'mobx-state-router';

const DepartmentPage = () => {
    const routerStore = useRouterStore();
    console.log(routerStore)
    const { params } = routerStore.routerState;
    console.log(params)

    const handleClick = () => {
        routerStore.goTo('home');
    };

    return (
        <div>
            <h1>Welcome to {params.id}</h1>
            <button onClick={handleClick}>Go Home!</button>
        </div>
    );
};
export default DepartmentPage;