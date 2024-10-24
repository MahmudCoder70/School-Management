import { Routes } from '@angular/router';
import { StudentListComponent } from './components/Student/student-list/student-list.component';
import { CreateStudentComponent } from './components/Student/create-student/create-student.component';
import { EditStudentComponent } from './components/Student/edit-student/edit-student.component';
import { ViewTeacherComponent } from './components/Teacher/view-teacher/view-teacher.component';
import { CreateTeacherComponent } from './components/Teacher/create-teacher/create-teacher.component';
import { EditTeacherComponent } from './components/Teacher/edit-teacher/edit-teacher.component';
import { ViewGuardianComponent } from './components/Guardian/view-guardian/view-guardian.component';
import { CreateGuardianComponent } from './components/Guardian/create-guardian/create-guardian.component';
import { EditGuardianComponent } from './components/Guardian/edit-guardian/edit-guardian.component';
import { ViewSectionComponent } from './components/section/view-section/view-section.component';
import { CreateSectionComponent } from './components/section/create-section/create-section.component';
import { EditSectionComponent } from './components/section/edit-section/edit-section.component';
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
import { SchoolViewComponent } from './components/School/school-view/school-view.component';
import { SchoolCreateComponent } from './components/School/school-create/school-create.component';
import { SchoolEditComponent } from './components/School/school-edit/school-edit.component';
import { HomeComponent } from './components/home/home.component';
import { ViewCurriculumComponent } from './components/Curriculum/view-curriculum/view-curriculum.component';
import { CreateCurriculumComponent } from './components/Curriculum/create-curriculum/create-curriculum.component';
import { EditCurriculumComponent } from './components/Curriculum/edit-curriculum/edit-curriculum.component';
import { ViewComponent } from './components/schooltype/view/view.component';
import { CreateComponent } from './components/schooltype/create/create.component';
import { EditComponent } from './components/schooltype/edit/edit.component';


export const routes : Routes= [
  // {path:"",component:AppComponent},
  { path: 'home', component: HomeComponent },
  { path: 'student/list', component: StudentListComponent },
  { path: 'student/create', component: CreateStudentComponent },
  { path: 'student/edit', component: EditStudentComponent },
  { path: 'viewTeacher', component: ViewTeacherComponent },
  { path: 'createTeacher', component: CreateTeacherComponent },
  { path: 'masterdetails-edit/:id', component: EditTeacherComponent },
  { path: 'viewGuardian', component: ViewGuardianComponent },
  { path: 'createGuardian', component: CreateGuardianComponent },
  { path: 'edit-Guardian/:id', component: EditGuardianComponent },
  { path: 'section/View', component: ViewSectionComponent },
  { path: 'section/create', component: CreateSectionComponent },
  { path: 'section/edit', component: EditSectionComponent},
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
  { path: 'schoolView', component: SchoolViewComponent },
  { path: 'schoolsCreate', component: SchoolCreateComponent },
  { path: 'schools-edit/:id', component: SchoolEditComponent },
  { path: 'viewCurriculum', component: ViewCurriculumComponent },
  { path: 'createCurriculum', component: CreateCurriculumComponent },
  { path: 'edit-curriculum/:id', component: EditCurriculumComponent },
  { path: 'schooltype', component:ViewComponent },
  { path: 'schooltype/create', component: CreateComponent },
  { path: 'schooltype/edit', component: EditComponent},
];
