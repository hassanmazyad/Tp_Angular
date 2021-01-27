import { Component, OnInit } from '@angular/core';

import {Assignment} from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !"

  ajoutActive = false

  //form
  nomDevoir:string
  dateRendu:Date

  assignments = [
    {
      nom:"TP1 Web component",
      dateDeRendu:new Date(2020-11-17),
      rendu:true
    },
    {
      nom:"TP2 Web Angular",
      dateDeRendu:new Date(2020-12-13),
      rendu:false
    },
    {
      nom:"Mini projet Angular",
      dateDeRendu:new Date(2021-1-7),
      rendu:false
    }
  ]

  constructor() { }

  ngOnInit(): void {

    setTimeout(() => { 
      this.ajoutActive = true;
     } , 2000 )
  }


  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.assignments.push(newAssignment);

  }

}
