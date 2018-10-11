import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DragAndDropComponent} from "./drag-and-drop/drag-and-drop.component";
import {AllFormsComponent} from "./all-forms/all-forms.component";
import {SelectedFormComponent} from "./selected-form/selected-form.component";
import {AuthGuardService as checkFormsExistOrNot} from "./auth-guard.service";

const routes: Routes = [
    { path: '', redirectTo: '/createForm', pathMatch: 'full' },
    { path: 'createForm', component: DragAndDropComponent},
    { path: 'allForms', component: AllFormsComponent, canActivate: [checkFormsExistOrNot]},
    { path: 'form/:id', component: SelectedFormComponent, canActivate: [checkFormsExistOrNot]},
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
