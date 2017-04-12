export class VstsCredentials {
    public url: string;
    public login: string;
    public token: string;

    public getBasic(): string {
        return btoa(this.login.toLowerCase() + ':' + this.token);
    }
}
