import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-created-select-view',
    templateUrl: './created-select-view.component.html',
    styleUrls: ['./created-select-view.component.css']
})
export class CreatedSelectViewComponent implements OnInit {
    @Input() public selectOptions;

    constructor() {
    }

    ngOnInit() {
        console.log(this.selectOptions, "llllllllllllllllllll")
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }
}
