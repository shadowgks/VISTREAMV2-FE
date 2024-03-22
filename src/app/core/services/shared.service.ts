import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private onDataSavedSubject = new Subject<void>();
  sharedData !: any;

  //like event
  onDataSaved$ = this.onDataSavedSubject.asObservable();
  triggerDataSaved() {
    this.onDataSavedSubject.next();
  }

  //store data and get
  setData(data: any) {
    this.sharedData = data;
  }
  getData() : Observable<any>{
    return this.sharedData;
  }

}
