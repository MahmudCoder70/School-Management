import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Class } from '../../../Models/class';
import { CampusClass } from '../../../Models/campus-class';
import { Curriculum } from '../../../Models/curriculum';

import { Shift } from '../../../Models/shift';
import { Gender } from '../../../Models/gender';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { NotifyComponent } from '../../notify/notify.component';
import { School } from '../../../Models/school';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-campus',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './view-campus.component.html',
  styleUrl: './view-campus.component.css'
})
export class ViewCampusComponent {
  classList: Class[] = [];
  campusList: CampusClass[] = [];
  curriculum: Curriculum[] = [];
  school: School[] = [];
  shift: Shift[] = [];
  gender: Gender[] = [];
  
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getClass().subscribe((result) => {
      this.classList = result;
      console.log(result);
    });

    this.dataSvc.getcampusClass().subscribe((x) => {
      this.campusList = x;
      console.log(x);
    });
    this.dataSvc.getGender().subscribe((result) => {
      this.gender = result;
      console.log(result);
    });
    this.dataSvc.getCurriculum().subscribe((result) => {
      this.curriculum = result;
      console.log(result);
    });
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
      console.log(result);
    });
    this.dataSvc.getShift().subscribe((result) => {
      this.shift = result;
      console.log(result);
    });
  }
  getClassName(id: any) {
    let data = this.classList.find((x) => x.classId == id);
    return data ? data.className : '';
  }
  getCurriculumName(id: any) {
    let data = this.curriculum.find((x) => x.curriculumId == id);
    return data ? data.curriculumName : '';
  }
  getSchoolName(id: any) {
    let data = this.school.find((x) => x.schoolId == id);
    return data ? data.schoolName : '';
  }
  getShiftName(id: any) {
    let data = this.shift.find((x) => x.shiftId == id);
    return data ? data.shiftName : '';
  }
  getGenderName(id: any) {
    let data = this.gender.find((x) => x.genderId == id);
    return data ? data.genderName : '';
  }
  confirmDelete(item: CampusClass) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r:any) => {
        if (r)
          this.dataSvc.deletecampusClass(Number(item.campusId)).subscribe(
            (x) => {
              this.notifySvc.success('Data Deleted successfully!!', 'DISMISS');
              
            },
            (err) => {
              this.notifySvc.fail('Data Delete failed!!', 'DISMISS');
            }
          );
      });
  }
}
