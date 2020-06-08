import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { PagolinService } from '../../shared/pagolin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private pagolinService: PagolinService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  ngOnInit() {
    //if(this.pagolinService.isLoggedIn())
  // this.router.navigateByUrl('/pagolinProfile');
  }

  onSubmit(form : NgForm){
    console.log("SIGN-IN : submit")
    this.pagolinService.login(form.value).subscribe(
      res => {
        console.log("res de register in front",res)
        this.pagolinService.setToken(res['token']);
        this.router.navigateByUrl('/pagolinProfile');
      },
      err => {
        console.log("erreur sign IN"+err)

        this.serverErrorMessages = err.error.message;
      }
    );
  }

} 