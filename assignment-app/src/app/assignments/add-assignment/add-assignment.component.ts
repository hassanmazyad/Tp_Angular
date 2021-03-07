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

        let prof:string;
        //'Big data','Data science','Web','.NET','IOS','Android','Oracle sql','Grails','Java'
        if(this.matiere == 'Big data' || this.matiere == 'Oracle sql' ) {
            prof = 'https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg'
        }
        else if (this.matiere == 'Data science') {
            prof = 'https://www.universiteitleiden.nl/binaries/content/gallery/ul2/portraits/medicine-lumc/jelle-goeman-200x250.jpg/jelle-goeman-200x250.jpg/d330x390'
        }
        else if (this.matiere == 'IOS' || this.matiere == 'Android'){
          prof = 'https://www.superprof.fr/images/annonces/professeur-home-programmation-java-creation-site-web-adaptatif-application-android.jpg';
        }
        else if (this.matiere == '.NET' || this.matiere == 'Java'){
          prof='https://www.superprof.fr/images/annonces/professeur-home-enseignant-informatique-propose-cours-php-java-intelligence-artificielle-net.jpg';
        }
        else {
          prof = 'https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg';
        }



    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.auteur = this.auteur;
    newAssignment.matiere = this.matiere;
    newAssignment.remarque = this.remarque;
    newAssignment.imgProf = prof;
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
