import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  @Output() nouvelAssignment = new EventEmitter<Assignment>();

  //form
  nomDevoir:string
  dateRendu:Date

    
  constructor(private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.nouvelAssignment.emit(newAssignment);

    //this.assignments.push(newAssignment);

  
  }
}
