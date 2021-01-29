import { Component, Input, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  @Input() assignmentTransmis: Assignment;


  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message =>{
        console.log("assignment mis à jour");
      })
  }

}
