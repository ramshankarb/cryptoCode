import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
//import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CookieService } from 'angular2-cookie/core';

import { CryptoService } from '../crypto.service'
import { Model } from '../models/list.model'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    arr: any[];
    model: Model;
    arr2: Model[] = [];
    source: Model[] = [];
    selectedSource: Model[] = [];
    params: any;
    flagID: any = 0;
    flagNAME: any = 0;
    flagMARKET: any = 0;
    flagPRICE: any = 0;
    public objectKeys = Object.keys;
    public result;
   // public cookieInfo;
    //cookie: Object;
    cookies: Object[]=[];
    flagcookie:any=0;
    result2: Object;
    arr3: string[];
    newCookie: Model;
    tableTitles: string[] = ['Select','Name','MarketCap','Current Price','Favourites'];
    //buttonColor: string;

    constructor(private _crypto: CryptoService, private toastaService: ToastaService, private toastaConfig: ToastaConfig,private _cookieService:CookieService) {
        this.toastaConfig.theme = 'bootstrap';
    }

    
    
    showSuccess(res: any) {
      //++this.flagcookie;
      //console.log(res.id)
        //if(this.flagcookie>0){
        this._cookieService.putObject(res.id,res);
        //console.log(this._cookieService.getObject(this.flagcookie)); 
        this.toastaService.success({
            title: "Success!",
            msg: "Marked as favourites...",
            showClose: false,
            timeout: 3000,
            theme: "bootstrap"
        });
        //this.buttonColor = '#345465';
        this.ngOnInit();

      //} 
    }
    sortById(source: any) {
        this.flagID++;
        if (this.flagID % 2 == 1) {
            source.sort(function(a, b) {
                let textA = a.id;
                let textB = b.id;
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0
            })
        }
        else {
            source.sort(function(a, b) {
                let textA = a.id;
                let textB = b.id;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })

        }
    }
    sortByName(source: any) {
        this.flagNAME++;
        console.log(source);
        if (this.flagNAME % 2 == 1) {
            source.sort(function(a, b) {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
        }
        else {
            source.sort(function(a, b) {
                let textA = a.name.toLowerCase();
                let textB = b.name.toLowerCase();
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0
            })
        }
    }
    sortByMarket(source: any) {
        this.flagMARKET++;
        if (this.flagMARKET % 2 == 1) {
            source.sort(function(a, b) {
                let textA = a.marketCap;
                let textB = b.marketCap;
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0
            })
        }
        else {
            source.sort(function(a, b) {
                let textA = a.marketCap;
                let textB = b.marketCap;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
        }
    }
    sortByPrice(source: any) {
        this.flagPRICE++;
        if (this.flagPRICE % 2 == 1) {
            source.sort(function(a, b) {
                let textA = a.price;
                let textB = b.price;
                return (textA < textB) ? 1 : (textA > textB) ? -1 : 0
            })
        }
        else {
            source.sort(function(a, b) {
                let textA = a.price;
                let textB = b.price;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
            })
        }
    }
    getTickerData() {

        this._crypto.getTickerData().subscribe(res => {
            this.result = res['data'];
            this.arr = this.objectKeys(this.result);
            for (let i of this.arr) {
                this.model = new Model();
                this.model.id = this.result[i]["id"];
                this.model.name = this.result[i]["name"];
                this.model.price = this.result[i].quotes.USD.price;
                this.model.marketCap = this.result[i].quotes.USD.market_cap;
                //console.log(this.model);
                this.arr2.push(this.model);
            }
            this.source = this.arr2;
            this.selectedSource=this.source;
        })
    }
    ngOnInit() {
      //this.getAllCookies();
      this.getTickerData();
    }
    onValueChanged(e){
        let selectedSource: any[]=[];
        this.source.forEach((item,index)=>{
            if(item.price >=e.value[0] && item.price <= e.value[1]){
                selectedSource.push(item);
            }
        })
        this.selectedSource=selectedSource;
    }
    
}
