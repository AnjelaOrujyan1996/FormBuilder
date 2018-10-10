import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CreatedFormElements} from "../formElementsArray";
import {CreatedSelectViewComponent} from "../created-select-view/created-select-view.component";
import {EditingOptions} from "../editingOptions";
import {FormIndex} from "../formIndex";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css'],
    providers: [CreatedSelectViewComponent]
})
export class SelectComponent implements OnInit {
    optionValues: String[] = [];
    selectOptions: Object = EditingOptions[0];
    edit:Boolean;
    selectLabel:String;
    optionCount:String;
    optError:Boolean;
    ind:Number;

    formInd:any = FormIndex['formIndex'];

    @Output() closeSelectModal = new EventEmitter<any>();

    @ViewChild('view') view: ElementRef;

    constructor() {

    }

    ngOnInit() {

        if (this.selectOptions['optionValues']) {
            this.optionValues = this.selectOptions['optionValues'];
        }
        this.edit = this.selectOptions['edit'];
        this.selectLabel = this.selectOptions['selectLabel'];
        this.optionCount = this.selectOptions['optionCount'];
        this.view.nativeElement.style.display = "block";
    }

    updateAndSeeView(e) {
        if (e.name === "optValue") {
            this.optionValues.splice(+(e.id), 1, e.value);
            for(let i = 0; i < this.optionValues.length; ++i){
                if (this.optionValues[i] === "") {
                    this.ind = i;
                    this.optError = true;
                    return;
                } else {
                    this.ind = null;
                    this.optError = false;
                }
            }
        } else if (e.name === "optCount" && +(e.value) < this.selectOptions['optionValues'].length) {
            this.optionValues.splice(+(e.value), 1)
        }

        this.selectOptions = {
            type: "Select",
            selectLabel: this.selectLabel,
            optionCount: this.optionCount,
            optionValues: this.optionValues
        }

        this.view.nativeElement.style.display = "block";
    }

    save() {
        this.selectOptions = {
            type: "Select",
            selectLabel: this.selectLabel,
            optionCount: this.optionCount,
            optionValues: this.optionValues,
        }

        if (EditingOptions[0]['edit']){
            this.selectOptions['ind']= EditingOptions[0]['ind']
        } else {
            this.selectOptions['ind'] = CreatedFormElements[this.formInd]['options'].length;
        }

        CreatedFormElements['formInd'] = this.formInd;

        if (EditingOptions[0]['edit']) CreatedFormElements[this.formInd]['options'].splice(this.selectOptions['ind'], 1, this.selectOptions);
        else CreatedFormElements[this.formInd]['options'].push(this.selectOptions);
        console.log(CreatedFormElements[this.formInd]);
        this.close();

    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    close() {
        EditingOptions.splice(0, 1)
        this.closeSelectModal.emit("close")
    }
}
