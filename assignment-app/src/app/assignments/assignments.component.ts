import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Mon application sur les Assignments !"

  assignments = [
    {
      nom:"TP1 Web component",
      dataDeRendu:'2020-11-17',
      rendu:true
    },
    {
      nom:"TP2 Web Angular",
      dataDeRendu:'2020-12-13',
      rendu:false
    },
    {
      nom:"Mini projet Angular",
      dataDeRendu:'2021-01-07',
      rendu:false
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
