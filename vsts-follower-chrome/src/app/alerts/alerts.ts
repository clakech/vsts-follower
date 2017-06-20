export class Alert {
    public TemplateType = 'basic';
    public title: string;
    public iconUrl: string;
    public message: string;
}

export class Alerts {
    public TemplateType = 'list';
    public title: string;
    public iconUrl: string;
    public message: string;
    public items: Array<string> = [];
}

export class AlertFilter<T> {
    public predicate: (param: T) => boolean;
    public message: (param: T) => string;
}

export class ChromeAlertItem {
    public message: string;
}
