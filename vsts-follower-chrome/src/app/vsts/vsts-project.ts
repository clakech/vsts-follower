export class VstsProject {
    public id: string;
    public name: string;
    public url: string;
    public state: string;
    public revision: number;
}

export class VstsProjectList {
    public count: number;
    public value: Array<VstsProject>;

    constructor(jsonValue: string) {
        try {
            const list = <VstsProjectList> JSON.parse(jsonValue);
            this.count = list.count;
            this.value = list.value;
        } catch (error) {
            this.count = 0;
            this.value = [];
            console.log("json value bad format !");
        }
    }
}
