import { ITeacher } from 'app/shared/model/teacher.model';
import { ISection } from 'app/shared/model/section.model';
import { IStudent } from 'app/shared/model/student.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IClassName {
    id?: number;
    name?: string;
    classNumber?: number;
    teacher?: ITeacher;
    sections?: ISection[];
    studentIds?: IStudent[];
    subjects?: ISubject[];
}

export class ClassName implements IClassName {
    constructor(
        public id?: number,
        public name?: string,
        public classNumber?: number,
        public teacher?: ITeacher,
        public sections?: ISection[],
        public studentIds?: IStudent[],
        public subjects?: ISubject[]
    ) {}
}
