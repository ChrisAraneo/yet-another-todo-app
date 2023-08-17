import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { FormsModule } from '../forms/forms.module';
import { DialogService } from '../modals/services/dialog/dialog.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { NavigationItemComponent } from './components/side-navigation/navigation-item/navigation-item.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

@NgModule({
  declarations: [SideNavigationComponent, NavigationItemComponent],
  imports: [
    SharedModule,
    FormsModule,
    MaterialModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
  ],
  providers: [DialogService],
  exports: [SideNavigationComponent],
})
export class SideNavigationModule {}
