import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
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
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;


  constructor(private assignmentsService:AssignmentsService , private ngZone:NgZone , private router:Router) { }

  ngOnInit(): void {
    //this.assignments=this.assignmentsService.getAssignments();
    console.log("on Init");
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

  ngAfterViewInit(){
    console.log("After view init");
    this.scroller.elementScrolled().pipe(
      map(e => {
        return this.scroller.measureScrollOffset('bottom');
      }),
      tap(val => {
        console.log(val);
      }),
      pairwise(),
      filter( ([y1 , y2]) => {
        return ( y2 < y1 && y2 < 140) 
      }),
    ).subscribe( () => {
      console.log("...Dans subscribe du scroller, je charge plus d'assignments");
      this.ngZone.run(() => {
        this.addMoreAssignments();
      })
    })

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

 peuplerBD() {
  this.assignmentsService.peuplerBD();
 }

 addMoreAssignments() {
  this.assignmentsService
    .getMoreAssignments(1 , 20)
    .subscribe((newAssignments) => {
      console.log("On a ajouté 20 nouveaux assignments à la liste actuelle...");
      this.assignments = [...this.assignments , ...newAssignments];
    });
 }

 LogOut(){
  this.router.navigate(["/login"]);
 }
}
