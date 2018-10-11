import {Component, OnInit} from '@angular/core';
import {CreatedFormElements} from "../formElementsArray";
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
    selector: 'app-all-forms',
    templateUrl: './all-forms.component.html',
    styleUrls: ['./all-forms.component.css']
})
export class AllFormsComponent implements OnInit {
    forms: Object[] = CreatedFormElements;

    constructor(private location: Location,  private route: ActivatedRoute, private router: Router,) {
    }

    ngOnInit() {

    }

    openForm(id):void {
        this.router.navigate([`/form/${id}`])
    }

    goBack():void {
       this.router.navigate(["/"])
    }

}
