import {action, makeObservable, observable} from 'mobx';

class ListTableStore<T> {
    @observable data: T[] = [];
    @observable loading: boolean = false;
    @observable page: number = 1;
    @observable totalPages: number = 1;
    @observable searchQuery: string = '';
    @observable url: string = "";
    @observable selectedRows: number[] = [];

    private response: T = {} as T;
    private keyForTableData: string = ``;
    private limit: number = 20;
    private debounceTimer: NodeJS.Timeout | null = null;

    constructor(url: string, keyForTableData?: string, limit?: number) {
        makeObservable(this);
        this.url = url;
        this.limit = limit || this.limit;
        this.keyForTableData = keyForTableData || this.keyForTableData;
        if (this.url) this.fetchData().then();
    }

    get numberOfSelectedItems(): number {
        return this.selectedRows.length;
    }

    isSelectAll() {
        return !this.loading && this.data.every((item: T) => {
            return this.selectedRows.includes(item.id);
        });
    }

    getKeyInData<K extends keyof T>(key: K) {
        return key === this.keyForTableData ? this.data : this.response[key];
    }

    isSelected(id: number): boolean {
        let index = this.selectedRows.indexOf(id);
        return index !== -1;
    }

    @action
    updateSelection(id: number) {
        let index = this.selectedRows.indexOf(id);
        if (index !== -1) {
            this.selectedRows.splice(index, 1);
        }else {
            this.selectedRows.push(id);
        }
    }

    @action
    selectAll() {
        this.data.forEach((item) => {
            if (!this.selectedRows.includes(item.id)) {
                this.selectedRows.push(item.id);
            }
        });
    }

    @action
    deSelectAll() {
        this.data.forEach((item) => {
            const index = this.selectedRows.indexOf(item.id);
            if (index !== -1) {
                this.selectedRows.splice(index, 1);
            }
        });
    }

    @action
    setData(data: any, page?: number) {
        this.response = data;
        this.data = data[this.keyForTableData] || this.data;
        this.totalPages = Math.ceil((Number(data.total) | 0) / (this.limit | 1));
        if (page) this.page = page;
    }

    @action
    setLoading(status: boolean) {
        this.loading = status
    }

    @action
    async fetchData(page: number = 1) {
        this.setLoading(true);
        try {
            const response = await fetch(`${this.url}/search?q=${this.searchQuery}&limit=${this.limit}&skip=${(page - 1) * this.limit}`);
            const data = await response.json();
            this.setData(data, page)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            this.setLoading(false);
        }
    }

    @action
    setSearchQuery(query: string, delay: number = 1000) {
        this.searchQuery = query;
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        this.debounceTimer = setTimeout(() => {
            if (this.url) this.fetchData().then();
        }, delay);
    }

    @action
    setCurrentPage(currentPage: number) {
        this.page = currentPage;
        this.fetchData(currentPage).then();
    }

    isLoading() {
        return this.loading;
    }
}

export default ListTableStore;