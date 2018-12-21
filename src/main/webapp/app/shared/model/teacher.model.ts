import { IClassName } from 'app/shared/model//class-name.model';

export interface ITeacher {
    id?: number;
    name?: string;
    phoneNumber?: number;
    address?: string;
    photoPath?: string;
    classTeachers?: IClassName[];
}

export class Teacher implements ITeacher {
    constructor(
        public id?: number,
        public name?: string,
        public phoneNumber?: number,
        public address?: string,
        public photoPath?: string,
        public classTeachers?: IClassName[]
    ) {}
}
