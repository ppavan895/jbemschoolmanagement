import { IStudent } from 'app/shared/model//student.model';
import { ISubject } from 'app/shared/model//subject.model';

export interface IMarkes {
    id?: number;
    markes?: number;
    student?: IStudent;
    subjects?: ISubject[];
}

export class Markes implements IMarkes {
    constructor(public id?: number, public markes?: number, public student?: IStudent, public subjects?: ISubject[]) {}
}
