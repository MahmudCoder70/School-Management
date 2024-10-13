import { Routes } from '@angular/router';
import { CreateSchoolComponent } from './components/School/create-school/create-school.component';
import { ViewSchoolComponent } from './components/School/view-school/view-school.component';
import { EditSchoolComponent } from './components/School/edit-school/edit-school.component';
import { StudentListComponent } from './components/Student/student-list/student-list.component';
import { CreateStudentComponent } from './components/Student/create-student/create-student.component';
import { EditStudentComponent } from './components/Student/edit-student/edit-student.component';
import { ViewTeacherComponent } from './components/Teacher/view-teacher/view-teacher.component';
import { CreateTeacherComponent } from './components/Teacher/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './components/Teacher/edit-teacher/edit-teacher.component';
import { ViewGuardianComponent } from './components/Guardian/view-guardian/view-guardian.component';
import { CreateGuardianComponent } from './components/Guardian/create-guardian/create-guardian.component';
import { EditGuardianComponent } from './components/Guardian/edit-guardian/edit-guardian.component';
import { ViewBuildingComponent } from './components/Building/view-building/view-building.component';
import { CreateBuildingComponent } from './components/Building/create-building/create-building.component';
import { ViewBuildingRoomComponent } from './components/BuildingRoom/view-building-room/view-building-room.component';
import { CreateBuildingRoomComponent } from './components/BuildingRoom/create-building-room/create-building-room.component';
import { ViewShiftComponent } from './components/Shift/view-shift/view-shift.component';
import { CreateShiftComponent } from './components/Shift/create-shift/create-shift.component';
import { EditShiftComponent } from './components/Shift/edit-shift/edit-shift.component';
import { ViewSubjectComponent } from './components/Subject/view-subject/view-subject.component';
import { CreateSubjectComponent } from './components/Subject/create-subject/create-subject.component';
import { EditSubjectComponent } from './components/Subject/edit-subject/edit-subject.component';
import { CreateCampusComponent } from './components/campus/create-campus/create-campus.component';
import { ViewCampusComponent } from './components/campus/view-campus/view-campus.component';
import { EditCampusComponent } from './components/campus/edit-campus/edit-campus.component';

export const routes: Routes = [
  // {path:"",component:AppComponent},
  { path: 'school', component: ViewSchoolComponent },
  { path: 'school/edit/ : id', component: EditSchoolComponent },
  { path: 'school/create', component: CreateSchoolComponent },
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/create', component: CreateStudentComponent },
  { path: 'student/edit', component: EditStudentComponent },
  { path: 'viewTeacher', component: ViewTeacherComponent },
  { path: 'createTeacher', component: CreateTeacherComponent },
  { path: 'masterdetails-edit/:id', component: EditTeacherComponent },
  { path: 'viewGuardian', component: ViewGuardianComponent },
  { path: 'createGuardian', component: CreateGuardianComponent },
  { path: 'edit-Guardian/:id', component: EditGuardianComponent },
  { path: 'viewBuilding', component: ViewBuildingComponent },
  { path: 'createBuilding', component: CreateBuildingComponent },
  { path: 'building-edit/:id', component: EditTeacherComponent },
  { path: 'viewBuildingRoom', component: ViewBuildingRoomComponent },
  { path: 'createBuildingRoom', component: CreateBuildingRoomComponent },
  { path: 'BuildingRoom-edit/:id', component: EditTeacherComponent },
  { path: 'shift/list', component: ViewShiftComponent },
  { path: 'shift/create', component: CreateShiftComponent },
  { path: 'shift/edit', component: EditShiftComponent},
  { path: 'viewSubject', component: ViewSubjectComponent },
  { path: 'createSubject', component: CreateSubjectComponent },
  { path: 'edit-subject/:id', component: EditSubjectComponent },
  { path: 'createcampus', component: CreateCampusComponent},
  { path: 'getcampus', component: ViewCampusComponent},
  { path: 'edit-campus/: id', component: EditCampusComponent},
];
