import { IStudent } from 'app/shared/model//student.model';

export interface IAttendence {
    id?: number;
    date?: string;
    present?: boolean;
    student?: IStudent;
}

export class Attendence implements IAttendence {
    constructor(public id?: number, public date?: string, public present?: boolean, public student?: IStudent) {
        this.present = this.present || false;
    }
}
