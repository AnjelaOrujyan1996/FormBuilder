import {
    AfterViewChecked,
    Component,
    ElementRef, HostBinding,
    Inject,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';

import {DragulaService} from "ng2-dragula";
import {DOCUMENT} from "@angular/common";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

import {InputComponent} from "../input/input.component";
import {CreatedFormElements} from "../formElementsArray"
import {TextAreaComponent} from "../text-area/text-area.component";
import {SelectComponent} from "../select/select.component";
import {EditingOptions} from "../editingOptions";
import {NgForm} from "@angular/forms";
import {FormIndex} from "../formIndex"
import {Router} from "@angular/router";

@Component({
    selector: 'app-drag-and-drop',
    templateUrl: './drag-and-drop.component.html',
    styleUrls: ['./drag-and-drop.component.css'],
    providers: [NgbModalConfig, NgbModal, InputComponent, TextAreaComponent, SelectComponent],

})
export class DragAndDropComponent implements OnInit, AfterViewChecked {
    left: String[][] = [
        ['Input', 'fa fa-edit'],
        ['Select Option', 'fa fa-check-square'],
        ['Text Area', 'fa fa-align-left'],
    ];

    right: String[] = [];

    dragulaName:String;

    CreatedFormElements: Object[] = CreatedFormElements;
    @ViewChild('mainContent') mainContent: ElementRef<any>;

    @ViewChild('el') el: ElementRef<any>;

    @ViewChild('formContent') formContent: ElementRef;
    @ViewChild('saveMsg') saveMsg: ElementRef;
    @ViewChild('Input') dragInputElem: TemplateRef<any>;
    @ViewChild('SelectOption') dragSelectElem: TemplateRef<any>;
    @ViewChild('TextArea') dragTextAreaElem: TemplateRef<any>;
    @ViewChild('Date') dragDateElem: TemplateRef<any>;
    @Inject(DOCUMENT) document;

    @ViewChild("form") form: NgForm;
    formName: String;
    formDescription: String;
    formInd: any = FormIndex['formIndex'];

    constructor(config: NgbModalConfig, private inputComponent: InputComponent, private dragulaService: DragulaService, private modalService: NgbModal, public router:Router) {
        config.backdrop = 'static';
        config.keyboard = false;
        this.dragulaName = this.makeid();
        dragulaService.createGroup(`${this.dragulaName}`, {
            copy: (el, source) => {
                return source.id === 'left';
            },
            copyItem: (el: String[]) => {
                this.open(el[0], "Add");
                return el;
            },
            accepts: (el, target, source, sibling) => {
                // this.dropId = target.id;
                return target.id !== 'left';
            }
        });
    }


   makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    ngOnInit() {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
        this.mainContent.nativeElement.style.height = window.innerHeight + "px";

    }


    ngAfterViewChecked() {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
    }

    open(name, btnName) {
        switch (name) {
            case "Input": {
                if (btnName === "Add")
                    EditingOptions.splice(0, 1, {
                        inputLabel: "",
                        inputType: "text",
                        inputName: "",
                        optionCount: 1,
                        optionValues: [],
                        edit: false,
                    })
                this.modalService.open(this.dragInputElem, {size: 'lg'});
                break;
            }
            case "Select Option": {
                if (btnName === "Add")
                    EditingOptions.splice(0, 1, {
                        type: "Select",
                        selectLabel: "",
                        optionCount: 1,
                        optionValues: [],
                        edit: false,
                    })

                this.modalService.open(this.dragSelectElem, {size: 'lg'});
                break;
            }
            case "Select": {
                if (btnName === "Add")
                    EditingOptions.splice(0, 1, {
                        type: "Select",
                        selectLabel: "",
                        optionCount: 1,
                        optionValues: [],
                        edit: false,
                    })

                this.modalService.open(this.dragSelectElem, {size: 'lg'});
                break;
            }
            case "Text Area": {
                if (btnName === "Add")
                    EditingOptions.splice(0, 1, {
                        type: "Textarea",
                        textAreaLabel: "",
                        rowsCount: 1,
                        colsCount: 1,
                        edit: false,
                    })
                this.modalService.open(this.dragTextAreaElem, {size: 'lg'});
                break;
            }
            case "TextArea": {
                if (btnName === "Add")
                    EditingOptions.splice(0, 1, {
                        type: "Textarea",
                        textAreaLabel: "",
                        rowsCount: 1,
                        colsCount: 1,
                        edit: false,
                    })
                this.modalService.open(this.dragTextAreaElem, {size: 'lg'});
                break;
            }
        }
    }

    edit(type, ind) {
        console.log(type)
        EditingOptions[0] = CreatedFormElements[this.formInd]['options'][ind];
        EditingOptions[0]['ind'] = ind;
        EditingOptions[0]['edit'] = true;
        this.open(type, "Edit");

    }

    delete(ind) {
        let x = confirm("Are you sure you want to delete it?")
        if (x) {
            CreatedFormElements[this.formInd]['options'].splice(ind, 1);
        }
    }

    saveForm(d) {
        let x = confirm("Are you sure you want to save it?")
        if (x) {
            CreatedFormElements[this.formInd]['formIndex'] = this.formInd;
            CreatedFormElements[this.formInd]['formName'] = this.formName;
            CreatedFormElements[this.formInd]['formDescription'] = this.formDescription;
            CreatedFormElements[this.formInd]['options'] =  this.CreatedFormElements[this.formInd]['options'];
            CreatedFormElements[this.formInd]['date'] = new Date();

            FormIndex['formIndex']++;
            CreatedFormElements.push({
                formIndex: Number,
                formName: String,
                formDescription: String,
                date: Date,
                options: []
            })

            this.router.navigate(["/allForms"]);
        } else {
            return;
        }
        this.formName = "";
        this.formDescription = "";
        d();
        console.dir(CreatedFormElements)
    }

    openFormModal(content) {
        this.modalService.open(content);
    }
}






