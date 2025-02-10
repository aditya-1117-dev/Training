import {observable, action, computed, makeObservable} from 'mobx';

class ListTableStore<T> {
    @observable data: T[] = [];
    @observable loading: boolean = false;
    @observable page: number = 1;
    @observable totalPages: number = 1;
    @observable searchQuery: string = '';
    @observable url : string = "";

    private debounceTimer: NodeJS.Timeout | null = null;

    constructor(url?: string) {
        makeObservable(this);
        if (url){
            this.url = `${url}`;
            this.fetchData(20).then()
        }
    }

    @action
    setData(data : any, totalPages: number, page: number ){
        this.data = data;
        this.totalPages = totalPages;
        this.page = page;
    }

    @action
    setLoading(status : boolean){
        this.loading = status
    }

    @action
    async fetchData(limit: number = 0, page: number = 1) {
        this.setLoading(true);
        try {
            const response = await fetch(`${this.url}/search?q=${this.searchQuery}&limit=${limit}&skip=${(page-1)*limit}`);
            const data = await response.json();
            const total = data.total | 0;
            this.setData(data, Math.ceil( (Number(total) | 0) / (limit | 1) ), page )
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    setSearchQuery(query: string, delay : number = 2000) {
        this.searchQuery = query;
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            if (this.url) this.fetchData().then();
        }, delay);
    }

    @action
    setCurrentPage( currentPage : number){
        this.page = currentPage;
        this.fetchData(20, currentPage).then();
    }

    @computed
    get isLoading() {
        return this.loading;
    }
}

export default ListTableStore;