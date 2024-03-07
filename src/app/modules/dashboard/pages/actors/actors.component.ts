import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { ModalComponent } from '../../components/modals/modal-actor/modal-actor.component';
import { BehaviorSubject, Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Page } from 'src/app/core/models/pageable';
import { Actor } from 'src/app/core/models/actor';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActorService } from 'src/app/core/services/actor.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedService } from 'src/app/core/services/shared.service';
import { PrimengModule } from 'src/app/primeng.module';





@Component({
  selector: 'app-actors',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MaterialModule, FormsModule, AngularSvgIconModule],
  templateUrl: './actors.component.html',
  styleUrl: './actors.component.scss'
})

export class ActorsComponent {
// confirm2($event: MouseEvent) {
// }
  form!: FormGroup;
  submitted = false;
  error = '';
  actorState$!: Observable<{ appState: string, appData?: ApiResponse<Page<Actor>> }>;

  constructor(
    private dialog: MatDialog, 
    private actorService: ActorService, 
    private _sharedService: SharedService) { }

  //current page
  private currentPageSubject = new BehaviorSubject<number>(null!);
  currentPage$ = this.currentPageSubject.asObservable();

  //modal
  FunctionAdd() {    
    this.OpenPopup(0, 'created actor');
  }

  OpenPopup(code: number, title: string) {
    // this.store.dispatch(openpopup());
    this.dialog.open(ModalComponent, {
      width: '50%',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
      data: {
        code: code,
        title: title
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
    this.actorState$ = this.actorService.getActorsPageble().pipe(
      map((response: ApiResponse<Page<Actor>>) => {
        this.currentPageSubject.next(response.result.page.number);
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  public clickNumberPagination(name?: string, numOfPage: number = 0) {
    this.actorState$ = this.actorService.getActorsPageble(name, numOfPage).pipe(
      map((response: ApiResponse<Page<Actor>>) => {
        console.log(response);
        // this.responseSubject.next(response);
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

  // //add modal
  // public onAddCompetition(addForm: NgForm) {
  //   this.competitionService.saveCompetition(addForm.value).subscribe(
  //     (response: ApiResponse<Competition>) => {
  //       console.log(response);
  //       this.getCompetitions();

  //       // get btn close modal
  //       const btnClose = document.getElementById('closeModalAdd');
  //       btnClose?.click();

  //       // sweet alert
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'top-end',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener('mouseenter', Swal.stopTimer)
  //           toast.addEventListener('mouseleave', Swal.resumeTimer)
  //         }
  //       })

  //       Toast.fire({
  //         icon: 'success',
  //         title: response.message
  //       })
  //     },
  //     (httpError: HttpErrorResponse) => {
  //       console.log(httpError.error);
  //       if (httpError.error.errorsValidation) {
  //         // sweet alert
  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: 'top-end',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener('mouseenter', Swal.stopTimer)
  //             toast.addEventListener('mouseleave', Swal.resumeTimer)
  //           }
  //         })

  //         Toast.fire({
  //           icon: 'warning',
  //           title: 'You must be validate data!'
  //         })

  //         // Iterate through the error keys and update corresponding form controls
  //         for (const keyError of Object.keys(httpError.error.errorsValidation)) {
  //           if (addForm.controls[keyError]) {
  //             addForm.controls[keyError].setErrors({ 'validationError': httpError.error.errorsValidation[keyError] });
  //           }
  //         }
  //       }

  //       if (httpError.error.error) {
  //         // sweet alert
  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: 'top-end',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener('mouseenter', Swal.stopTimer)
  //             toast.addEventListener('mouseleave', Swal.resumeTimer)
  //           }
  //         })

  //         Toast.fire({
  //           icon: 'error',
  //           title: httpError.error.error
  //         })
  //       }
  //     }
  //   )
  // }
}