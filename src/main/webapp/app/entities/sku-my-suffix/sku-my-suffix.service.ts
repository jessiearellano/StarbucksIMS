import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SKUMySuffix } from './sku-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SKUMySuffix>;

@Injectable()
export class SKUMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/skus';

    constructor(private http: HttpClient) { }

    create(sKU: SKUMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sKU);
        return this.http.post<SKUMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sKU: SKUMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(sKU);
        return this.http.put<SKUMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SKUMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SKUMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SKUMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SKUMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SKUMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SKUMySuffix[]>): HttpResponse<SKUMySuffix[]> {
        const jsonResponse: SKUMySuffix[] = res.body;
        const body: SKUMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SKUMySuffix.
     */
    private convertItemFromServer(sKU: SKUMySuffix): SKUMySuffix {
        const copy: SKUMySuffix = Object.assign({}, sKU);
        return copy;
    }

    /**
     * Convert a SKUMySuffix to a JSON which can be sent to the server.
     */
    private convert(sKU: SKUMySuffix): SKUMySuffix {
        const copy: SKUMySuffix = Object.assign({}, sKU);
        return copy;
    }
}
