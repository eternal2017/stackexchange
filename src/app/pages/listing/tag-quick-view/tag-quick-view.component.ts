import { Component, Input, OnChanges } from '@angular/core';
import { APIService } from '../../../servicies/api.store';
import { QuickViewQuestions } from '../listing.interface';


@Component({
    selector: 'app-tag-quick-view',
    templateUrl: './tag-quick-view.component.html',
})
export class TagQuickViewComponent implements OnChanges {

    @Input() tag: string;

    public questions: QuickViewQuestions[] = [];

    constructor(private api: APIService) {
    }

    async ngOnChanges() {
        await this.initUserQuestions();
    }

    public async initUserQuestions(): Promise<void> {
        this.questions = <QuickViewQuestions[]>await this.api.getQuestionByTag(this.tag);
    }
}