import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CryptoService } from '../crypto.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private router:Router,private _crypto:CryptoService) { }
  public result;
  public marketCap: number;
  public percent_change_1h: number;
  public percent_change_24h: number;
  public percent_change_7d: number;
  public priceArray: any = [];
  public day: any = ['7d','24h','1h','current'];
  public price: number;
  chart: any= [];

  ngOnInit() {
    let id=this._route.snapshot.paramMap.get('id');
    //console.log(id);
    this._crypto.getSpecificTickerData(id).subscribe(res => {
      //console.log(res);
      this.result = res['data'];
      //console.log(this.result);
      this.price = this.result.quotes.USD.price;
      this.marketCap = this.result.quotes.USD.market_cap;
      this.percent_change_1h = this.result.quotes.USD.percent_change_1h;
      this.percent_change_7d = this.result.quotes.USD.percent_change_7d;
      this.percent_change_24h = this.result.quotes.USD.percent_change_24h;
      this.priceArray[0]=this.price;
      this.priceArray[1]=this.price+(this.price*this.percent_change_1h);
      console.log(this.price);
      this.priceArray[2]=this.price+(this.price*this.percent_change_24h);
      console.log(this.price);
      this.priceArray[3]=this.price+(this.price*this.percent_change_7d);
      console.log(this.price);
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.day,
          datasets: [
            {
              label : "Price of " + this.result.name,
              data: this.priceArray.reverse(this.priceArray),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          title:{
            display : true,
            text : "Price of " + this.result.name
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
      
      
    })
  }

}
