import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProserveService } from '../proserve.service';
import { BehaviorSubject } from 'rxjs';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
 

  slug: string;
  project: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  projectImages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private route: ActivatedRoute, private proserve: ProserveService) {
    
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.getproimg(this.slug);

    })
    
  }
  async getproimg(yark : string){
    const result = await this.proserve.getProject(yark);
    console.log(result);
    if(result.Count){
      const proj = DynamoDB.Converter.unmarshall(result.Items[0]);
      this.project.next(proj);

      const imgRes = await this.proserve.getProjectImages(proj.imagesFolder);
      console.log(imgRes);
      const contArr = imgRes.Contents as any[];

      const imgArr = contArr.map(cont => {
        return {url: 'https://s3.ap-south-1.amazonaws.com/capstonereality.com/' + cont.Key};
      });

      this.projectImages.next(imgArr);
    }
  }

}
