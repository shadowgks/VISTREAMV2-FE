import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Media } from 'src/app/core/models/media';
import { MediaService } from 'src/app/core/services/media.service';
import { TrailerComponent } from './components/trailer/trailer.component';
import { MaterialModule } from 'src/app/material.module';
import { AlsoLikesComponent } from './components/also-likes/also-likes.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';


@Component({
  selector: 'app-details-media',
  standalone: true,
  imports: [CommonModule, MaterialModule, AlsoLikesComponent, BreadCrumbComponent],
  templateUrl: './details-media.component.html',
  styleUrl: './details-media.component.scss'
})
export class DetailsMediaComponent implements OnInit {
  mediaDetailsState$!: Observable<{ appState: string, appData?: ApiResponse<Media> }>;
  shortLink!: string;

  constructor(private _route: ActivatedRoute,
    private _serviceMedia: MediaService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      this.shortLink = p['short_link'];
    })    

    this.getDetailsMedia();
  }

  getDetailsMedia() {
    this.mediaDetailsState$ = this._serviceMedia.getDetailsMedia(this.shortLink).pipe(
      map((response: ApiResponse<Media>) => {
        return ({ appState: "app_loaded", appData: response });
      }
      ),
      startWith({ appState: "app_loading" }),
      catchError((error: HttpErrorResponse) => of({ appState: 'app_error', error }))
    )
  }

  getDurationInHoursAndMinutes(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  //modal trailer
  popUp(key?: string) {
    this.OpenPopup(key);
  }

  OpenPopup(key?: string) {
    this.dialog.open(TrailerComponent, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      data: {
        key: key,
      }
    })
  }
}
