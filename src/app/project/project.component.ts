import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProserveService } from '../proserve.service';
import { BehaviorSubject } from 'rxjs';
import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  slug: string;
  project: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  projectImages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  items: GalleryItem[];
  imageData = data;
  constructor(private route: ActivatedRoute, private proserve: ProserveService, public gallery: Gallery, public lightbox: Lightbox) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.getproimg(this.slug);

    })
    /** Basic Gallery Example */

    // Creat gallery items
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
    setTimeout(() => { this.settaimaga(); }, 3000);


  }
  settaimaga() {
    const imgUrls = this.getproimg(this.slug);
    //(imgUrls).forEach((imgUrl) => {
      const dslimg = {
        srcUrl: 'https://s3.ap-south-1.amazonaws.com/capstonereality.com/' + imgUrls,
        previewUrl: 'https://s3.ap-south-1.amazonaws.com/capstonereality.com/' + imgUrls,
      };
    data.push(dslimg)
    // })
  }
  async getproimg(yark: string) {
    const result = await this.proserve.getProject(yark);
    console.log(result);
    if (result.Count) {
      const proj = DynamoDB.Converter.unmarshall(result.Items[0]);
      this.project.next(proj);

      const imgRes = await this.proserve.getProjectImages(proj.imagesFolder);
      console.log(imgRes);
      const contArr = imgRes.Contents as any[];

      const imgArr = contArr.map(cont => {
        return { url: 'https://s3.ap-south-1.amazonaws.com/capstonereality.com/' + cont.Key };
      });

      this.projectImages.next(imgArr);
    }
  }

}
const data = [];