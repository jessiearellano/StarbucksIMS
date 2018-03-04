import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StoreMySuffix } from './store-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StoreMySuffix>;

@Injectable()
export class StoreMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/stores';

    constructor(private http: HttpClient) { }

    create(store: StoreMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.post<StoreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(store: StoreMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(store);
        return this.http.put<StoreMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StoreMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StoreMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoreMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoreMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StoreMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StoreMySuffix[]>): HttpResponse<StoreMySuffix[]> {
        const jsonResponse: StoreMySuffix[] = res.body;
        const body: StoreMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StoreMySuffix.
     */
    private convertItemFromServer(store: StoreMySuffix): StoreMySuffix {
        const copy: StoreMySuffix = Object.assign({}, store);
        return copy;
    }

    /**
     * Convert a StoreMySuffix to a JSON which can be sent to the server.
     */
    private convert(store: StoreMySuffix): StoreMySuffix {
        const copy: StoreMySuffix = Object.assign({}, store);
        return copy;
    }
}
