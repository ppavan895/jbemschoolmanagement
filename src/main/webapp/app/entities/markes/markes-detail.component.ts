import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarkes } from 'app/shared/model/markes.model';

@Component({
    selector: 'jhi-markes-detail',
    templateUrl: './markes-detail.component.html'
})
export class MarkesDetailComponent implements OnInit {
    markes: IMarkes;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ markes }) => {
            this.markes = markes;
        });
    }

    previousState() {
        window.history.back();
    }
}
