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

  // postStudentGuardian(data: FormData): Observable<StudentGuardian> {
  //   return this.http.post<StudentGuardian>(
  //     'http://localhost:5028/api/Guardians',
  //     data
  //   );
  // }
  // updateStudentGuardian(data: FormData): Observable<StudentGuardian> {
  //   return this.http.put<StudentGuardian>(
  //     'http://localhost:5028/api/Guardians/Update',
  //     data
  //   );
  // }
  // deleteStudentGuardian(id: number): Observable<StudentGuardian> {
  //   return this.http.post<StudentGuardian>(
  //     'http://localhost:5028/api/Guardians/Delete/' + id,
  //     null
  //   );
  // }

  // getGuardian(): Observable<Guardian[]> {
  //   return this.http.get<Guardian[]>(
  //     'http://http://localhost:5028/api/Guardians/GetGuardian'
  //   );
  // }
  // getStudentGuardian(): Observable<TeacherSubject[]> {
  //   return this.http.get<StudentGuardian[]>(
  //     'http://http://localhost:5028/api/Guardians'
  //   );
  // }
  // getStudentGuardianById(id: number) {
  //   return this.http.get<StudentGuardian>(
  //     'http://http://localhost:5028/api/Guardians/' + id
  //   );
  // }

  // getStudentList(): Observable<Student[]> {
  //   return this.http.get<Student[]>('http://localhost:5028/api/Students');
  // }

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
}


