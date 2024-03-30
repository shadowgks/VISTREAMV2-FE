import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared.service';
import { authUtils } from 'src/app/core/utils/auth.utils';

@Component({
    selector: 'app-vistream-layout',
    standalone: false,
    templateUrl: './vistream-layout.component.html',
    styleUrl: './vistream-layout.component.scss',
})

export class VistreamLayoutComponent {
    ngOnInit() {
        let userDetails: any = {};

        //check user if exist
        if (authUtils.getUser()) {
            userDetails = authUtils.getUser();
            console.log(userDetails.roles[0].name.includes('SUPER_ADMIN', 'ADMIN'));
        }
    }

}