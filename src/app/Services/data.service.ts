import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../Models/school';
import { Subject } from '../Models/subject';
import { Gender } from '../Models/gender';
import { TeacherSubject } from '../Models/teacher-subject';
import { Teacher } from '../Models/teacher';

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
}
