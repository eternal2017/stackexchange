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
        desk: false,
    };

    private paramsSubsciption: Subscription;

    constructor(private api: APIService,
                private activatedRoute: ActivatedRoute,) {
    }

    ngOnInit() {
        this.paramsSubsciption = this.activatedRoute.queryParams.subscribe(async (params) => {
            await this.search(params['substring']);
            this.sortByTitle();
        });
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


    public sortByTitle (): void {
        const step = this.sortType.desk ? -1 : 1;
        this.questions.sort((currentQuestion, nextQuestion) => {
            if (currentQuestion.title[0] < nextQuestion.title[0]) {
                return -step;
            }
            if (currentQuestion.title[0] > nextQuestion.title[0]) {
                return step;
            }
            return 0
        });
        this.sortType.sortField = SortField.Owner;
        this.sortType.desk = !this.sortType.desk;
    }

    public sortByAnswer (): void {
        const step = this.sortType.desk ? -1 : 1;
        this.questions.sort((currentQuestion, nextQuestion) => {
            if (currentQuestion.answer_count < nextQuestion.answer_count) {
                return -step;
            }
            if (currentQuestion.answer_count > nextQuestion.answer_count) {
                return step;
            }
            return 0
        });
        this.sortType.sortField = SortField.Answer;
        this.sortType.desk = !this.sortType.desk;
    }
}