import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    @observable formData: T = {} as T;
    @observable validateKeys: { [K in keyof T]: boolean | boolean[] } = {} as { [K in keyof T]: boolean };
    @observable errors: { [K in keyof T]?: string } | any = {} as { [K in keyof T]?: string };
    @observable isSubmitted: boolean = false;
    @observable onSubmit: Function = () => {};
    private errorMessage: string = "REQUIRED";

    constructor(initialState: T, onSubmit?: Function) {
        makeObservable(this);
        if (initialState) {
            this.formData = initialState;
        }
        if (onSubmit) {
            this.onSubmit = onSubmit;
        }
    }

    hasKey<K extends keyof T>(key: K): boolean {
        return typeof this.formData === 'object'
            ? (this.formData
                ? this.formData.hasOwnProperty(key)
                : false)
            : false;
    }

    @action
    setOnSubmitCallBack(onSubmit: Function) {
        this.onSubmit = onSubmit;
    }

    @action
    setValue<K extends keyof T>(key: K, value: T[K], index?: number) {
        if (typeof index === "number"){
            Array.isArray(this.formData[key])
                ? this.formData[key][index] = value
                : 0;
            if (this.errors[key] && this.errors[key][index]){
                delete this.errors[key][index];
            }
        }else {
            this.formData[key] = value;
            if (this.errors[key]){
                this.errors[key] = "";
            }
        }
    }

    @action
    pushValue<K extends keyof T>(key: K, value: T[K]) {
        if (Array.isArray(this.formData[key])) {
            const array = this.formData[key];
            array.push(value);
            this.setValue(key, array);
        }
    }

    @action
    removeItemFromArray<K extends keyof T>(key: K, index: number) {
        if (Array.isArray(this.formData[key])) {
            this.formData[key] = this.formData[key].filter((value: T[K], idx) => index != idx) as T[K];
        }
    }

    @action
    setRequired<K extends keyof T>(key: K, status: boolean, index?: number) {
        if (typeof index === "number") {
            if (!Array.isArray(this.validateKeys[key])) this.validateKeys[key] = [];
            this.validateKeys[key][index] = status;
        } else {
            this.validateKeys[key] = status;
        }
    }

    @action
    setSubmissionStatus(status: boolean) {
        this.isSubmitted = status;
    }

    @action
    resetForm() {
        for (const key in this.formData) {
            if (Array.isArray(this.formData[key])) {
                if(this.formData[key].length > 0){
                    if (typeof this.formData[key][0]==="number"){
                        this.formData[key] = this.formData[key].map(()=> 0);
                    }else if (typeof this.formData[key][0]==="string"){
                        this.formData[key] = this.formData[key].map(()=> ``);
                    }
                }
            } else {
                if (typeof this.formData[key]==="number"){
                    this.formData[key] = 0 as T[typeof key];
                }else{
                    this.formData[key] = "" as T[typeof key];
                }
            }
        }
        this.errors = {};
        if (this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        if (this.validate()) {
            this.setSubmissionStatus(true);
            if (this.onSubmit) {
                this.onSubmit();
            }
        }
    }

    getValue<K extends keyof T>(key: K, index?: number): T[K] {
        if (typeof index === "number") {
            return Array.isArray(this.formData[key]) ? this.formData[key][index] : ("" as T[K]);
        }
        return this.formData[key] ?? ("" as T[K]);
    }

    @action
    validate(): boolean {
        let valid = true;
        this.errors = {} as { [K in keyof T]?: string };
        for (const key in this.formData) {
            if (this.validateKeys[key]) {
                if (Array.isArray(this.formData[key])) { // for checkbox
                    if (this.formData[key].length === 0) {
                        this.errors[key] = this.errorMessage;
                        valid = false;
                    }else{
                        let allValueZeroOrEmptyString = this.formData[key].every((value) => (value === 0) || value === ``);
                        if (allValueZeroOrEmptyString){
                            this.errors[key] = this.errorMessage;
                            valid = false;
                        }
                    }
                } else if (!this.formData[key]?.toString()?.trim()?.length) { // for string, numbers
                    this.errors[key] = this.errorMessage;
                    valid = false;
                }
            }
        }
        return valid;
    }
}