export interface Owner {
    user_id: number;
    display_name: string;
}
export interface SearchedItem {
    question_id: string;
    owner: Owner;
    title: string;
    answerCount: number;
    tags: string[];
}

export interface QuickViewQuestions {
    title: string;
    link: string;
}