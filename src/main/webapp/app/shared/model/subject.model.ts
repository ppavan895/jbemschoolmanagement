import { IClassName } from 'app/shared/model/class-name.model';
import { IMarkes } from 'app/shared/model/markes.model';

export interface ISubject {
    id?: number;
    name?: string;
    markes?: number;
    className?: IClassName;
    markes?: IMarkes;
}

export class Subject implements ISubject {
    constructor(public id?: number, public name?: string, public markes?: number, public className?: IClassName, public markes?: IMarkes) {}
}
