import { Component, HostListener } from '@angular/core';
import { KEY_ACCESS_TOCKEN } from '../../servicies/authentication.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
})
export class NavigationComponent {

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent (event: KeyboardEvent) {
        if (event.keyCode === 37 || event.keyCode === 39) {
            this.historyMove(event.keyCode === 39);
        }
    }
    constructor () {
    }

    public historyMove (forwardMove = true): void {
        history.go(forwardMove ? 1 : -1);
    }

    public logout() {
        localStorage.removeItem(KEY_ACCESS_TOCKEN);
        location.reload();
    }
}