import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

  @Component({
    selector: 'app-edit-assignment',
    templateUrl: './edit-assignment.component.html',
    styleUrls: ['./edit-assignment.component.css']
  })

  export class EditAssignmentComponent implements OnInit {
    assignment: Assignment;
    nomAssignment:string;
    dateDeRendu:Date;

      //stepper
      isLinear = false
      firstFormGroup: FormGroup
      secondFormGroup: FormGroup

    constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router:Router , private _formBuilder: FormBuilder ) { }


    ngOnInit(): void {
      this.getAssignment();

      console.log("Query Prams : ");
      console.log(this.route.snapshot.queryParams);
      console.log("fragment : " + this.route.snapshot.fragment);


      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

    getAssignment() {
      // on récupère l'id dans le snapshot passé par le routeur
      // le "+" force l'id de type string en "number"
      const id = +this.route.snapshot.params.id;
        this.assignmentsService
        .getAssignment(id)
        .subscribe( (assignment) => {
          this.assignment = assignment;
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = assignment.dateDeRendu;
        });
    }

    onSaveAssignment() {
      if(this.nomAssignment) {
        this.assignment.nom = this.nomAssignment;
      };
      if(this.dateDeRendu) {
        this.assignment.dateDeRendu = this.dateDeRendu;
      }

      this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe( (message) => {
        console.log(message);
        // navigation vers la home page
        this.router.navigate(["/home"]);
      });
    }
}