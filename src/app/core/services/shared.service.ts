import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private onDataSavedSubject = new Subject<void>();
  sharedData !: any;

  onDataSaved$ = this.onDataSavedSubject.asObservable();

  //like event
  triggerDataSaved() {
    this.onDataSavedSubject.next();
  }

  //store data and get
  setData(data: any) {
    this.sharedData = data;
  }
  getData() {
    return this.sharedData;
  }

}
