import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assignment:Assignment , action:string){
    console.log("Logging service : " + assignment.nom + " " + action);
  }

  logUser(user:User , action:string){
    console.log("Logging service : " + user.name + " " + action)
  }


}
