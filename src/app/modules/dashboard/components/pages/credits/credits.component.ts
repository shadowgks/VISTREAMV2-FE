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
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedService } from 'src/app/core/services/shared.service';
import { CreditService } from 'src/app/core/services/credit.service';
import { Credit } from 'src/app/core/models/credit';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { PageEventPrimeNg } from 'src/app/core/models/page-event-prime-ng';
import { ModalCreditComponent } from '../../modals/modal-credit/modal-credit.component';


@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
    MaterialModule,
    FormsModule,
    AngularSvgIconModule,
    PaginatorModule,
    ButtonModule
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
  numberElement !: number;
  creditState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Credit>> }>;

  //paginator PrimeNg
  first: number = 0;
  page: number = 0
  rows: number = 10;

  constructor(private dialog: MatDialog,
    private _creditService: CreditService,
    private _sharedService: SharedService) { }



  ngOnInit(): void {
    this.getCreditsMethode('');
    this._sharedService.onDataSaved$.subscribe(() => {
      this.getCreditsMethode();
    })
    // this.onPageChange(this.pageCount);
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



  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();

  //modal
  FunctionAdd() {
    this.OpenPopup(0, 'created actor');
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

  // public clickNumberPagination(name?: string, numOfPage: number = 0) {
  //   this.creditState$ = this._creditService.getCredits(name, numOfPage).pipe(
  //     map((response: ApiResponse<Page<Credit>>) => {
  //       return ({ appState: "app_loaded", appData: response });
  //     }),
  //     startWith({ appState: "app_loaded" }),
  //     catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
  //   )
  // }

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

  edit(id: number, name: string, adult?: string, gender?: string, popularity?: number) {
    this.OpenPopup(1, 'edited actor', { id, name, adult, gender, popularity });
  }

  public search() {
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
}
