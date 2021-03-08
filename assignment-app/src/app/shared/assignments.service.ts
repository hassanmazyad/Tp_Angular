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
        let mat:string;
        //'Big data','Data science','Web','.NET','IOS','Android','Oracle sql','Grails','Java'
        if(module == 'Big data' || module == 'Oracle sql' ) {
            prof = 'https://www.fratmat.info/media/k2/items/cache/7a763ea01045fd6bbe9be20fa045d43a_XL.jpg';
            mat = 'https://lh3.googleusercontent.com/proxy/G8E6yVb6Z3EN8s0BEojoYbkHyY3VCCfHhRJxMLiErhdsgztXahABV13Q-WQjcXtNAAlbnOWZb_s27NEZq7c-RYHe_4LmWXVXsoxgazyJPJktQ_IKK9V38khiEtQTBhPKbrU';
        }
        else if (module == 'Data science') {
            prof = 'https://www.universiteitleiden.nl/binaries/content/gallery/ul2/portraits/medicine-lumc/jelle-goeman-200x250.jpg/jelle-goeman-200x250.jpg/d330x390';
            mat = 'https://www.crococoder.com/wp-content/uploads/2019/09/1_E1haIGB9K4K89PsFZgm-pw.jpeg';
        }
        else if (module == 'IOS') {
          prof = 'https://www.superprof.fr/images/annonces/professeur-home-formateur-apple-certifie-mac-ios-region-avignon-alentour-groupes-individuel.jpg' ;
          mat = 'data:image/png;base64,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' ;
        }
        else if (module == 'Android') {
          prof = 'https://www.superprof.fr/images/annonces/professeur-home-programmation-java-creation-site-web-adaptatif-application-android.jpg';
          mat = 'https://media.kasperskydaily.com/wp-content/uploads/sites/93/2019/12/12140439/android-device-identifiers-featured.jpg';
        }
        else if (module == '.NET')
        {
          prof='https://www.pilatesequilibreversailles.com/wp-content/uploads/2017/05/equilibre-pilates-versailles-Rocio-Lopez.jpg';
          mat ='https://pic.clubic.com/v1/images/1499341/raw';
        }
        else if(module == 'Java'){
          prof='https://www.superprof.fr/images/annonces/professeur-home-enseignant-informatique-propose-cours-php-java-intelligence-artificielle-net.jpg';
          mat='https://fr.koddos.net/blog/wp-content/uploads/2020/06/Hackers-are-Using-Java-to-Conceal-Malware-on-Data-Center-Network.jpg';
        }
        else if (module == 'Grails'){
          mat = 'http://labs.viaxoft.com/wp-content/uploads/2014/08/Grails_logo_2009_2010.jpg';
          prof = 'https://i1.rgstatic.net/ii/profile.image/712495153029121-1546883490651_Q512/Michel-Buffa.jpg';
        }
        else{
          mat = 'https://thumbor.sd-cdn.fr/OIOUaMprwvYgUWZhZZR3PG6CpDY=/940x550/cdn.sd-cdn.fr/wp-content/uploads/2017/09/dev.jpg';
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
            imgMatiere: mat,
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
