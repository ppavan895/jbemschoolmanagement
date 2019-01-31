import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClassName } from 'app/shared/model/class-name.model';

type EntityResponseType = HttpResponse<IClassName>;
type EntityArrayResponseType = HttpResponse<IClassName[]>;

@Injectable({ providedIn: 'root' })
export class ClassNameService {
    public resourceUrl = SERVER_API_URL + 'api/class-names';

    constructor(protected http: HttpClient) {}

    create(className: IClassName): Observable<EntityResponseType> {
        return this.http.post<IClassName>(this.resourceUrl, className, { observe: 'response' });
    }

    update(className: IClassName): Observable<EntityResponseType> {
        return this.http.put<IClassName>(this.resourceUrl, className, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClassName>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClassName[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
