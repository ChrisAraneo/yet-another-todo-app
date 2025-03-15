import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppWrapperComponent } from './components/app-wrapper/app-wrapper.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';

@NgModule({
  declarations: [AppWrapperComponent, FooterComponent],
  imports: [
    ToolbarModule,
    CommonModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      useDefaultLang: false,
    }),
    MaterialModule,
  ],
  providers: [],
  exports: [AppWrapperComponent, ToolbarComponent, FooterComponent],
})
export class ContainerModule {}
