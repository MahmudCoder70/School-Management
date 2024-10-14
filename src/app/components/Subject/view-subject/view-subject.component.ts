import { Component } from '@angular/core';
import { DataService } from '../../../Services/data.service';
import { Router, RouterLink } from '@angular/router';
import { Curriculum } from '../../../Models/curriculum';
import { CommonModule } from '@angular/common';
import { NotifyServiceService } from '../../../Services/notify.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyComponent } from '../../notify/notify.component';
import { Class } from '../../../Models/class';
import { Subject } from '../../../Models/subject';

@Component({
  selector: 'app-view-subject',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-subject.component.html',
  styleUrl: './view-subject.component.css',
})
export class ViewSubjectComponent {
  class: Class[] = [];
  curriculum: Curriculum[] = [];
  subject: Subject[] = [];
  constructor(
    public dataSvc: DataService,
    private router: Router,
    private notifySvc: NotifyServiceService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.dataSvc.getClass().subscribe((result) => {
      this.class = result;
      console.log(result);
    });

    this.dataSvc.getCurriculum().subscribe((x) => {
      this.curriculum = x;
      console.log(x);
    });
    this.dataSvc.getSubjectList().subscribe((result) => {
      this.subject = result;
      console.log(result);
    });
  }
  getClassName(id: any) {
    let data = this.class.find((x) => x.classId == id);
    return data ? data.className : '';
  }
  getCurriculumName(id: any) {
    let data = this.curriculum.find((x) => x.curriculumId == id);
    return data ? data.curriculumName : '';
  }
  confirmDelete(item: Subject) {
    this.dialog
      .open(NotifyComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((r) => {
        if (r)
          this.dataSvc.deleteSubject(Number(item.subjectId)).subscribe(
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
