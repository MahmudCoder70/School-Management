export class Teacher {
  constructor(
    public teacherId?: number,
    public teacherName?: string,
    public dateOfBirth?: Date,
    public phone?: string,
    public teacherImage?: string,
    public qualification?: string,
    public joinDate?: Date,
    public genderId?: string,
    public sectionId?:string,
    public campusId?:string,
    public academicYearId?:string
  ) {}
}
