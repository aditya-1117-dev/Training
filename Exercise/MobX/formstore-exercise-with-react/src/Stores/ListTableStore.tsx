import {observable, action, computed, makeObservable} from 'mobx';

class ListTableStore<T> {
    @observable data: T = {} as T;
    @observable loading: boolean = false;
    @observable page: number = 1;
    @observable totalPages: number = 1;
    @observable searchQuery: string = '';
    @observable url : string = "";
    @observable selectedRows : number[] = [];

    private limit : number = 20;
    private debounceTimer: NodeJS.Timeout | null = null;

    constructor(url?: string, limit? :number) {
        makeObservable(this);
        if (url){
            this.url = `${url}`;
            this.fetchData().then()
        }
        if (limit){
            this.limit = limit
        }
    }

    getKeyInData<K extends keyof T>( key : K ){
        return this.data[key];
    }

    isSelected( value : number ): boolean  {
        return this.selectedRows.includes(value);
    }

    @action
    updateSelection(id : number){
        if (this.selectedRows.includes(id) ){
            this.selectedRows = this.selectedRows.filter((val)=> val !== id);
        }else {
            this.selectedRows.push(id);
            if (this.selectedRows.length === this.limit){
                this.selectedRows.push(11111111);
            }
        }
    }

    @action
    selectAll(){
        for (let i = 0; i < this.limit ; i++){
            if ( !this.selectedRows.includes(i) ){
                this.selectedRows.push(i);
            }
        }
    }

    @action
    deSelectAll(){
        this.selectedRows = [];
    }

    @action
    setData(data : any, page?: number ){
        this.data = data;
        this.selectedRows = [];
        this.totalPages = Math.ceil( (Number(data.total) | 0) / (this.limit | 1) );
        if (page) this.page = page;
    }

    @action
    setLoading(status : boolean){
        this.loading = status
    }

    @action
    async fetchData(page: number = 1) {
        this.setLoading(true);
        try {
            const response = await fetch(`${this.url}/search?q=${this.searchQuery}&limit=${this.limit}&skip=${(page-1)*this.limit}`);
            const data = await response.json();
            this.setData(data, page )
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    setSearchQuery(query: string, delay : number = 1000) {
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
        this.fetchData(currentPage).then();
    }

    @computed
    get isLoading() {
        return this.loading;
    }
}

export default ListTableStore;