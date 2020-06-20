import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
@Injectable({
  providedIn: 'root'
})
export class ProserveService {


  dblist = {};

  private _s3: S3;
  projects: any;
  private _db: DynamoDB;



  constructor() { this.configS3(); this.configDb(); }

  configS3() {

    this._s3 = new S3({
      apiVersion: '2006-03-01',
      region: 'ap-south-1',
    })
  }
  configDb() {

    this._db = new DynamoDB({
      apiVersion: '2012-08-10',
      region: 'ap-south-1',
    })
  }
  getProjects() {
    const params = { TableName: 'projects' }
    return this._db.scan(params).promise();

  }
  getProject(slug: string) {
    const params: DynamoDB.GetItemInput = {
      TableName: 'projects', Key: {
        "slug": {
          S: slug
        }
      }
    }
    return this._db.getItem(params).promise();
  }
  getProjectImages(imagefolder) {
    const params = {
      Bucket: 'capstonereality.com',
      Delimiter: '/',
      Prefix: 'assets/db_images/' + imagefolder + '/'
    }
    return this._s3.listObjectsV2(params).promise();

  }
}
