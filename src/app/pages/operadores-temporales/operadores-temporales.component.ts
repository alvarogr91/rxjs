import { Component, OnInit, AfterViewInit, ViewChildren, ViewChild, QueryList, ElementRef, OnDestroy, Inject } from '@angular/core';
import { Observable, Subscription, bufferTime, debounceTime, delay, fromEvent, map, sampleTime, tap } from 'rxjs';
import { RxjsLessonsService } from '../../services/rxjs-lessons.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-operadores-temporales',
  templateUrl: './operadores-temporales.component.html',
  styleUrls: ['./operadores-temporales.component.scss']
})
export class OperadoresTemporalesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('grid') gridElement!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('inputBox') inputBox!: ElementRef;

  subscriptions!: Array<Subscription>;

  // 1.- Operadores sampleTime, throttleTime y auditTime
  // 2.- Operadores delay y bufferTime
  scroll$!: Observable<any>;
  scrollProgress$!: Observable<any>;
  docElement: any;
  progressBarWidth: number = 0;

  // 3.- Operador debounceTime
  inputSrc$!: Observable<any>;

  constructor(
    private readonly _rxjsService: RxjsLessonsService,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.docElement = this.document.documentElement;
  }

  ngAfterViewInit(): void {
    // 1.- Operadores sampleTime, throttleTime y auditTime
    // 2.- Operadores delay y bufferTime
    this.scroll$ = fromEvent<Event>(this.document, 'scroll').pipe(
      tap(evt => console.log("Scroll event")),
      sampleTime(50), // Milisegundos
      map(() => this.docElement.scrollTop),
      tap(evt => console.log("[scroll]: ", evt)),
    );
    this.scrollProgress$ = this.scroll$.pipe(
      map(evt => {
        const docHeight = this.docElement.scrollHeight - this.docElement.clientHeight;
        return (evt / docHeight) * 100;
      }),
      delay(500),
      bufferTime(50, 1000), // El primer parámetro es la parte del intervalo que queremos registrar; el segundo es el tamaño del intervalo.
      tap(evt => console.log('[Buffer]: ', evt))
    )

    // 3.- Operador debounceTime
    this.inputSrc$ = fromEvent<Event>(this.inputBox.nativeElement, 'input').pipe(
      debounceTime(300),
      map((evt: any) => evt.target.value)
    )

    this.launchSubscriptions();
  }

  updateProgressBar = (percentage: number) => {
    this.progressBarWidth = percentage;
  }

  launchSubscriptions(): void {
    this.subscriptions.push(
      this.scrollProgress$.subscribe((evt: number) => { this.updateProgressBar(evt) }),
      this.inputSrc$.subscribe((event: any) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 0)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
