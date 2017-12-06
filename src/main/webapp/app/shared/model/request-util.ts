import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): any => {
    const options = {params: {}};
    if (req) {
        const params: HttpParams = new HttpParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.set('sort', req.sort);
        }
        params.set('query', req.query);

        options.params = params;
    }
    return options;
};
