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
  tooltipcontent=[
    ["Name : Geetha","\n"],
    ["Phone Number : 9963028580"],
    ["Email : admin@capstonereality.com"]

  ];
  private _db: db;
  projects: any[];
  title = 'cpstone';
  constructor(private proserve: ProserveService) {



  }

  ngOnInit(): void {

  }
  







}
