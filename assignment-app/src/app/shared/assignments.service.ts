import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import {Observable, of} from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import {catchError, map , tap} from 'rxjs/operators';
import * as data from './assignments.json';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  matieres:string[] = ['Big data','Data science','Web','.NET','IOS','Android','Oracle sql','Grails','Java'];

  constructor(private loggingService:LoggingService , private http:HttpClient) { }

  uri = "http://localhost:8010/api/assignments";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment []>(this.uri)
      .pipe( 
        catchError(this.handleError<any>("get assignments "))
      )
    /*
      .pipe(map(liste => {
          liste.forEach(as => {
            as.nom += " MODIFIE DANS PIPE AVEC UN MAP";
          })
          
          return liste;
      }));
      */
  }

  //Verion avec promesse
  getAssignmentsPromise():Promise<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment []>(this.uri).toPromise();
  }


  getMoreAssignments(page , size): Observable<Assignment[]> {
      let newAssignments:Assignment[] = [];

      for (let i =0 ; i<size ; i++ ){
        const id = this.getNewId().toString();
        const module = this.matieres[Math.floor(Math.random() * this.matieres.length)];
        let prof:string;
        //'Big data','Data science','Web','.NET','IOS','Android','Oracle sql','Grails','Java'
        if(module == 'Big data' || module == 'Oracle sql' ) {
            prof = 'https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg'
        }
        else if (module == 'Data science') {
            prof = 'https://www.universiteitleiden.nl/binaries/content/gallery/ul2/portraits/medicine-lumc/jelle-goeman-200x250.jpg/jelle-goeman-200x250.jpg/d330x390'
        }
        else if (module == 'IOS' || module == 'Android'){
          prof = 'https://www.superprof.fr/images/annonces/professeur-home-programmation-java-creation-site-web-adaptatif-application-android.jpg';
        }
        else if (module == '.NET' || module == 'Java'){
          prof='https://www.superprof.fr/images/annonces/professeur-home-enseignant-informatique-propose-cours-php-java-intelligence-artificielle-net.jpg';
        }
        else {
          prof = 'https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg';
        }
        newAssignments.push(
          {
            id:id,
            nom:'Nouvel assignement #' + id,
            auteur: 'Auteur #' + id,
            matiere: module,
            remarque: 'remarque #' + id,
            imgProf: prof, 
            imgMatiere: 'imgMatiere #' + id,
            dateDeRendu: new Date(),
            rendu: false,
            note: null
          }
        );
        }
      return of(newAssignments)
  }




  getAssignment(id:number):Observable<Assignment> {
    //let result = this.assignments.find(a => (a.id === id));
    //return of(result);
    return this.http.get<Assignment>(this.uri + "/" + id);
    /*
    .pipe(
      map(a => {
        a.nom += " MODIFIE DANS PIPE AVEC UN MAP";
        return a;
    }),
    tap(a => {
        console.log("dans le tap");
        console.log(a);
    }),
    catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))    
    );
    */
  }


  private handleError<T>(operation , result?:T){
    return(error:any) : Observable<T> => {
      console.log(error);
      console.log(operation + "a échoué " + error.message);
      
      return of(result as T)
    }
  }


  addAssignment(assignment:Assignment):Observable<any>{
    this.loggingService.log(assignment , "ajouté");
    //assignment.id = Math.ceil(Math.random()*10000);

    //this.assignments.push(assignment);
    
    //return of("Assignment ajouté");

    return this.http.post<Assignment>(this.uri , assignment);

  }

  
  updateAssignment(assignment:Assignment):Observable<any>{
    //this.loggingService.log(assignment , "midifié");

    //this.assignments.forEach((a, index) => {
    //    if(assignment===a){
    //      this.assignments[index]=a;
    //    }
    //});
    //return of("Assignment midifié");

    return this.http.put<Assignment>(this.uri , assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any>{
    this.loggingService.log(assignment , "modifié");
    
    /*
    this.assignments.forEach((a, index) => {
      if(a===assignment){
        this.assignments.splice(index , 1);
      }
    })
    return of("Assignment supprimé");
    }
    */
    return this.http.delete(this.uri + "/" + assignment._id);
  }


  assignments_json: any = (data as any).default;

  peuplerBD(){
    for (let i = 0 ; i < this.assignments_json.length ; i++){
      const a = this.assignments_json[i]

      const new_assignment = new Assignment();

      new_assignment.id = this.getNewId().toString();

      new_assignment.nom = a.nom;
      new_assignment.dateDeRendu = new Date(a.dateDeRendu);
      new_assignment.rendu = false;
      new_assignment.auteur = 'Auteur #' + new_assignment.id;
      new_assignment.matiere = 'Matiere #' + new_assignment.id;
      new_assignment.remarque = 'remarque #' + new_assignment.id;
      new_assignment.imgProf= 'imgProf #' + new_assignment.id;
      new_assignment.imgMatiere= 'imgMatiere #' + new_assignment.id;

      this.addAssignment(new_assignment)
        .subscribe(message => {
          console.log("Assignment Crée");
        });
    }
  }

  getNewId():number {
    return Math.ceil(Math.random()*100000);
  }
  
}
