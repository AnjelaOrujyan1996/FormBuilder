import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DragAndDropComponent} from './drag-and-drop/drag-and-drop.component';
import {DragulaModule} from "ng2-dragula";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SortableModule} from "@progress/kendo-angular-sortable";
import {SortablejsModule} from "angular-sortablejs";
import {FormsModule} from "@angular/forms";
import {InputComponent } from './input/input.component';
import { CreatedInputViewComponent } from './created-input-view/created-input-view.component';
import {BsDatepickerModule} from "ngx-bootstrap";
import { SelectComponent } from './select/select.component';
import { CreatedSelectViewComponent } from './created-select-view/created-select-view.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { CreatedTextAreaviewComponent } from './created-text-areaview/created-text-areaview.component';
import { AllFormsComponent } from './all-forms/all-forms.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
    declarations: [
        AppComponent,
        DragAndDropComponent,
        InputComponent,
        CreatedInputViewComponent,
        SelectComponent,
        CreatedSelectViewComponent,
        TextAreaComponent,
        CreatedTextAreaviewComponent,
        AllFormsComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragulaModule.forRoot(),
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        SortableModule,
        SortablejsModule.forRoot({ animation: 150 }),
        BsDatepickerModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
