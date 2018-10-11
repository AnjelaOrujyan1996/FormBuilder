import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CreatedFormElements} from "./formElementsArray";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public router: Router) {}
    canActivate(): boolean {
        if (CreatedFormElements.length <= 1) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}