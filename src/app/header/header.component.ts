import { Component, OnInit } from '@angular/core';


import * as db from 'aws-sdk/clients/dynamodb';
import * as aws from 'aws-sdk';
import { ProserveService } from '../proserve.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  private _db: db;
  projects: any[];
  title = 'cpstone';
  constructor(private proserve: ProserveService) {
    this.configAws();
    
    
  }

  ngOnInit(): void {
    
  }
 

  

  configAws() {
    
  }

 


}
