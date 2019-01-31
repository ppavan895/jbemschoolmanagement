import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClassName } from 'app/shared/model/class-name.model';

@Component({
    selector: 'jhi-class-name-detail',
    templateUrl: './class-name-detail.component.html'
})
export class ClassNameDetailComponent implements OnInit {
    className: IClassName;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ className }) => {
            this.className = className;
        });
    }

    previousState() {
        window.history.back();
    }
}
