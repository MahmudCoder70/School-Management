import { Student } from './student';

export class StudentGuardian {
  constructor(
    public guardianId?: number,
    public guardianName?: string,
    public phone?: string,
    public nIDNumber?: string,
    public email?: string,
    public studentsList?: Student[]
  ) {}
}
