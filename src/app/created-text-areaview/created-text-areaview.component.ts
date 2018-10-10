import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-created-text-areaview',
    templateUrl: './created-text-areaview.component.html',
    styleUrls: ['./created-text-areaview.component.css']
})
export class CreatedTextAreaviewComponent implements OnInit {
    @Input() public textAreaOptions;

    constructor() {
    }

    ngOnInit() {
    }

}
