import { IStudentFee } from 'app/shared/model/student-fee.model';
import { IAttendence } from 'app/shared/model/attendence.model';
import { IMarkes } from 'app/shared/model/markes.model';
import { IClassName } from 'app/shared/model/class-name.model';

export interface IStudent {
    id?: number;
    name?: string;
    admissionNumber?: string;
    phoneNumber?: number;
    address?: string;
    photoContentType?: string;
    photo?: any;
    fee?: IStudentFee;
    attendences?: IAttendence[];
    markes?: IMarkes[];
    className?: IClassName;
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public name?: string,
        public admissionNumber?: string,
        public phoneNumber?: number,
        public address?: string,
        public photoContentType?: string,
        public photo?: any,
        public fee?: IStudentFee,
        public attendences?: IAttendence[],
        public markes?: IMarkes[],
        public className?: IClassName
    ) {}
}
