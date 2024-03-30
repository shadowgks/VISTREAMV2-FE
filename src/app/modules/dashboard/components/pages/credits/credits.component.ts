import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Page } from 'src/app/core/models/pageable';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedService } from 'src/app/core/services/shared.service';
import { CreditService } from 'src/app/core/services/credit.service';
import { Credit } from 'src/app/core/models/credit';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PageEventPrimeNg } from 'src/app/core/models/page-event-prime-ng';
import { ModalCreditComponent } from '../../modals/modal-credit/modal-credit.component';
import { DeleteComponent } from '../../modals/modal-credit/delete/delete.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthenticatorService } from 'src/app/core/services/authenticator.service';





@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [ToastModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
    MaterialModule,
    FormsModule,
    AngularSvgIconModule,
    PaginatorModule,
    ButtonModule,
    ConfirmPopupModule
  ],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss',
  providers: [ConfirmationService, MessageService]

})


export class CreditsComponent {
  form!: FormGroup;
  submitted = false;
  error = '';
  searchTerm = '';
  name = 'Credits'
  numberElement !: number;
  creditState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Credit>> }>;

  //paginator PrimeNg
  first: number = 0;
  page: number = 0
  rows: number = 10;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService ,private dialog: MatDialog,
    private _creditService: CreditService,
    private _sharedService: SharedService,
    private _authenticatorService: AuthenticatorService) { }


  ngOnInit(): void {
    this.getCreditsMethode('');
    this._sharedService.onDataSaved$.subscribe(() => {
      this.getCreditsMethode();
    })
    //refresh token
    this._authenticatorService.$refreshTokenReceived.subscribe(()=> {      
      this.getCreditsMethode();
    })
  }

  //events pagebale and search
  onPageChange(event: PageEventPrimeNg) {
    this.first = event.first as number;
    this.rows = event.rows as number;
    this.page = event.page as number;
    console.log(event);

    this.getCreditsMethode(this.searchTerm, this.page, this.rows);
  }

  onKeyUp(event: any) {
    this.searchTerm = event.target.value;
    console.log(this.searchTerm);
    
    if (this.searchTerm == '') {
      this.getCreditsMethode();
    } else {
      this.creditState$ = this._creditService.search(this.searchTerm).pipe(
        map((response: ApiResponse<Page<Credit>>) => {
          return ({ appState: "app_loaded", appData: response });
        }),
        startWith({ appState: "app_loading" }),
        catchError((error: HttpErrorResponse) => of({ appState: "app_error", error })),
      )
    }
  }
  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            this.delete(id);
        }
    });
}

  //modal
  FunctionAdd() {
    this.OpenPopup(0, 'created');
  }

  OpenPopup(code: number, title: string, data?: any) {
    // this.store.dispatch(openpopup());
    this.dialog.open(ModalCreditComponent, {
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

  public getCreditsMethode(searchT?: string, countPage?: number, sizePage?: number) {
    this.creditState$ = this._creditService.getCredits(searchT, countPage, sizePage).pipe(
      map((response: ApiResponse<Page<Credit>>) => {
        this.numberElement = response.result.page.pageable.pageNumber * response.result.page.pageable.pageSize;
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  delete(id: number) {
    this.creditState$ = this._creditService.delete(id).pipe(
      map((response: ApiResponse<any>) => {
        this.getCreditsMethode();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        return ({ appState: "app_loaded", appData: response });
      }),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  edit(id: number, name: string, adult?: string, gender?: string, popularity?: number) {
    this.OpenPopup(1, 'edited', { id, name, adult, gender, popularity });
  }

  public search() {
    if (this.searchTerm == '') {
      this.getCreditsMethode();
    } else {
      this.creditState$ = this._creditService.search(this.searchTerm).pipe(
        map((response: ApiResponse<Page<Credit>>) => {
          return ({ appState: "app_loaded", appData: response });
        }),
        startWith({ appState: "app_loading" }),
        catchError((error: HttpErrorResponse) => { 
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          return of({appState: "app_error", error})
        }),
      )
    }
  }
}
