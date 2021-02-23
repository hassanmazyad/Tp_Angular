import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { UsersService } from 'src/app/shared/users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  //form
  email:string
  password:string

  users:User[];

  constructor( private router:Router , private authService:AuthService, private usersService:UsersService ) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.users=users;
      });
  }

  logIn(){
    let i = 0 ;
    while (i<this.users.length) {
      if(this.users[i].email == this.email && this.users[i].password == this.password){
        this.authService.logIn;
        this.router.navigate(["/home"]);
        return;
      }
      else {
        i++;
      }
    }
    console.log("je suis sortie de la boucle")
    return;
  }

}
