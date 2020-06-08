import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pagolin } from './pagolin.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagolinService {
  selectedPagolin: Pagolin = {
  //  fullName: '',
    famille: '',
    race: '',
    age: null,
    nourriture: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

 


noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  
  postpagolin(pagolin:Pagolin){
    console.log("environment.apiBaseUrl+'/register'"+environment.apiBaseUrl+'/register')
    return this.http.post(environment.apiBaseUrl+'/register',pagolin,this.noAuthHeader);
  }
  putpangolin(id:number,pagolin:Pagolin){
   
    console.log("EDIT URL=",environment.apiBaseUrl);
    return this.http.put(`${environment.apiBaseUrl}/editPangolin/${id}`,pagolin);
  }


  login(authCredentials) {
console.log("authCredentials"+authCredentials.password);
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);

  }

  getPagolinProfile() {
    console.log("url PROFILE"+environment.apiBaseUrl)
    return this.http.get(environment.apiBaseUrl + '/pagolinProfile');
  }
  getListPagolin(){
    return this.http.get(environment.apiBaseUrl + '/listPagolin');
  }
  onRemovePagolin(id){
    console.log("service delete"+id);
    console.log(" environment.apiBaseUrl =="+ environment.apiBaseUrl );
    return this.http.delete(`${environment.apiBaseUrl}/deletepagolin/${id}`);

  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
 
  getPagolinPayload() {
    var token = this.getToken();
    console.log("TOKEN="+token);
    if (token) {
      var pagolinPayload = atob(token.split('.')[1]);
      console.log("pagolinPayload JSON PARSE="+pagolinPayload);
      return JSON.parse(pagolinPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    console.log("ISLOGGEDIN SERVICE : this.getPagolinPayload() "+this.getPagolinPayload());
    var pagolinPayload = this.getPagolinPayload();
    if (pagolinPayload)
      return pagolinPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}