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
  auteur:string
  matiere:string
  remarque:string
  dateRendu:Date

  //stepper
  isLinear = false
  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  fourthFormGroup: FormGroup
  fifthFormGroup: FormGroup
    
  constructor(private assignmentsService:AssignmentsService,
              private router:Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
  }


  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.remarque = this.remarque;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.id = Math.ceil(Math.random()*10000).toString();
    //this.nouvelAssignment.emit(newAssignment);

    //this.assignments.push(newAssignment);

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe(message => {
      console.log(message);
      this.router.navigate(["/home"]);
    })
  }
}
