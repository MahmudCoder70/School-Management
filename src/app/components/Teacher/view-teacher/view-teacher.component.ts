import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Subject } from '../../../Models/subject';
import { TeacherSubject } from '../../../Models/teacher-subject';
import { CommonModule } from '@angular/common';
import { Gender } from '../../../Models/gender';
import { NotifyComponent } from '../../notify/notify.component';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { Class } from '../../../Models/class';
import { Campus } from '../../../Models/campus';
import { Section } from '../../../Models/section';
import { AcademicYear } from '../../../Models/academicYear';


@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-teacher.component.html',
  styleUrl: './view-teacher.component.css',
})
export class ViewTeacherComponent {
  subjectList: Subject[] = [];
  classList:Class[]=[];
  teacherList: TeacherSubject[] = [];
  gender: Gender[] = [];
  campus:Campus[]=[];
  section:Section[]=[];
  academicYear:AcademicYear[]=[];

  
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subjectList = result;
      console.log(result);
    });

    this.dataSvc.getTeacherSubject().subscribe((x) => {
      this.teacherList = x;
      console.log(x);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });
    this.dataSvc.getClassList().subscribe((result) => {
      this.classList = result;
      console.log(result);
    });
    this.dataSvc.getCampus().subscribe((result) => {
      this.campus = result;
      console.log(result);
    });
    this.dataSvc.getSections().subscribe((result) => {
      this.section = result;
      console.log(result);
    });
    this.dataSvc.getAcademicYear().subscribe((result) => {
      this.academicYear = result;
      console.log(result);
    });
  }
  getSubName(id: any) {
    let data = this.subjectList.find((x) => x.subjectId == id);
    return data ? data.subjectName : '';
  }
  getGenderName(id: any) {
    let data = this.gender.find((x) => x.genderId == id);
    return data ? data.genderName : '';
  }
  getClassName(id: any) {
    let data = this.classList.find((x) => x.classId == id);
    return data ? data.className : '';
  }
  getCampusName(id: any) {
    let data = this.campus.find((x) => x.campusId == id);
    return data ? data.name : '';
  }
  getSectionName(id: any) {
    let data = this.section.find((x) => x.sectionId == id);
    return data ? data.sectionName : '';
  }
  getYear(id: any) {
    let data = this.academicYear.find((x) => x.academicYearId == id);
    return data ? data.year : '';
  }
  
  confirmDelete(item: TeacherSubject) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r:any) => {
        if (r)
          this.dataSvc.deleteTeacherSubject(Number(item.teacherId)).subscribe(
            (x) => {
              this.router.navigate(['/viewTeacher'])
              this.notifySvc.success('Data Deleted successfully!!', 'DISMISS');
            },
            (err) => {
              this.notifySvc.fail('Data Delete failed!!', 'DISMISS');
            }
          );
      });
  }
}
