import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { School } from '../../../Models/school';
import { Building } from '../../../Models/building';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-building',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule],
  templateUrl: './view-building.component.html',
  styleUrl: './view-building.component.css',
})
export class ViewBuildingComponent {
  
  building: Building[] = [];
  school: School[] = [];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getSchools().subscribe((result) => {
      this.school = result;

    });

    this.dataSvc.getBuilding().subscribe((result) => {
      this.building = result;
      
    });

  }


  getSchoolName(id: any) {
    let data = this.school.find((x) => x.schoolId == id);
    return data ? data.schoolName : '';
  }
  confirmDelete(item: Building) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteBuilding(Number(item.buildingId)).subscribe(
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
