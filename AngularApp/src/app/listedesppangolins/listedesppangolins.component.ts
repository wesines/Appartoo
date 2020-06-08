import { Component, OnInit } from '@angular/core';
import { PagolinService } from '../shared/pagolin.service';
import { Router } from '@angular/router';
import {toast} from 'materialize-css';
import { NgForm } from '@angular/forms';
import { Pagolin } from '../shared/pagolin.model';
@Component({
  selector: 'app-listedesppangolins',
  templateUrl: './listedesppangolins.component.html',
  styleUrls: ['./listedesppangolins.component.css']
})
export class ListedesppangolinsComponent implements OnInit {
  showSucessMessage;showSucessDeleteMessage: boolean;
  serverErrorMessages;serverErrorDeleteMessages: string;
  pagolinDetails;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private pagolinService: PagolinService, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    console.log("NGONINIT : listepangoliny avant requete base ");
    let idprofile=this.pagolinService.getPagolinPayload();
    this.pagolinService.getListPagolin().subscribe(
      res => { 
     
      this.pagolinDetails = res ;
      console.log("Liste de pagolindetails"+this.pagolinDetails)
     console.log("longueur du pagolin list"+this.pagolinDetails.length)
     // this.pagolinDetails.shift()
      console.log("shift longueyr"+this.pagolinDetails.length)
  },
      err => { 
        console.log(err);
        
      }
    );
  }
  refreshpagolinList(){
    console.log("reffresh method");
    this.pagolinService.getListPagolin().subscribe((res) =>{
      this.pagolinDetails = res as Pagolin[];
    })
  }
supprimerPagolin(id , form: NgForm){
  console.log("id"+id);
  let res=this.pagolinService.getPagolinPayload();
  
     if(id==res['_id'])
      {
        if (confirm('Etes vous sûr de vous vouloir supprimer votre compte ?') == true) {
          this.pagolinService.onRemovePagolin(id).subscribe((res) => {
            this.onLogout();
            });
            
            err => {       console.log(err);  }
      }}
      else{
      
        if (confirm('Etes vous sur supprimer ce pangolin ?') == true) {

          this.pagolinService.onRemovePagolin(id).subscribe((res) => {
          this.refreshpagolinList();
           this.resetForm(form);
            toast({ html: 'Deleted successfully', classes: 'rounded' });
          });
          err => {       console.log(err);  }
        }
      }
    
    
  

    }




onSubmit(form: NgForm) {
  console.log("hello  I am in form");
//  if (form.value._id ==="") {
  this.pagolinService.postpagolin(form.value).subscribe(
    res => {
      console.log("insertion en cours"+res);
     // this.showSucessMessage = true;
      this.refreshpagolinList();
      this.resetForm(form);
       toast({ html: 'Insertion effectuée avec succès', classes: 'rounded' });

    },
    err => { 
      console.log("ERR insertion en cours"+err);
      if (err.status === 422) {
        console.log("form.value"+this.serverErrorMessages);
        this.serverErrorMessages = err.error.join('<br/>');
      }
      else
        this.serverErrorMessages = 'Il y a une erreur. Veuillez vérifier les données enregistrées';
    }
  );
}

resetForm(form?: NgForm){ 
  if(form)
  form.reset();
  this.pagolinService.selectedPagolin={
    famille: '',
    race: '',
    age: null,
    nourriture: '',
    email: '',
    password: ''
  };


  this.serverErrorMessages = '';
}


  onLogout(){
    this.pagolinService.deleteToken();
    this.router.navigate(['/login']);
  }

}