
export class MainBuildsInfo {
    public definition: VstsBuildDefinition;
    public last: VstsBuild;

    constructor(buildDefinition: VstsBuildDefinition) {
        this.definition = buildDefinition;
    }
}

export class FullProject {
    public project: VstsProject;
    public builds: Array<MainBuildsInfo> = new Array<MainBuildsInfo>();

    constructor(project: VstsProject) {
        this.project = project;
    }
}

export class VstsBuildDefinition {
    public project: VstsProject;
    public id: number;
    public name: string;
    public sonarKey: string;
}

export class VstsBuild {
    public id: number;
    public buildNumber: string;
    public queueTime: Date;
    public startTime: Date;
    public finishTime: Date;
    public result: string;
    public reason: string;
}


export class VstsProject {
    public id: string;
    public name: string;
    public url: string;
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
