import {action, makeObservable, observable} from "mobx";

export class FormStore {
    @observable formData : { [key : string] : any} = {};
    @observable errors : { [key : string] : any} = {}
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
        this.errors = {};
        if(this.isSubmitted) this.isSubmitted = false;
    }

    @action
    submitForm() {
        if (this.validate()) {
            this.isSubmitted = true;
        }
    }

    getValue(key : string){
        return this.formData[key]?? "";
    }

    validate() {
        let valid = true;
        this.errors = {};
        for (const key in this.formData) {
            console.log(key)
            if (!this.formData[key]?.trim().length) {
                this.errors[key] = "this field is required";
                valid = false;
            }
        }
        console.log(JSON.stringify(this.errors))
        return valid;
    }
}

export const formStore = new FormStore();