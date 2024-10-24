import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Curriculum } from '../../../Models/curriculum';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
@Component({
  selector: 'app-view-curriculum',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-curriculum.component.html',
  styleUrl: './view-curriculum.component.css'
})
export class ViewCurriculumComponent {
  curriculum: Curriculum[] = [];

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getCurriculumList().subscribe((result) => {
      this.curriculum = result;
      console.log(result);
    });
  }

  confirmDelete(item: Curriculum) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteCurriculum(Number(item.curriculumId)).subscribe(
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


