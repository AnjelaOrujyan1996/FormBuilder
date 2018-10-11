import {Component, OnInit} from '@angular/core';
import {CreatedFormElements} from "../formElementsArray";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-selected-form',
    templateUrl: './selected-form.component.html',
    styleUrls: ['./selected-form.component.css']
})
export class SelectedFormComponent implements OnInit {
    formInd: Number;
    CreatedFormElements: Object[] = CreatedFormElements;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getForm();
    }

    getForm() {
        const id = +this.route.snapshot.paramMap.get('id');
        //http.get(id)
        this.formInd = id;
    }

}
