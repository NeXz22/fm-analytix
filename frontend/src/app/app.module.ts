import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableComponent} from './table/table.component';
import {TableModule} from 'primeng/table';
import {TransformDataTypePipe} from './table/transform-data-type.pipe';
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import { SortByOrderIndexPipe } from './table/sort-by-order-index.pipe';
import {FieldsetModule} from "primeng/fieldset";
import { HeaderLabelPipe } from './table/header-label.pipe';

@NgModule({
    declarations: [
        AppComponent,
        TableComponent,
        TransformDataTypePipe,
        SortByOrderIndexPipe,
        HeaderLabelPipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        ListboxModule,
        FieldsetModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
