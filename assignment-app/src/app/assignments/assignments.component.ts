import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';

import {Assignment} from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !"
  formVisible = false;
  assignmentSelection:Assignment;
  assignments:Assignment[];


  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
    //this.assignments=this.assignmentsService.getAssignments();
    
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments=assignments;
      });
      
   /*
   this.assignmentsService.getAssignmentsPromise()
   .then(assignments => {
     this.assignments = assignments;
   })
   */
  }
  
  assignmentClique(assignment){
    this.assignmentSelection = assignment;
  }

/*
  onNouvelAssignment(event:Assignment){
    this.assignmentsService.addAssignment(event)
      .subscribe(message => {
        console.log("message");
        this.formVisible=false;
      })
    
  }
  */

}
