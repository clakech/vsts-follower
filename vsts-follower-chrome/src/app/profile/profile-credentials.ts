export class ProfileCredentials {
    public url: string;
    public login: string;
    public password: string;

    public getBasic(): string {
        return btoa(this.login.toLowerCase() + ':' + this.password);
    }
}
