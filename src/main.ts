import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as aws from 'aws-sdk';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
aws.config.credentials = {
  accessKeyId: 'AKIA5NTKBKUFMSW3NGZC',
  secretAccessKey: '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'

};
aws.config.update({
  region: 'ap-south-1',
});
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
