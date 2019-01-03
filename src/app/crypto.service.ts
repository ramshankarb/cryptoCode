import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {HttpErrorResponse , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private _http:HttpClient) { }

  public baseUrl = "https://api.coinmarketcap.com/v2/ticker/";
  
  // getData():Observable<Model[]> {
  //   let response= this._http.get<Model[]>(this.baseUrl);
  //   console.log(response);
  //   return response;
  // }
   public getTickerData():any{
  //let response = this._http.get(this.baseUrl);
  //console.log(response);
  //return Array.of(response);
  //return this._http.get(this.baseUrl).pipe(map(result => result));
  return this._http.get(this.baseUrl);
  }

  public getSpecificTickerData(id):any{
  //console.log(this.baseUrl+id);
  //return this._http.get(this.baseUrl+id+'/').pipe(map(result => result));
  return this._http.get(this.baseUrl+id+'/');
  }
  public setInfoInLocalStorage = (data) =>{
    localStorage.setItem('favouriteInfo',JSON.stringify(data));
  }

  public getInfoInLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('favouriteInfo'));
  }
}
