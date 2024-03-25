import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Page } from 'src/app/core/models/pageable';
import { Actor } from 'src/app/core/models/actor';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedService } from 'src/app/core/services/shared.service';
import { ModalComponent } from '../../modals/modal-actor/modal-actor.component';
import { CreditService } from 'src/app/core/services/credit.service';
import { Credit } from 'src/app/core/models/credit';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';






@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MaterialModule, FormsModule, AngularSvgIconModule, 
    ],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {
  form!: FormGroup;
  submitted = false;
  error = '';
  searchTerm = '';
  name = 'Credits'
  creditState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Credit>> }>;

  constructor(private dialog: MatDialog,
    private _creditService: CreditService,
    private _sharedService: SharedService) { }






  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();

  //modal
  FunctionAdd() {
    this.OpenPopup(0, 'created actor');
  }

  OpenPopup(code: number, title: string, data?: any) {
    // this.store.dispatch(openpopup());
    this.dialog.open(ModalComponent, {
      width: '50%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        code: code,
        title: title,
        ...data
      }
    })
  }


  ngOnInit(): void {
    this.getActors();
    this._sharedService.onDataSaved$.subscribe(() => {
      this.getActors();
    })
  }


  public getActors() {
    this.creditState$ = this._creditService.getCredits().pipe(
      map((response: ApiResponse<Page<Credit>>) => {
        this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNumberPagination(name?: string, numOfPage: number = 0) {
    this.creditState$ = this._creditService.getCredits(name, numOfPage).pipe(
      map((response: ApiResponse<Page<Credit>>) => {
        this.currentPageSubject.next(numOfPage);
        return ({ appState: "app_loaded", appData: response });
      }),
      startWith({ appState: "app_loaded" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNextOrPrevious(name?: string, direction?: string) {
    this.clickNumberPagination(name, direction === 'next' ?
      this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  delete(id: number) {
    // this.creditState$ = this._creditService.deleteActor(id).pipe(
    //   map((response: ApiResponse<any>) => {
    //     console.log(response);
    //     this.getActors();
    //     return ({ appState: "app_loaded", appData: response });
    //   }),
    //   startWith({ appState: "app_loading" }),
    //   catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    // )
  }

  edit(id: number, fullName: string, birthDate: string) {
    this.OpenPopup(1, 'edited actor', { id, fullName, birthDate });
  }

  public search() {
    if (this.searchTerm == '') {
      this.getActors();
    } else {
      // this.creditState$ = this._creditService.searchActors(this.searchTerm).pipe(
      //   map((response: ApiResponse<Page<Credit>>) => {
      //     return ({ appState: "app_loaded", appData: response });
      //   }),
      //   startWith({ appState: "app_loading" }),
      //   catchError((error: HttpErrorResponse) => of({ appState: "app_error", error })),
      // )
    }
  }
}
