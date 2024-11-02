import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Curriculum } from '../../../Models/curriculum';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { Shift } from '../../../Models/shift';


@Component({
  selector: 'app-view-shift',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-shift.component.html',
  styleUrl: './view-shift.component.css'
})
export class ViewShiftComponent {
  shift: Shift[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSvc.getShiftList().subscribe((result) => {
      this.shift = result;
      console.log(result);
    });
  }

  confirmDelete(item: Shift) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteShift(Number(item.shiftId)).subscribe(
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
