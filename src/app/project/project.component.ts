import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  slug: string;
  private DynamoDB;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
    })
  }

}
