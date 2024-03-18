import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
    selector: 'app-vistream-layout',
    standalone: false,
    templateUrl: './vistream-layout.component.html',
    styleUrl: './vistream-layout.component.scss',
})

export class VistreamLayoutComponent{
    // constructor(private _sharedService: SharedService) { }
    // backDropUrl !: string;

    // ngOnInit() {
    //     this._sharedService.onDataSaved$.subscribe(() => {
    //         this.backDropUrl = "https://image.tmdb.org/t/p/original" + this._sharedService.getData();
    //         // console.log(this.backDropMedia);
    //     })
    // }

}