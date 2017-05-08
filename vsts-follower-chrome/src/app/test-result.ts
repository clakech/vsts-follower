export class TestResult {
    public build: BuildInfo;
    public coverageStats: Array<Coverage> = new Array<Coverage>();
    public totalTests: number = 0;
    public passedTests: number = 0;
    public failedTests: number = 0;
    public ignoredTests: number = 0;
}

export class BuildInfo {
    public id: number;
    public name: string;
    public url: string;
}

export class Coverage {
    public label: string;
    public position: number;
    public total: number;
    public covered: number;
}
