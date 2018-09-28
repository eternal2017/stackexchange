import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { KEY_ACCESS_TOCKEN } from '../../servicies/authentication.service';

@Injectable()
export class IsAuthUserGuard implements CanActivate {

    constructor(private router: Router) {
    }

    async canActivate(activatedRouterSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(KEY_ACCESS_TOCKEN)) {
            return true;
        } else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}