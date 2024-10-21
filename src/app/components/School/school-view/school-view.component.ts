import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { School } from '../../../Models/school';
import { SchoolType } from '../../../Models/school-type';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-school-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.css']
})
export class SchoolViewComponent {
 
  school: School[] = [];
  schooltype: SchoolType[] = [];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getAllSchoolTypes().subscribe((result) => {
      this.schooltype = result;
      console.log(result);
    });

   
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;
      console.log(result);
    });
  }
  getSchoolTypeName(id: any) {
    let data = this.schooltype.find((x) => x.schoolTypeId == id);
    return data ? data.schoolTypeName : '';
  }
 
  confirmDelete(item: School) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteSchool(Number(item.schoolId)).subscribe(
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
