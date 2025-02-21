import {browserHistory, createRouterState, HistoryAdapter, RouterStore,} from 'mobx-state-router';

const notFound = createRouterState('notFound');

export function initRouter() {

    const routes = [
        {
            name: 'home',
            pattern: '/',
        },
        {
            name: 'department',
            pattern: '/departments/:id',
        },
        {
            name: 'notFound',
            pattern: '/not-found',
        },
        {
            name: 'todoapp',
            pattern: '/todo'
        }
    ];

    const routerStore = new RouterStore(routes, notFound);

    // Observe history changes
    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}