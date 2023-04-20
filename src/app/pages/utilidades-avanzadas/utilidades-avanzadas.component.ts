import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EMPTY, NEVER, Observable, Subscription, catchError, dematerialize, fromEvent, interval, map, mapTo, materialize, merge, never, retry, scan, startWith, switchMap, takeWhile, tap } from 'rxjs';
import { RxjsLessonsService } from 'src/app/services/rxjs-lessons.service';

@Component({
  selector: 'app-utilidades-avanzadas',
  templateUrl: './utilidades-avanzadas.component.html',
  styleUrls: ['./utilidades-avanzadas.component.scss']
})
export class UtilidadesAvanzadasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('button') button!: ElementRef<HTMLElement>;
  @ViewChild('pauseButton') pauseButton!: ElementRef<HTMLElement>;
  @ViewChild('pauseButton2') pauseButton2!: ElementRef<HTMLElement>;
  @ViewChild('resumeButton') resumeButton!: ElementRef<HTMLElement>;
  @ViewChild('resumeButton2') resumeButton2!: ElementRef<HTMLElement>;

  subscriptions!: Array<Subscription>;

  // 2.- Constantes never y empty
  countdownSeconds: number = 10;
  countdown$!: Observable<number>;
  pause$!: Observable<MouseEvent>;
  resume$!: Observable<MouseEvent>;
  interval$!: Observable<number>;
  isPaused$!: Observable<boolean>;

  // 3.- materialize y dematerialize
  countdown2$!: Observable<number>;
  pause2$!: Observable<MouseEvent>;
  resume2$!: Observable<MouseEvent>;
  interval2$!: Observable<number>;
  isPaused2$!: Observable<boolean>;

  constructor(
    private readonly _rxjsService: RxjsLessonsService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    // 2.- Constantes never y empty
    this.pause$ = fromEvent<MouseEvent>(this.pauseButton.nativeElement, 'click');
    this.resume$ = fromEvent<MouseEvent>(this.resumeButton.nativeElement, 'click');
    this.isPaused$ = merge(this.pause$.pipe(mapTo(true)), this.resume$.pipe(mapTo(false)));

    this.interval$ = interval(1000).pipe(mapTo(-1));

    this.countdown$ = this.isPaused$.pipe(
      startWith(false),
      // switchMap(paused => !paused ? this.interval$ : NEVER),
      switchMap(paused => !paused ? this.interval$ : EMPTY),
      scan((acc, curr) => (curr ? curr + acc : curr), this.countdownSeconds),
      takeWhile(v => v >= 0)
    )

    // 3.- materialize y dematerialize
    this.pause2$ = fromEvent<MouseEvent>(this.pauseButton2.nativeElement, 'click');
    this.resume2$ = fromEvent<MouseEvent>(this.resumeButton2.nativeElement, 'click');
    this.isPaused2$ = merge(this.pause2$.pipe(mapTo(true)), this.resume2$.pipe(mapTo(false)));

    this.interval2$ = interval(1000).pipe(mapTo(-1));

    this.countdown2$ = this.isPaused2$.pipe(
      startWith(false),
      switchMap(paused => !paused ? this.interval$.pipe(materialize()) : EMPTY.pipe(materialize())),
      dematerialize(),
      scan((acc, curr) => (curr ? curr + acc : curr), this.countdownSeconds),
      takeWhile(v => v >= 0)
    )

    this.launchSubscriptions();
  }

  launchSubscriptions(): void {
    this._rxjsService.displayLogs$.next(this.displayLogs);
    this.subscriptions.push(
      // 1.- Operadores throwError, catchError y retry
      fromEvent<MouseEvent>(this.button.nativeElement, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        switchMap(id => this._rxjsService.getCommentError(id).pipe(
          // catchError((err, scr$) => {  
          //   console.log('Catch', err);
          //   return scr$;
          // })
          retry(3) // Para evitar un bucle infinito, indicamos que haga 3 intentos tras los cuales la suscripción se cancela.
        )),
        map(data => JSON.stringify(data)),
        tap(console.log)
      ).subscribe(
        data => this._rxjsService.generateDisplayLog(this._rxjsService.displayLogs$.value, data, 0),
        err => console.log('Error: ', err.message)
      ),

      // 2.- Constantes never y empty
      this.countdown$.subscribe(data => this._rxjsService.updateDisplayLog(this._rxjsService.displayLogs$.value, data, 1)),
      this.countdown2$.subscribe(data => this._rxjsService.updateDisplayLog(this._rxjsService.displayLogs$.value, data, 2), null, () => console.log('complete'))

    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}

