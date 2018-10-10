import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CreatedFormElements} from "../formElementsArray";
import {CreatedTextAreaviewComponent} from "../created-text-areaview/created-text-areaview.component";
import {EditingOptions} from "../editingOptions";
import {FormIndex} from "../formIndex";

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css'],
    providers: [CreatedTextAreaviewComponent]
})
export class TextAreaComponent implements OnInit {
    textAreaOptions: Object = EditingOptions[0];

    @Output() closeTextAreaModal = new EventEmitter<any>();
    @ViewChild('view') view: ElementRef;
    textAreaLabel:String;
    rowsCount:Number;
    colsCount:Number;

    formInd:any = FormIndex['formIndex']

    constructor() {
    }

    ngOnInit() {
        this.textAreaLabel = this.textAreaOptions['textArealabel'];
        this.rowsCount = this.textAreaOptions['rowsCount'];
        this.colsCount = this.textAreaOptions['colsCount']
    }

    updateAndSeeView(e) {

        this.textAreaOptions = {
            type: "Textarea",
            textAreaLabel: this.textAreaLabel,
            rowsCount: this.rowsCount,
            colsCount: this.colsCount,
        }
        this.view.nativeElement.style.display = "block";
    }

    save() {

        this.textAreaOptions = {
            type: "TextArea",
            textAreaLabel: this.textAreaLabel,
            rowsCount: this.rowsCount,
            colsCount: this.colsCount,
        }

        if (EditingOptions[0]['edit']){
            this.textAreaOptions['ind']= EditingOptions[0]['ind']
        } else {
            this.textAreaOptions['ind'] = CreatedFormElements[this.formInd]['options'].length;
        }

        CreatedFormElements['formInd'] = this.formInd;

        if (EditingOptions[0]['edit']) CreatedFormElements[this.formInd]['options'].splice(this.textAreaOptions['ind'], 1, this.textAreaOptions);
        else CreatedFormElements[this.formInd]['options'].push(this.textAreaOptions);

        console.dir(CreatedFormElements[this.formInd]['options']);

        this.close();

    }

    arrayOne(n:Number): any[] {
        return Array(n);
    }

    close() {
        this.closeTextAreaModal.emit("close")
    }

}
