import { Component, OnInit } from '@angular/core';
import { ProserveService } from './proserve.service';
import * as s3 from 'aws-sdk/clients/s3';
import * as db from 'aws-sdk/clients/dynamodb';
import * as aws from 'aws-sdk';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _s3: s3;
  private _db: db;
  projects: any[];
  title = 'cpstone';
  constructor(private proserve: ProserveService) {
    this.configAws();
    this.configS3();
    this.configDb();
  }

  ngOnInit(): void {
    this.getProjects();
  }
  configS3() {

    this._s3 = new s3({
      apiVersion: '2006-03-01',
      region: 'ap-south-1',
    })

  }

  configDb() {

    this._db = new db({
      apiVersion: '2012-08-10',
      region: 'ap-south-1',
    })
  }

  configAws() {
    aws.config.credentials = {
      accessKeyId: 'AKIA5NTKBKUFMSW3NGZC',
      secretAccessKey: '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'

    };
    aws.config.update({
      region: 'ap-south-1',
    });
  }

  getProjects() {
    const params = { TableName: 'projects' }
    this._db.scan(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        //console.log(data)
        this.projects = data.Items
        this.projects.forEach(project => {
          this.getProjectImages(project.imagesFolder.S)
        })
      }
    })
  }

  getProjectImages(imagefolder) {
    const params = {
      Bucket: 'capstonereality.com',
      Delimiter: '/',
      Prefix: 'assets/db_images/' + imagefolder + '/'
    }
    this._s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        // console.log(data);
        const dblist: any = data;
        this.proserve.dblist[imagefolder + ''] = dblist;
      };
    })
  }
}
