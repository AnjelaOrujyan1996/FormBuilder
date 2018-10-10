import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-created-input-view',
    templateUrl: './created-input-view.component.html',
    styleUrls: ['./created-input-view.component.css'],
})
export class CreatedInputViewComponent implements OnInit {
    @Input() public inputOptions;
    bsValue = new Date();
    bsRangeValue: Date[];
    maxDate = new Date();
    constructor() {
        this.maxDate.setDate(this.maxDate.getDate() + 7);
        this.bsRangeValue = [this.bsValue, this.maxDate];
    }
    ngOnInit() {

    }

    arrayOne(n: number): any[] {
        return Array(n);
    }



}
