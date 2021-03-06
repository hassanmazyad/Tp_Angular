import { Component, OnInit, /*Output , EventEmitter*/} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  //form
  nomDevoir:string
  dateRendu:Date

  //stepper
  isLinear = false
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
    
  constructor(private assignmentsService:AssignmentsService,
              private router:Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.id = Math.ceil(Math.random()*10000);
    //this.nouvelAssignment.emit(newAssignment);

    //this.assignments.push(newAssignment);

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    })
  }
}
