import { ElementRef, Injectable, QueryList } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RxjsLessonsService {

  constructor() { }

  generateDisplayLog(containersArray: QueryList<ElementRef>, content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = containersArray.toArray()[index];
    logContainer.nativeElement.appendChild(element);
  }

  updateDisplayLog(containersArray: QueryList<ElementRef>, content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = containersArray.toArray()[index];
    while(logContainer.nativeElement.firstChild) {
      logContainer.nativeElement.removeChild(logContainer.nativeElement.firstChild);
    }
    logContainer.nativeElement.appendChild(element);
  }
}
