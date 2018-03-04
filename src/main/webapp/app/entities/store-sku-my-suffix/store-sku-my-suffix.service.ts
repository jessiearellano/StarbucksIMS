import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StoreSKUMySuffix } from './store-sku-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StoreSKUMySuffix>;

@Injectable()
export class StoreSKUMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/store-skus';

    constructor(private http: HttpClient) { }

    create(storeSKU: StoreSKUMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(storeSKU);
        return this.http.post<StoreSKUMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(storeSKU: StoreSKUMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(storeSKU);
        return this.http.put<StoreSKUMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StoreSKUMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StoreSKUMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoreSKUMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoreSKUMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StoreSKUMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StoreSKUMySuffix[]>): HttpResponse<StoreSKUMySuffix[]> {
        const jsonResponse: StoreSKUMySuffix[] = res.body;
        const body: StoreSKUMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StoreSKUMySuffix.
     */
    private convertItemFromServer(storeSKU: StoreSKUMySuffix): StoreSKUMySuffix {
        const copy: StoreSKUMySuffix = Object.assign({}, storeSKU);
        return copy;
    }

    /**
     * Convert a StoreSKUMySuffix to a JSON which can be sent to the server.
     */
    private convert(storeSKU: StoreSKUMySuffix): StoreSKUMySuffix {
        const copy: StoreSKUMySuffix = Object.assign({}, storeSKU);
        return copy;
    }
}
