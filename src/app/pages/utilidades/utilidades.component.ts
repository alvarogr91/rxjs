import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Inject, OnDestroy } from '@angular/core';
import { distinct, distinctUntilChanged, endWith, fromEvent, map, Observable, pairwise, share, startWith, Subscription, takeWhile, tap, Subject, BehaviorSubject } from 'rxjs';
import { RxjsLessonsService } from 'src/app/services/rxjs-lessons.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-utilidades',
  templateUrl: './utilidades.component.html',
  styleUrls: ['./utilidades.component.scss']
})
export class UtilidadesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('grid') gridElement!: ElementRef;
  @ViewChild('progressBar') progressBar!: ElementRef;

  subscriptions!: Array<Subscription>;

  // 1.- Operadores startWith y endWith
  click$!: Observable<string | Array<number>>;

  // 2.- Operadores distinct y distinctUntilChanged
  click2$!: Observable<string | number>;
  click3$!: Observable<string | number[]>;
  click4$!: Observable<string | number[]>;

  // 3.- Operador pairwise
  // 4.- Operador share
  scroll$!: Observable<any>;
  scrollProgress$!: Observable<number>;
  docElement: any;
  progressBarWidth: number = 0;

  // 5.- Subject, BehaviorSubject y los Hot Observables
  scrollProgressHot$!: Subject<any>;
  scrollProgressHot2$!: BehaviorSubject<any>;

  constructor(
    private readonly _rxjsService: RxjsLessonsService,
    @Inject(DOCUMENT) private readonly document: Document
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.docElement = this.document.documentElement;
  }

  ngAfterViewInit(): void {
    // 1.- Operadores startWith y endWith
    this.click$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      tap(val => console.log(`cell: [${val}]`)),
      startWith('Grid dimensions: ', '10x10'),
      endWith('Game finished!', 'Bye!')
    );

    // 2.- Operadores distinct y distinctUntilChanged
    this.click2$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      map(([col, row]) => col + row),
      tap(val => console.log('sum of col + row = ', val)),
      distinct()
    );
    this.click3$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      tap(val => console.log(`cell: [${val}]`)),
      // distinc por sí solo sirve para comparar tipos simples, como números. Si tratamos de que compare objetos, aunque tengan
      // el mismo valor no son el mismo objeto y, por tanto, no funcionará como esperamos. Para estos casos debemos especificarle
      // qué valor concreto es el que tiene que comparar.
      distinct(([col, row]) => `${col} - ${row}`)
    );
    this.click4$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      tap(val => console.log(`cell: [${val}]`)),
      // Igual que pasa con distinct, si queremos comparar tipos simples como string o number podemos usarlo sin pasarle parámetros.
      // Para el caso de los objetos es un poco diferente a como funciona distinct. En el siguiente ejemplo vamos a bloquear clicks
      // consecutivos sobre la misma casilla. Para esto comparamos los clicks sobre la celda anterior y la actual de la siguiente
      // manera:
      distinctUntilChanged((cell1, cell2) => (cell1[0] == cell2[0] && cell1[1] == cell2[1]))
    );

    // 3.- Operador pairwise
    // 4.- Operador share
    this.scroll$ = fromEvent<Event>(this.document, 'scroll').pipe(
      map(() => this.docElement.scrollTop),
      tap(evt => console.log("[scroll]: ", evt)),
      pairwise(),
      tap(([previous, current]) => {
        this._rxjsService.updateDisplayLog(this.displayLogs, (current > previous ? 'DESC' : 'ASC'), 4);
      }),
      map(([previous, current]) => current)
    );
    this.scrollProgress$ = this.scroll$.pipe(
      map(evt => {
        const docHeight = this.docElement.scrollHeight - this.docElement.clientHeight;
        return (evt / docHeight) * 100;
      }),
      //share() // Aquí share hace que, aunque nos hemos suscrito dos veces al observable scrollProgress, solo se ejecuta
              // una vez la lógica, por lo que solo se logea una vez en consola el valor de [scroll].
              // Queda comentado para trabajar con Subject.
    )

    // 5.- Subject, BehaviorSubject y los Hot Observables
    this.scrollProgressHot$ = new Subject();
    this.scrollProgressHot2$ = new BehaviorSubject(0); // El 0 es el estado inicial y se actualiza cada vez que el BehaviorSubject emite un evento

    this.launchSubscriptions();
  }

  launchSubscriptions(): void {
    this.subscriptions.push(
      // 1.- Operadores startWith y endWith
      this.click$.subscribe((event: string | Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 0)),

      // 2.- Operadores distinct y distinctUntilChanged
      this.click2$.subscribe((event: string | number) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 1)),
      this.click3$.subscribe((event: string | number[]) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 2)),
      this.click4$.subscribe((event: string | number[]) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 3)),

      // 3.- Operador pairwise
      // 4.- Operador share
      // this.scrollProgress$.subscribe((evt: number) => { this.updateProgressBar(evt) }),
      // this.scrollProgress$.subscribe((evt: number) => { this.updateProgressBar(evt) }),
      // Comentado para trabajar con Subject. Descomentar y comentar las suscripciones a scrollProgressHot

      // 5.- Subject, BehaviorSubject y los Hot Observables
      this.scrollProgress$.subscribe(this.scrollProgressHot$),
      this.scrollProgressHot$.subscribe((evt: number) => this._rxjsService.updateDisplayLog(this.displayLogs, `${Math.floor(evt)}%`, 5)),
      this.scrollProgressHot$.subscribe((evt: number) => { this.updateProgressBar(evt); console.log(this.scrollProgressHot2$) }),
      this.scrollProgressHot2$.subscribe((evt: number) => { this._rxjsService.updateDisplayLog(this.displayLogs, `${Math.floor(evt)}%`, 6); console.log(this.scrollProgressHot2$.value)})
    );
  }

  updateProgressBar = (percentage: number) => {
    this.progressBarWidth = percentage;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
