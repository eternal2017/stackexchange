import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const KEY_ACCESS_TOCKEN = 'access_tocken';
export interface AuthentificationBody {
    login: string;
    password: string;
}
const HOST_NAME = 'http://127.0.0.1:3000/';

@Injectable()
export class AuthenticationService {
    constructor (private http: HttpClient) {
    }

    public async authentification (body: AuthentificationBody): Promise<any> {
        const result = await this.http.post(`${HOST_NAME}authentication`, body).toPromise();
        localStorage.setItem(KEY_ACCESS_TOCKEN, result['accessTocken']);
}

}