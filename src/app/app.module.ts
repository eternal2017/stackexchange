import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { APIService } from './servicies/api.store';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { IsAuthUserGuard } from './pages/authorization/auth-guard';
import { SearchComponent } from './pages/search/search.component';
import { ListingComponent } from './pages/listing/listing.component';
import { QuestionComponent } from './pages/question/question.component';
import { OwnerQuickViewComponent } from './pages/listing/owner-quick-view/owner-quick-view.component';
import { TagQuickViewComponent } from './pages/listing/tag-quick-view/tag-quick-view.component';
import { AuthenticationService } from './servicies/authentication.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        RouterModule.forRoot([
            {
                path: 'login',
                component: AuthorizationComponent,
            },
            {
                path: '',
                canActivate: [IsAuthUserGuard],
                children: [
                    {
                        path: '',
                        component: SearchComponent,
                    },
                    {
                        path: 'search',
                        component: ListingComponent,
                    },
                    {
                        path: 'question/:questionId',
                        component: QuestionComponent,
                    },
                    {
                        path: '**',
                        component: SearchComponent,
                    }
                ]
            },
        ]),
    ],
    declarations: [
        AppComponent,
        AuthorizationComponent,
        SearchComponent,
        ListingComponent,
        OwnerQuickViewComponent,
        TagQuickViewComponent,
        QuestionComponent,

        NavigationComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        IsAuthUserGuard,
        APIService,
        AuthenticationService,
    ]
})
export class AppModule {
}