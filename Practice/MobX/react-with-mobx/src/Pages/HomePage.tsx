import { useRouterStore } from 'mobx-state-router';

const HomePage = () => {
    const routerStore = useRouterStore();

    const handleClick = () => {
        routerStore.goTo('department', {
            params: { id: 'electronics' },
        });
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick}>Go to Electronics</button>
        </div>
    );
};
export default HomePage;