import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id:1,
      nom:"TP1 Web component",
      dateDeRendu:new Date("2020-11-17"),
      rendu:true
    },
    {
      id:2,
      nom:"TP2 Web Angular",
      dateDeRendu:new Date("2020-12-13"),
      rendu:false
    },
    {
      id:3,
      nom:"Mini projet Angular",
      dateDeRendu:new Date("2021-1-7"),
      rendu:false
    }
  ]

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment> {
    let result = this.assignments.find(a => (a.id === id));
    return of(result);
  }

  addAssignment(assignment:Assignment):Observable<string>{
    this.loggingService.log(assignment , "ajouté");
    assignment.id = Math.ceil(Math.random()*10000);

    this.assignments.push(assignment);
    
    return of("Assignment ajouté");
  }

  
  updateAssignment(assignment:Assignment):Observable<string>{
    this.loggingService.log(assignment , "midifié");

    this.assignments.forEach((a, index) => {
        if(assignment===a){
          this.assignments[index]=a;
        }
    });
    return of("Assignment midifié");
  }

  deleteAssignment(assignment:Assignment):Observable<string>{
    this.loggingService.log(assignment , "midifié");
    
    this.assignments.forEach((a, index) => {
      if(a===assignment){
        this.assignments.splice(index , 1);
      }
    })
    return of("Assignment supprimé");
  }
  
  
}
