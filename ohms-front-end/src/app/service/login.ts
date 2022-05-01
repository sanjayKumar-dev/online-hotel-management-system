export interface Ilogin {
    id: string,
    username: string,
    email: string,
    roles: Array<String>,
    accessToken:string,
    tokenType:string
}