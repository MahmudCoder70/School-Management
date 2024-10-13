import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../Models/school';
import { Subject } from '../Models/subject';
import { Gender } from '../Models/gender';
import { TeacherSubject } from '../Models/teacher-subject';
import { Teacher } from '../Models/teacher';
import { StudentGuardian } from '../Models/student-guardian';
import { Student } from '../Models/student';
import { Guardian } from '../Models/guardian';
import { Building } from '../Models/building';
import { BuildingRoom } from '../Models/building-room';
import { CampusClass } from '../Models/campus-class';
import { Campus } from '../Models/campus';
import { Class } from '../Models/class';
import { Curriculum } from '../Models/curriculum';
import { Shift } from '../Models/shift';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:5028/api/SchoolTypes'; // Define API endpoint

  constructor(private http: HttpClient) {}

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.baseUrl);
  }

  addSchool(school: School): Observable<School> {
    return this.http.post<School>(this.baseUrl, school);
  }
  getSubjectList(): Observable<Subject[]> {
    return this.http.get<Subject[]>(
      'http://localhost:5028/api/Teachers/GetSubject'
    );
  }
  getGender(): Observable<Gender[]> {
    return this.http.get<Gender[]>('http://localhost:5028/api/Genders');
  }
  postTeacherSubject(data: FormData): Observable<TeacherSubject> {
    return this.http.post<TeacherSubject>(
      'http://localhost:5028/api/Teachers',
      data
    );
  }
  updateTeacherSubject(data: FormData): Observable<TeacherSubject> {
    return this.http.put<TeacherSubject>(
      'http://localhost:5028/api/Teachers/Update',
      data
    );
  }
  deleteTeacherSubject(id: number): Observable<TeacherSubject> {
    return this.http.post<TeacherSubject>(
      'http://localhost:5028/api/Teachers/Delete/' + id,
      null
    );
  }

  getTeacher(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(
      'http://localhost:5028/api/Teachers/GetTeacher'
    );
  }
  getTeacherSubject(): Observable<TeacherSubject[]> {
    return this.http.get<TeacherSubject[]>(
      'http://localhost:5028/api/Teachers'
    );
  }
  getTeacherSubjectById(id: number) {
    return this.http.get<TeacherSubject>(
      'http://localhost:5028/api/Teachers/' + id
    );
  }

  getStudentList(): Observable<Student[]> {
    return this.http.get<Student[]>('http://localhost:5028/api/Students');
  }

  postStudentGuardian(data: FormData): Observable<StudentGuardian> {
    return this.http.post<StudentGuardian>(
      'http://localhost:5028/api/Guardians',
      data
    );
  }
  updateStudentGuardian(data: FormData): Observable<StudentGuardian> {
    return this.http.put<StudentGuardian>(
      'http://localhost:5028/api/Guardians/Update',
      data
    );
  }
  deleteStudentGuardian(id: number): Observable<StudentGuardian> {
    return this.http.post<StudentGuardian>(
      'http://localhost:5028/api/Guardians/Delete/' + id,
      null
    );
  }

  getGuardian(): Observable<Guardian[]> {
    return this.http.get<Guardian[]>(
      'http://localhost:5028/api/Guardians/GetGuardian'
    );
  }
  getStudentGuardian(): Observable<TeacherSubject[]> {
    return this.http.get<StudentGuardian[]>(
      'http://localhost:5028/api/Guardians'
    );
  }
  getStudentGuardianById(id: number) {
    return this.http.get<StudentGuardian>(
      'http://localhost:5028/api/Guardians/' + id
    );
  }

  PostBuilding(data: FormData): Observable<Building> {
    return this.http.post<Building>(
      'http://localhost:5028/api/Buildings',
     data);
    }

    postBuildingRoom(data: FormData): Observable<BuildingRoom> {
      return this.http.post<BuildingRoom>(
        'http://localhost:5028/api/BuildingRooms',
        data
    );
  }

  updatebuildingRoom(data: FormData): Observable<BuildingRoom> {
    return this.http.put<BuildingRoom>(
      'http://localhost:5028/api/BuildingRooms/Update',
      data
  );
  }

deleteBuildingRoom(id: number): Observable<BuildingRoom> {
  return this.http.post<BuildingRoom>(
    'http://localhost:5028/api/BuildingRooms/Delete/' + id,
    null
  );
}

deleteBuilding(id: number): Observable<Building> {
  return this.http.delete<Building>(
    'http://localhost:5028/api/Buildings/Delete' + id,
    );
  }

getBuilding(): Observable<Building[]> {
  return this.http.get<Building[]>(
    'http://localhost:5028/api/Buildings'
  );
}

getBuildingRoom(): Observable<BuildingRoom[]> {
  return this.http.get<BuildingRoom[]>(
    'http://localhost:5028/api/BuildingRooms/GetBuildingRoom'
  );
  }

getbuildingRoomById(id: number) {
  return this.http.get<BuildingRoom>(
    'http://localhost:5028/api/BuildingRooms/' + id
    );
  }
  
  getSubjectById(id: number) {
    return this.http.get<Subject>('http://localhost:5028/api/Subjects/' + id);
  }
  postSubject(data: FormData): Observable<Subject> {
    return this.http.post<Subject>('http://localhost:5028/api/Subjects', data);
  }
  updateSubject(data: FormData): Observable<Subject> {
    return this.http.put<Subject>(
      'http://localhost:5028/api/Subjects/Update',
      data
    );
  }
  deleteSubject(id: number): Observable<Subject> {
    return this.http.post<Subject>(
      'http://localhost:5028/api/Subjects/Delete/' + id,
      null
    );
  }

  postcampusClass(data: FormData): Observable<CampusClass> {
    return this.http.post<CampusClass>(
      'http://localhost:5028/api/Campus',
      data
    );
  }
  updatecampusClass(data: FormData): Observable<CampusClass> {
    return this.http.put<CampusClass>(
      'http://localhost:5028/api/Campus/Update',
      data
    );
  }
  deletecampusClass(id: number): Observable<CampusClass> {
    return this.http.post<CampusClass>(
      'http://localhost:5028/api/Campus/Delete/' + id,
      null
    );
  }

  getCampus(): Observable<Campus[]> {
    return this.http.get<Campus[]>(
      'http://localhost:5028/api/Campus/GetCampus'
    );
  }
  getcampusClass(): Observable<CampusClass[]> {
    return this.http.get<CampusClass[]>(
      'http://localhost:5028/api/Campus'
    );
  }
  getcampusClassById(id: number) {
    return this.http.get<CampusClass>(
      'http://localhost:5028/api/Campus/' + id
    );
  }

  getClass(): Observable<Class[]> {
    return this.http.get<Class[]>(
      'http://localhost:5028/api/Classes'
    );
  }
  getCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(
      'http://localhost:5028/api/Curriculams/GetCurriculum'
    );
  }
  getShift(): Observable<Shift[]> {
    return this.http.get<Shift[]>(
      'http://localhost:5028/api/Shifts'
    );
  }
}


