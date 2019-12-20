import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptorService } from './_core/incerceptors/UniversalInterceptor.service';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UniversalInterceptorService,
          multi: true // <-- important (you can have many interceptors)
        }
    ]
})
export class AppServerModule {}
