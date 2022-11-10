export class RequestParameters {
    term: string;
    status: string;
    promotion: number;
    category: string;

    constructor() {
        this.term = '';
        this.status = '';
        this.category = '';
        this.promotion = -1;
    }
}
