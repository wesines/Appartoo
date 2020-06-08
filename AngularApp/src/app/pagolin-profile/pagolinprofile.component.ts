import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PagolinService } from '../shared/pagolin.service';
import { Pagolin } from '../shared/pagolin.model';
import { NgForm } from '@angular/forms';
import {toast} from 'materialize-css';

@Component({
  selector: 'app-pagolin-profile',
  templateUrl: './pagolin-profile.component.html',
  styleUrls: ['./pagolin-profile.component.css']
})
export class PagolinProfileComponent implements OnInit {
  pagolinDetails;
  serverErrorMessages: string;
  showSucessMessage:boolean;
  pagolin:Pagolin;
  pagolins:Pagolin[];
  idpagolin:number
  clicbutton:boolean;
  constructor(private pagolinService: PagolinService, private router: Router) { }

  ngOnInit() {
    this.clicbutton=false;
    //this.resetForm();
    this.refreshPangolinDetail();

  }
  onSubmit(form: NgForm){

            console.log("i will update this pagolin"+form.value._id);
            this.pagolinService.putpangolin(this.idpagolin,form.value).subscribe((res) => 
            {
              // this.resetForm(form);
               toast({ html: 'Modification effectuée avec succès', classes: 'rounded' });
               //this.resetForm();
               this.clicbutton=false;
               this.refreshPangolinDetail();
          },
          err => { 
            console.log(err);
            
          }
          );
}

  onLogout(){
    this.pagolinService.deleteToken();
    this.router.navigate(['/login']);
  }

  refreshPangolinDetail(){
    this.pagolinService.getPagolinProfile().subscribe(
      res => {
        console.log("refresh profil");
        this.pagolinDetails = res['pagolin'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }
onEdit() {
  this.clicbutton=true;
  let idprofile=this.pagolinService.getPagolinPayload();
  this.pagolinService.getPagolinProfile().subscribe(res => {
    console.log("cliquer sur bouton on edit  "+idprofile['_id']);
    this.idpagolin = idprofile['_id'] ;
    this.pagolinService.selectedPagolin= {
      famille: res['pagolin'].famille,
      race: res['pagolin'].race,
      age: res['pagolin'].age,
      nourriture: res['pagolin'].nourriture,
      email: res['pagolin'].email,
     password: res['pagolin'].password
    };
 
    err => { 
      console.log(err);
      
    }
  }
  )


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

}

}


