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

        newAssignments.push(
          {
            id:id,
            nom:'Nouvel assignement #' + id,
            auteur: 'Auteur #' + id,
            matiere: 'Matiere # ' + id,
            remarque: 'remarque #' + id,
            imgProf: 'https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg',
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
