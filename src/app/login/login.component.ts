import { Component, OnInit } from '@angular/core';
import firebase from '../../firebase'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  login() {

    firebase
      .auth()
      .signInWithEmailAndPassword(this.username, this.password)
      .then((fireSigninResponse) => {

        localStorage.setItem('workchew-admin-user',JSON.stringify(fireSigninResponse))
        this.router.navigate(['/partner-list']);

      })
      .catch((fireSigninError) => {

        console.log("fireSigninError", fireSigninError)

      })

  }

}