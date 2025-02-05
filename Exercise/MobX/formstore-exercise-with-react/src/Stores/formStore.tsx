import {action, makeObservable, observable} from "mobx";

export class FormStore {
    @observable formData : { [key : string] : any} = {};
    @observable isSubmitted : boolean = false;

    constructor() {
        makeObservable(this);
    }

    @action
    setValue(key :string , value : any){
        this.formData[key] = value;
    }

    @action
    setSubmission(status : boolean){
        this.isSubmitted = status;
    }

    @action
    resetForm() {
        this.formData = {};
        if(this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        this.isSubmitted = true;
    }

    getValue(key : string){
        return this.formData[key]?? "";
    }
}

export const formStore = new FormStore();