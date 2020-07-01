import { Component, OnInit } from '@angular/core';
import * as SESV2 from 'aws-sdk/clients/sesv2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private _ses: SESV2;
  userName = $("#name").val();
  userEmail = $("#email").val();
  userPhone = $("#phone").val();

  constructor() { this.configSES(); }

  ngOnInit(): void {
    
  }
  private configSES() {

    this._ses = new SESV2({
      apiVersion: '2019-09-27',
      region: 'ap-south-1',
    });
  }
  sendEmail(params) {
    this._ses.sendEmail(params, (err, data) => {
      if (err)
        console.log(err);
      else
        console.log(data);
    })

  }
  paramsPassing() {
    let war = {
      Destination: {
        ToAddresses: ['admin@capstonereality.com']
      },
      Content: {
        Simple: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: '<table><tr><th>Name</th><th>Email</th><th>Phone</th></tr><tr><td>' + this.userName + '</td><td>' + this.userEmail + '</td><td>' + this.userPhone + '</td></tr></table>'
            },
            // Text: {
            //   Charset: 'UTF-8',
            //   Data: 'Or you can use plain text'
            // }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Visitor Details'
          }
        },
      },
      FromEmailAddress: 'capstonereality69@gmail.com' // Must be registered with AWS
    };
    this.sendEmail(war);
  }

  sendit(){ 
    this.paramsPassing;
  }
}





