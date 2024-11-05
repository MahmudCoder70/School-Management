
import { Campus } from './campus';
import { Class } from './class';
import { School } from './school';
import { Subject } from './subject';

export class TeacherSubject {
  constructor(
    public teacherId?: number,
    public teacherName?: string,
    public dateOfBirth?: Date,
    public phone?: string,
    public teacherImage?: string,
    public imagePath?: File,
    public qualification?: string,
    public joinDate?: Date,
    public genderId?: string,
    public sectionId?:string,
    public campusId?:string,
    public academicYearId?:string,
    public subjectsList?: Subject[],
    public classList?: Class[]

  ) {}
}
