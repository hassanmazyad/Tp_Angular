import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  constructor(private loggingService:LoggingService , private http:HttpClient) { }

  uri = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment []>(this.uri);
  }

  getAssignment(id:number):Observable<Assignment> {
    //let result = this.assignments.find(a => (a.id === id));
    //return of(result);
    return this.http.get<Assignment>(this.uri + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<any>{
    this.loggingService.log(assignment , "ajouté");
    //assignment.id = Math.ceil(Math.random()*10000);

    //this.assignments.push(assignment);
    
    //return of("Assignment ajouté");

    return this.http.post<Assignment>(this.uri , assignment);

  }

  
  updateAssignment(assignment:Assignment):Observable<any>{
    //this.loggingService.log(assignment , "midifié");

    //this.assignments.forEach((a, index) => {
    //    if(assignment===a){
    //      this.assignments[index]=a;
    //    }
    //});
    //return of("Assignment midifié");

    return this.http.put<Assignment>(this.uri , assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any>{
    this.loggingService.log(assignment , "midifié");
    
    /*
    this.assignments.forEach((a, index) => {
      if(a===assignment){
        this.assignments.splice(index , 1);
      }
    })
    return of("Assignment supprimé");
    }
    */
    return this.http.delete(this.uri + "/" + assignment._id);
  }
}
