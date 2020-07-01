import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore"
import { User } from 'firebase';
import { Router} from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuariosArray:any=[];

  constructor(public firestore: AngularFirestore, public route: Router) {}

  ngOnInit(){
    this.getUsers().subscribe(res => {
      res.map(user => {
        const data = user.payload.doc.data();
        this.usuariosArray.push(data);
        console.log(this.usuariosArray);
      })
    });
  }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  salir(){
    this.route.navigate(["/login"])
  }

}
