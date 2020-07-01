import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {ToastController} from '@ionic/angular'
import {AngularFirestore} from "@angular/fire/firestore"
import { Router } from '@angular/router';
//import { ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user: string = '';
  pass: string = '';
  confirmpass: string = '';
  correo: string="";
  message: any;
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, 
    public toastr: ToastController, public router: Router) { }

  ngOnInit() {
  }
  async presentToast(msj: string) {
    const toast = await this.toastr.create({
      message: msj,
      duration: 5000,
      animated: true,
      color: "success"
    });
    toast.present();
  }
  async toastErr(msj: string) {
    const toast = await this.toastr.create({
      message: msj,
      duration: 5000,
      animated: true,
      color: "danger"
    });
    toast.present();
  }


  async registro (){
    const {user, pass, confirmpass, correo} = this;
    var error = "";
      if ( pass === confirmpass){
        return new Promise ((resolve, reject) => {
          this.afAuth.createUserWithEmailAndPassword(correo, pass).then( res =>{
            console.log(res.user.uid);
  
            const uid = res.user.uid;
            this.firestore.collection('users').doc(uid).set({
              name: user,
              password: pass,
              correo: correo
            })
          resolve(res)
          this.presentToast("CREADO CON EXITO")
          this.router.navigate(["/login"]);
        }).catch(err => reject(err));
        //this.toastErr("YA EXISTE UN USUARIO CON ESTE EMAIL")
      })
      }else{
        this.toastErr("CONTRASEÑA NO COINCIDEN")
      }
  }
}
