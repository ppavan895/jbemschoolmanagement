export interface IStudentFee {
    id?: number;
    totalFee?: number;
    feePaid?: number;
}

export class StudentFee implements IStudentFee {
    constructor(public id?: number, public totalFee?: number, public feePaid?: number) {}
}
