import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIService } from '../../servicies/api.store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchedItem } from './listing.interface';

export enum QuickViewType {
    Owner = 'owner',
    Tag = 'tag',
}
// грамонтнее сортировку делать на сервере
// но тогда надо сделать хоть пагинацию(а это время), т.к. требований жёстких нет - будет на фронте
export enum SortField {
    Owner = 'owner',
    Answer = 'answer',
}
export interface SortType {
    sortField: SortField,
    desk: boolean,
}


@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
})
export class ListingComponent implements OnInit, OnDestroy {

    public questions: SearchedItem[] = [];

    public QuickViewType = QuickViewType;
    public quickView: QuickViewType|undefined = undefined;
    public get isOpenQuickView (): boolean {
        return !!this.quickView;
    }
    public quickViewUserId: number;
    public quickViewName: string;
    public quickViewTag: string;

    public readonly SortField = SortField;
    public sortType: SortType = {
        sortField: SortField.Answer,
        desk: true,
    };

    private paramsSubsciption: Subscription;

    constructor(private api: APIService,
                private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.paramsSubsciption = this.activatedRoute.queryParams.subscribe(params =>
            this.search(params['substring']));
    }

    ngOnDestroy() {
        if (this.paramsSubsciption) {
            this.paramsSubsciption.unsubscribe();
        }
    }

    public async search(substring: string): Promise<void> {
        this.questions = <SearchedItem[]>(await this.api.search(substring));
    }

    public initQuickViewOfOwner (userId: number, name: string): void {
        this.quickView = QuickViewType.Owner;
        this.quickViewUserId = userId;
        this.quickViewName = name;
    }

    public initQuickViewOfTag (tag: string): void {
        this.quickView = QuickViewType.Tag;
        this.quickViewTag = tag;
    }

    public sort (): void {
        switch(this.sortType.sortField) {
            case SortField.Answer:
                // this.questions = this.sortAnswer(this.questions);
                break;
            case SortField.Owner:
                break;
        }
    }

    public sortAnswer (questions: SearchedItem[]): SearchedItem[] {
        return this.questions.sort((currentQuestion, nextQuestion) => {
            if (currentQuestion.answerCount > nextQuestion.answerCount) {
                return 1;
            }
            if (currentQuestion.answerCount < nextQuestion.answerCount) {
                return -1
            }
            return 0;
        });
    }
}