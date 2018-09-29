import { Component } from '@angular/core';
import { AuthenticationService, AuthentificationBody } from '../../servicies/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    styleUrls: ['./authorization.component.scss'],
    templateUrl: './authorization.component.html',
})
export class AuthorizationComponent {

    readonly DefaultLoginAndPasswordLength = 5;
    public authenticationForm = new FormGroup({
        "login": new FormControl('', [Validators.required, Validators.minLength(this.DefaultLoginAndPasswordLength)]),
        "password": new FormControl('', [Validators.required, Validators.minLength(this.DefaultLoginAndPasswordLength)]),
    });

    constructor(private authenticationService: AuthenticationService,
                private router: Router,) {
    }

    public async authentication(): Promise<void> {

        if (this.authenticationForm.invalid) {
            return;
        }

        const authentificationBody: AuthentificationBody = {
            login: this.authenticationForm.value.login,
            password: this.authenticationForm.value.password,
        };

        try {
            await this.authenticationService.authentification(authentificationBody);
        } catch (error) {

            if (error.status === 401) {
                alert('Неправильный логин/пароль');
            } else {
                console.error(error);
                alert('Возникла ошибка авторизации');
            }
        }
        this.router.navigate(['']);
    }

    public isInvalidControl (controlName: string): boolean {
        const control = this.authenticationForm.controls[controlName];
        return control.invalid && control.touched;
    }
}