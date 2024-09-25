import { Routes } from '@angular/router';
import path from 'path';
import { AppComponent } from './app.component';
import { ViewComponent } from './components/schooltype/view/view.component';
import { EditComponent } from './components/schooltype/edit/edit.component';
import { CreateComponent } from './components/schooltype/create/create.component';
import { CreateSchoolComponent } from './components/Building/create-school/create-school.component';
import { ViewSchoolComponent } from './components/Building/view-school/view-school.component';
import { EditSchoolComponent } from './components/Building/edit-school/edit-school.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';

export const routes: Routes = [
  // {path:"",component:AppComponent},
  { path: 'school', component: ViewSchoolComponent },
  { path: 'school/edit/ : id', component: EditSchoolComponent },
  { path: 'school/create', component: CreateSchoolComponent },
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/create', component: CreateStudentComponent },
  { path: 'student/edit', component: EditStudentComponent },
];
