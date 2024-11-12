import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoutineConfiguration {
  routineConfigurationId: number;
  configName: string;
  configValue: string;
  campusId: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoutineConfigurationService {
  private apiUrl = 'YOUR_API_BASE_URL/api/routineconfiguration';

  constructor(private http: HttpClient) {}

  // GET all routine configurations
  getAll(): Observable<RoutineConfiguration[]> {
    return this.http.get<RoutineConfiguration[]>(this.apiUrl);
  }

  // GET routine configuration by ID
  getById(id: number): Observable<RoutineConfiguration> {
    return this.http.get<RoutineConfiguration>(`${this.apiUrl}/${id}`);
  }

  // POST create a new routine configuration
  create(
    routineConfiguration: RoutineConfiguration
  ): Observable<RoutineConfiguration> {
    return this.http.post<RoutineConfiguration>(
      this.apiUrl,
      routineConfiguration
    );
  }

  // PUT update a routine configuration
  update(
    id: number,
    routineConfiguration: RoutineConfiguration
  ): Observable<RoutineConfiguration> {
    return this.http.put<RoutineConfiguration>(
      `${this.apiUrl}/${id}`,
      routineConfiguration
    );
  }

  // DELETE a routine configuration
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
