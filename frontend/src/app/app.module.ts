import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableComponent} from './table/table.component';
import {TableModule} from 'primeng/table';
import {TransformDataTypePipe} from './table/transform-data-type.pipe';

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        TransformDataTypePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        TableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
