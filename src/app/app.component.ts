import { Component } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'School-UI';
  showContentBody: boolean = true;  // Flag to control visibility of content-body

  constructor(private router: Router) {
    // Listen for route changes to control visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Check if the navigation is to a specific route where content-body should be hidden
        this.showContentBody = !['/student/list','/viewTeacher','/student/create','/student/edit','/viewTeacher','/createTeacher','/masterdetails-edit','/viewGuardian','/createGuardian','/edit-Guardian','/section/View','/section/create', '/section/edit','/viewBuilding','/createBuilding', '/building-edit/:id','/viewBuildingRoom','/createBuildingRoom','/BuildingRoom-edit/:id','/shift/list','/shift/create','/shift-edit/:id','/viewSubject','/createSubject','/edit-subject/:id','/createcampus', '/getcampus','/edit-campus/: id','/schoolView','/schoolsCreate','/schools-edit/:id','/viewCurriculum','/createCurriculum','/edit-curriculum/:id','/schooltype','/schooltype/create','/schooltype/edit'].includes(event.url);
      }
    });
  }
}
