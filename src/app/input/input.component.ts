import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CreatedInputViewComponent} from '../created-input-view/created-input-view.component';
import {CreatedFormElements} from '../formElementsArray';
import {EditingOptions} from '../editingOptions';
import {DOCUMENT} from '@angular/common';
import {FormIndex} from '../formIndex';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [CreatedInputViewComponent]
})

export class InputComponent implements OnInit {

    @ViewChild('view') view: ElementRef;
    @Inject(DOCUMENT) document: any;

    editingOptions: Object = EditingOptions[0];
    optionValues: String[] = [];
    edit: Boolean;
    inputType: String;
    inputLabel: String;
    optionCount: Number;
    optError: Boolean = false;
    ind: Number;
    formInd: any = FormIndex['formIndex'];

    @Output() closeInputModal = new EventEmitter<any>();

    constructor() {

    }


    ngOnInit() {

        if (this.editingOptions['optionValues']) {
            this.optionValues = this.editingOptions['optionValues'];
        }
        this.edit = this.editingOptions['edit'];
        this.inputType = this.editingOptions['inputType'];
        this.inputLabel = this.editingOptions['inputLabel'];
        this.optionCount = this.editingOptions['optionCount'];
        this.view.nativeElement.style.display = 'block';

    }

    updateAndSeeView(e) {
        if (e.name === 'optValue') {
            this.optionValues.splice(+(e.id), 1, e.value);

            for (let i = 0; i < this.optionValues.length; ++i) {
                if (this.optionValues[i] === '') {
                    this.ind = i;
                    this.optError = true;
                    return;
                } else {
                    this.ind = null;
                    this.optError = false;
                }
            }
        }
        else if (e.name === 'optCount' && +(e.value) < this.editingOptions['optionValues'].length) {
            this.optionValues.splice(+(e.value), 1);
        } else if (e.name === 'optCount' && +(e.value) > this.editingOptions['optionValues'].length) {
            this.optionValues.splice(+(e.value), 0, '');
            this.ind = +(e.value);
            this.optError = true;
        } else if (e.name === 'types') {
            if (this.inputType === 'radio' || this.inputType === 'checkbox') this.optError = true; else this.optError = false;
        }

        this.editingOptions = {
            inputLabel: this.inputLabel,
            inputType: this.inputType,
            optionCount: this.optionCount,
            optionValues: this.optionValues,
        };
    }

    save() {
        this.editingOptions = {
            type: 'Input',
            inputLabel: this.inputLabel,
            inputType: this.inputType,
            optionCount: this.optionCount,
            optionValues: this.optionValues,
        };
        if (EditingOptions[0]['edit']) {
            this.editingOptions['ind'] = EditingOptions[0]['ind'];
        } else {
            this.editingOptions['ind'] = CreatedFormElements[this.formInd]['options'].length;
        }

        this.editingOptions['inputName'] = this.editingOptions['ind'];

        if (EditingOptions[0]['edit']) CreatedFormElements[this.formInd]['options'].splice(this.editingOptions['ind'], 1, this.editingOptions);
        else CreatedFormElements[this.formInd]['options'].push(this.editingOptions);
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log(CreatedFormElements[this.formInd]['options']);
        this.close();

    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    close() {
        EditingOptions.splice(0, 1);
        this.closeInputModal.emit('close');
    }
}
