import { Component, Input, OnChanges } from '@angular/core';
import { APIService } from '../../../servicies/api.store';
import { QuickViewQuestions } from '../listing.interface';


@Component({
    selector: 'app-owner-quick-view',
    templateUrl: './owner-quick-view.component.html',
})
export class OwnerQuickViewComponent implements OnChanges {

    @Input() name: string;
    @Input() userId: number;

    public questions: QuickViewQuestions[] = [];

    constructor(private api: APIService) {
    }

    async ngOnChanges() {
        await this.initUserQuestions()
    }

    public async initUserQuestions(): Promise<void> {
        this.questions = <QuickViewQuestions[]>await this.api.getPopularQuestionOfUser(this.userId);
        console.log(this.questions);
    }
}