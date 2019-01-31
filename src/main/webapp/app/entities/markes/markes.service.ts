import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMarkes } from 'app/shared/model/markes.model';

type EntityResponseType = HttpResponse<IMarkes>;
type EntityArrayResponseType = HttpResponse<IMarkes[]>;

@Injectable({ providedIn: 'root' })
export class MarkesService {
    public resourceUrl = SERVER_API_URL + 'api/markes';

    constructor(protected http: HttpClient) {}

    create(markes: IMarkes): Observable<EntityResponseType> {
        return this.http.post<IMarkes>(this.resourceUrl, markes, { observe: 'response' });
    }

    update(markes: IMarkes): Observable<EntityResponseType> {
        return this.http.put<IMarkes>(this.resourceUrl, markes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMarkes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMarkes[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
