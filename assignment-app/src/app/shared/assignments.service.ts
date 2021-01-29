import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
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

  constructor() { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment):Observable<string>{
    this.assignments.push(assignment);
    return of("Assignment ajouté");
  }

  
  updateAssignment(assignment:Assignment):Observable<string>{
    this.assignments.forEach((a, index) => {
        if(assignment===a){
          this.assignments[index]=a;
        }
    });
    return of("Assignment midifié");
  }
}
