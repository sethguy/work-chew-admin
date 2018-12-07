import { Injectable } from '@angular/core';
import firebase from '../firebase'

@Injectable()
export class FireService {
  constructor() { }
  isLoggedIn = () => {
    try{
    const userdata = localStorage.getItem('workchew-admin-user');
    const user = JSON.parse(userdata);
    return user;
    }catch (e){
    return false;
    }
  }

  setUser = (user) => localStorage.setItem('workchew-admin-user',JSON.stringify(user))

}