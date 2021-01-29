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
      nom:"TP1 Web component",
      dateDeRendu:new Date("2020-11-17"),
      rendu:true
    },
    {
      nom:"TP2 Web Angular",
      dateDeRendu:new Date("2020-12-13"),
      rendu:false
    },
    {
      nom:"Mini projet Angular",
      dateDeRendu:new Date("2021-1-7"),
      rendu:false
    }
  ]

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment):Observable<string>{
    this.loggingService.log(assignment , "ajouté");

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
    this.loggingService.log(assignment , "supprimé");

    this.assignments.forEach((a, index) => {
      if(a===assignment){
        this.assignments.splice(index , 1);
      }
    })
    return of("Assignment supprimé");
  }
  
  
}
