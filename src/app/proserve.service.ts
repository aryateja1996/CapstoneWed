import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
@Injectable({
  providedIn: 'root'
})
export class ProserveService {


  dblist = {};

  private _s3: S3 = new S3();
  projects: any;
  private _db: DynamoDB = new DynamoDB();



  constructor() { }


  getProjects() {
    const params = { TableName: 'projects' }
    return this._db.scan(params).promise();

  }
  getProject(slug: string) {
    const params: DynamoDB.ScanInput = {
      ExpressionAttributeValues: {
        ":a": {
          S: ""+slug
         }
       }, 
      FilterExpression: 'slug = :a',
      TableName: 'projects'
    }
    return this._db.scan(params).promise();
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
