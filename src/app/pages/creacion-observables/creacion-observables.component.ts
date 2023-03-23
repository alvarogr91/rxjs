import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription, from, of, range, interval, timer, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-creacion-observables',
  templateUrl: './creacion-observables.component.html',
  styleUrls: ['./creacion-observables.component.scss']
})

export class CreacionObservablesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('btnAction') btnAction!: ElementRef;

  subscriptions!: Array<Subscription>;

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
    next: evt => this.generateDisplayLog(evt, 1),
    error: err => console.error('ERROR: ', err),
    complete: () => this.generateDisplayLog('Done!', 1)
  }

  // 3.- La función from()
  myArrayFrom = [1, 2, 3, 4, 5];
  observableArrayFrom = from(this.myArrayFrom);
  myStringFrom = 'Hello World';
  observableStringFrom = from(this.myStringFrom);
  myPromiseFrom = new Promise(resolve => setTimeout(() => {
    resolve('Hello World');
  }, 2000));
  observablePromiseFrom = from(this.myPromiseFrom);

  // 4.- Las funciones of() y range()
  sourceOf = of(1, 2, 3, 4, 5, 6);
  sourceOf2 = of( // Agregamos distintas tipologías de datos
    [1, 2, 3],
    "Hello, World!",
    { foo: 'bar' },
    function hello() {
      return 'Hi!';
    }
  )
  sourceRange1 = range(3, 10); // Rango de números que empiece en 3 y tenga 10 valores

  // 5.- Las funciones interval() y time()
  sourceInterval = interval(500);
  sourceTimer = interval(500);
  sourceTimer2 = timer(4000, 100); // Tardará 4 segundos en iniciar y se repetirá cada 100 milisegundos

  // 6.- La función fromEvent()
  sourceFromEvent!: Observable<MouseEvent>; // Inicializado en AfterViewInit
  sourceFromEvent2!: Observable<MouseEvent>; // Inicializado en AfterViewInit

  constructor(@Inject(DOCUMENT) private readonly _document: Document) { }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    this.sourceFromEvent = fromEvent<MouseEvent>(this.btnAction.nativeElement, 'click');
    this.sourceFromEvent2 = fromEvent<MouseEvent>(this._document, 'mousemove');
    this.launchSubscriptions();
  }

  generateDisplayLog(content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = this.displayLogs.toArray()[index];
    logContainer.nativeElement.appendChild(element);
  }

  launchSubscriptions(): void {
    // 1.- Función create
    this.subscriptions.push(
      this.helloObservable.subscribe(evt => this.generateDisplayLog(evt, 0))
    );

    // 2.- Suscripciones y observadores
    const subscription2: Subscription = this.helloObservable2.subscribe(this.observer2)
    subscription2.unsubscribe();
    this.subscriptions.push(
      subscription2, 
      this.helloObservable2.subscribe(this.observer2)
    );

    // 3.- La función from()
    this.subscriptions.push(
      this.observableArrayFrom.subscribe(val => this.generateDisplayLog(val, 2)),
      this.observableStringFrom.subscribe(val => this.generateDisplayLog(val, 3)),
      this.observablePromiseFrom.subscribe(val => this.generateDisplayLog(val, 4))
    );

    // 4.- Las funciones of() y range()
    this.subscriptions.push(
      this.sourceOf.subscribe(data => this.generateDisplayLog(data, 5)),
      this.sourceOf2.subscribe(data => this.generateDisplayLog(data, 6)),
      this.sourceRange1.subscribe(data => this.generateDisplayLog(data, 7))
    );

    // 5.- Las funciones interval() y time()
    const subscriptionInterval: Subscription = this.sourceInterval.subscribe(data => this.generateDisplayLog(data, 8));
    setTimeout(() => subscriptionInterval.unsubscribe(), 3000);
    const subscriptionTimer: Subscription = this.sourceTimer.subscribe(data => this.generateDisplayLog(data, 9));
    timer(3000).subscribe(() => subscriptionTimer.unsubscribe());
    const subscriptionTimer2: Subscription = this.sourceTimer2.subscribe(data => this.generateDisplayLog(`2 - ${data}`, 10));
    timer(6000).subscribe(() => subscriptionTimer2.unsubscribe());

    // 6.- La función fromEvent()
    this.subscriptions.push(
      this.sourceFromEvent.subscribe((event: MouseEvent) => this.generateDisplayLog(`click event at pos (${event.x}, ${event.y})`, 11)),
      this.sourceFromEvent2.subscribe((event: MouseEvent) => console.log(event))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
