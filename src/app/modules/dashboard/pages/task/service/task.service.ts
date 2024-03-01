import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../models/task';
import { ApiResponse } from 'src/app/modules/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = "http://localhost:8080/v1.0.0/task";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    this.httpClient.get<ITask[]>(`${this.baseUrl}`);
  }
  create(task: ITask) {
    this.httpClient.post(`${this.baseUrl}/create`, task);
  }
}
