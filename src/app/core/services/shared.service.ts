import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private onDataSavedSubject = new Subject<void>();

  onDataSaved$ = this.onDataSavedSubject.asObservable();

  triggerDataSaved() {
    this.onDataSavedSubject.next();
  }
}
