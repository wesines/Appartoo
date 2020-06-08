import { Component, OnInit } from '@angular/core';
import { PagolinService } from '../../shared/pagolin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private pagolinService: PagolinService) { }

  ngOnInit() {
    console.log("hello  I am ngoninit");
   
    console.log(" this.serverErrorMessages", this.serverErrorMessages);
  }

  onSubmit(form: NgForm) {
    console.log("hello  I am in form age="+form.value.age); 
    this.pagolinService.postpagolin(form.value).subscribe(
      res => {
        
        console.log(" this.serverErrorMessages", this.serverErrorMessages);
         this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 2000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          console.log("form.value"+this.serverErrorMessages);
          this.serverErrorMessages = err.error.join('<br/>')
       
        }
        else
          this.serverErrorMessages = 'Il y a une erreur. Veuillez vérifier les données enregistrées';
      }
    );
  }

  resetForm(form: NgForm) {
    this.pagolinService.selectedPagolin= {
   
      famille: '',
      race: '',
      age: null,
      nourriture: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}