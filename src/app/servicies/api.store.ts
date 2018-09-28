import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const HOST_NAME = 'http://api.stackexchange.com/2.2/';
export enum ORDER {
    Desc = 'desc',
    Asc = 'asc',
}

@Injectable()
export class APIService {

    constructor(private http: HttpClient) {
    }

    public async search (substring: string, order = ORDER.Desc): Promise<any[]> {
        const result = await this.http.get(`${HOST_NAME}search?order=${order}&sort=activity&intitle=${substring}&site=stackoverflow`).toPromise();
        return result['items'];
    }

    public async getQuestionsByIds (questionsIds: string[]): Promise<any[]> {
        const result = await this.http.get(`${HOST_NAME}questions/${questionsIds.join(';')}?order=desc&sort=activity&site=stackoverflow`).toPromise();
        return result['items'];
    }

    public async getAnswersByQuestionsIds (questionsIds: string[]): Promise<any[]> {
        const result = await this.http.get(`${HOST_NAME}questions/${questionsIds.join(';')}/answers?order=desc&sort=votes&site=stackoverflow`).toPromise();
        return result['items'];
    }

    public async getPopularQuestionOfUser (userId: number): Promise<any[]> {
        const result = await this.http.get(`${HOST_NAME}users/${userId}/questions/featured?order=desc&sort=activity&site=stackoverflow`).toPromise();
        return result['items'];
    }

    public async getQuestionByTag (tag: string): Promise<any[]> {
        const result = await this.http.get(`${HOST_NAME}tags/${tag}/faq?site=stackoverflow`).toPromise();
        return result['items'];
    }
}