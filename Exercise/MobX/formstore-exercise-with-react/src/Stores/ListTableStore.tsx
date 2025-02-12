import {observable, action, makeObservable} from 'mobx';

class ListTableStore<T> {
    @observable data: T = {} as T;
    @observable loading: boolean = false;
    @observable page: number = 1;
    @observable totalPages: number = 1;
    @observable searchQuery: string = '';
    @observable url : string = "";
    @observable selectedRows : boolean[] = [];
    @observable selectAllCheck : boolean = false;

    private limit : number = 20;
    private selectedRowsCount : number = 0;
    private debounceTimer: NodeJS.Timeout | null = null;

    constructor(url: string, limit? :number) {
        makeObservable(this);
        if (url){
            this.url = `${url}`;
            this.fetchData().then()
        }
        if (limit){
            this.limit = limit ;
        }
        this.selectedRows = new Array(this.limit);
    }

    isSelectAll(){
        return this.selectAllCheck;
    }

    getKeyInData<K extends keyof T>( key : K ){
        return this.data[key];
    }

    isSelected( id : number ): boolean  {
        return this.selectedRows[id];
    }

    @action
    updateSelection(id : number){
        if (this.selectedRows[id]){
            this.selectedRows[id] = false;
            this.selectedRowsCount--;
            if (this.selectAllCheck) this.selectAllCheck = false;
        }else {
            this.selectedRows[id] = true;
            this.selectedRowsCount++;
            if (this.selectedRowsCount === this.selectedRows.length){
                this.selectAllCheck = true;
            }
        }
    }

    @action
    selectAll(){
        const array = this.selectedRows;
        for (let i = 0; i < array.length ; i++){
            if (!array[i]) array[i] = true;
        }
        this.selectedRows = array;
        this.selectAllCheck = true;
        this.selectedRowsCount = this.selectedRows.length;
    }

    @action
    deSelectAll(){
        this.selectedRows = new Array(this.limit);
        this.selectAllCheck = false;
        this.selectedRowsCount = 0;
    }

    @action
    setData(data : any, page?: number ){
        this.data = data;
        this.deSelectAll();
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

    isLoading() {
        return this.loading;
    }
}

export default ListTableStore;