import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {AllFormsComponent} from "./all-forms/all-forms.component";

const routes: Routes = [
    { path: '', redirectTo: '/createForm', pathMatch: 'full' },
    { path: 'createForm', component: DragAndDropComponent },
    { path: 'allForms', component: AllFormsComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
