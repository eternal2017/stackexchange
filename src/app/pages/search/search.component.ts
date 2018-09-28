import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
})
export class SearchComponent {

    public searchForm = new FormGroup({
        "substring": new FormControl('', Validators.required),
    });

    constructor (
        private router: Router
    ) {
    }

    public search (): void {
        this.router.navigate(['/search'], {queryParams: { substring: this.searchForm.value.substring }});
    }
}