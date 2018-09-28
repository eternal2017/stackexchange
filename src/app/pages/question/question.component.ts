import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { SearchedItem } from '../listing/listing.interface';
import { APIService } from '../../servicies/api.store';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
})
export class QuestionComponent implements OnInit, OnDestroy {
    public question: SearchedItem;
    public answers: any[] = [];
    private queryParamsSubscription: Subscription;

    constructor (
        private api: APIService,
        private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit () {
        this.activatedRoute.params.subscribe((async (params) => {
            await this.initInfo(params['questionId'])
        }));
    }

    ngOnDestroy () {
        if (this.queryParamsSubscription) {
            this.queryParamsSubscription.unsubscribe();
        }
    }

    public async initInfo(questionId: string): Promise<void> {
        this.question = (await this.api.getQuestionsByIds([questionId])).shift();
        this.answers = await this.api.getAnswersByQuestionsIds([questionId]);
        console.log(this.question, this.answers);
    }
}