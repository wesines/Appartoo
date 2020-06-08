import { Component, OnInit } from '@angular/core';
import { PagolinService } from '../shared/pagolin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  pagolinDetails;
  isAuth:boolean;

  constructor(private pagolinService: PagolinService, private router: Router) { }

  ngOnInit() {
    this.pagolinService.getPagolinProfile().subscribe(
      res => {
        this.isAuth=true;
        console.log("retour de la base apres get pagolin profile ");
        this.pagolinDetails = res['pagolin'];
      },
      err => { 
        this.isAuth=false;
        console.log(err);
        
      }
    );
      }

      onSignOut(){
        this.pagolinService.deleteToken();
        this.router.navigate(['/login']);
      }
 

  }



  

