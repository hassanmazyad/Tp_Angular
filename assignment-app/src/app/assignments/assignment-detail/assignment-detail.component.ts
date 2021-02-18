import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {AuthService} from '../../shared/auth.service';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {

  assignmentTransmis: Assignment;


  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(){
    let id = +this.route.snapshot.params.id;
    this.assignmentsService.getAssignment(id)
      .subscribe( a => {
        this.assignmentTransmis = a ;
      })
  }




  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message =>{
        console.log("assignment mis à jour");
        this.router.navigate(["/home"]);
      })
  }

  onDelete(){
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message =>{
        console.log("assignment supprimé");
        this.assignmentTransmis=null;
        this.router.navigate(["/home"]);
      })
  }

  onClickEdit(){
    this.router.navigate(
      ['assignment' , this.assignmentTransmis.id , 'edit'],
      {
        queryParams:{
          nom:this.assignmentTransmis.nom
        },
        fragment:"edition"
      });
  }

  loggedIn() {
    return this.authService.loggedIn;
  }
}
