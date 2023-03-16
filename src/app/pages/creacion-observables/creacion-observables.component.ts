import { Component, AfterViewInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { displayLog, displayLog2 } from '../../utils/utils';

@Component({
  selector: 'app-creacion-observables',
  templateUrl: './creacion-observables.component.html',
  styleUrls: ['./creacion-observables.component.scss']
})
export class CreacionObservablesComponent implements AfterViewInit {
  // 1.- Función create
  helloObservable: Observable<any> = new Observable((observer) => {
    observer.next('Hello');
    setTimeout(() => {
      observer.next('World');
    }, 2000);
  });

  // 2.- Suscripciones y observadores
  helloObservable2: Observable<any> = new Observable((observer) => {
    observer.next('Hello');
    setTimeout(() => {
      observer.next('World');
      observer.complete();
    }, 2000);
  });
  observer2: Observer<any> = {
    next: evt => displayLog2(evt),
    error: err => console.error('ERROR: ', err),
    complete: () => displayLog2('Done!')
  }

  ngAfterViewInit(): void {
    this.launchSubscriptions();
  }

  launchSubscriptions(): void {
    // 1.- Función create
    const subscription: Subscription = this.helloObservable.subscribe(evt => displayLog(evt));

    // 2.- Suscripciones y observadores
    const subscription2: Subscription = this.helloObservable2.subscribe(this.observer2);
    subscription2.unsubscribe();
    const subscription3: Subscription = this.helloObservable2.subscribe(this.observer2);
  }
}
