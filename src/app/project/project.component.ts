import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProserveService } from '../proserve.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  slug: string;

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
  }

}
