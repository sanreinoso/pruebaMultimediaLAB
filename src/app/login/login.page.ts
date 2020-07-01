import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router} from "@angular/router"
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string="";
  pass: string="";
  constructor(public afAuth: AngularFireAuth, public router: Router, public toastr: ToastController) { }

  ngOnInit() {
  }

  async presentToast(msj: string) {
    const toast = await this.toastr.create({
      message: msj,
      duration: 2000,
      animated: true,
      color: "danger"
    });
    toast.present();
  }

  async login (){
    const {user, pass} = this;
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(user, pass);
      console.log("Login succesfull " + user)
      this.router.navigate(["/home"])
    }
    catch(err){
      console.dir(err);
      if(err.code === "auth/wrong-password"){
        this.presentToast("CONTRASEÑA INCORRECTA")
      }
      if(err.code === "auth/user-not-found"){
        this.presentToast("USUARIO NO REGISTRADO")
      }
    }
  }

  navegarRegistro(){
    this.router.navigate(["/registro"])
  }
}
