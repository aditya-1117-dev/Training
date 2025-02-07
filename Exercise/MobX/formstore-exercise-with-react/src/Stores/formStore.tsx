import {action, makeObservable, observable} from "mobx";

export class FormStore<T> {
    @observable formData: T = {} as T;
    @observable validateKeys : { [K in keyof T] : boolean } = {} as { [K in keyof T] : boolean };
    @observable errors: { [K in keyof T]?: string } = {} as { [K in keyof T]?: string };
    @observable isSubmitted: boolean = false;
    @observable onSubmit : Function = () => {};
    private errorMessage: string = "REQUIRED";

    constructor(initialState : T, onSubmit? : Function) {
        makeObservable(this);
        if (initialState) {
            this.formData = initialState;
        }
        if (onSubmit){
            this.onSubmit = onSubmit;
        }
    }

    hasKey<K extends keyof T>(key: K): boolean {
        return !!this.formData[key];
    }

    @action
    setOnSubmitCallBack( onSubmit : Function){
        this.onSubmit = onSubmit;
    }

    @action
    setValue<K extends keyof T>(key: K, value: T[K]) {
        this.formData[key] = value;
    }

    @action
    setRequired<K extends keyof T>(key: K, status: boolean) {
            this.validateKeys[key] = status;
    }

    @action
    setSubmissionStatus(status: boolean) {
        this.isSubmitted = status;
    }

    @action
    resetForm() {
        for (const key in this.formData) {
            if (typeof this.formData[key] === "number") {
                this.formData[key] = 0 as T[typeof key];
            } else {
                this.formData[key] = "" as T[typeof key];
            }
        }
        this.errors = {};
        if (this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        if (this.validate()) {
            this.setSubmissionStatus(true);
            if (this.onSubmit){
                this.onSubmit();
            }
        }
    }

    getValue<K extends keyof T>(key: K): T[K] {
        return this.formData[key]?? ("" as T[K]);
    }

    @action
    validate(): boolean {
        let valid = true;
        this.errors = {} as { [K in keyof T]?: string };
        for (const key in this.formData) {
            if (this.validateKeys[key] && !this.formData[key]?.toString()?.trim()?.length) {
                this.errors[key] = this.errorMessage;
                valid = false;
            }
        }
        return valid;
    }
}