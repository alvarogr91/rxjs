import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription, combineLatest, concat, debounceTime, distinctUntilChanged, endWith, filter, forkJoin, fromEvent, map, mapTo, merge, scan, tap, timer, withLatestFrom, zip } from 'rxjs';
import { RxjsLessonsService } from 'src/app/services/rxjs-lessons.service';

interface ICoords {
  x: number;
  y: number;
}

interface IMouseEventObj {
  label: string;
  coords: ICoords
}

@Component({
  selector: 'app-combinacion-observables',
  templateUrl: './combinacion-observables.component.html',
  styleUrls: ['./combinacion-observables.component.scss']
})

export class CombinacionObservablesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('button') button!: ElementRef<HTMLElement>;
  @ViewChild('formButton') formButton!: ElementRef<HTMLElement>;
  @ViewChild('name') name!: ElementRef<HTMLElement>;
  @ViewChild('email') email!: ElementRef<HTMLElement>;
  @ViewChild('phone') phone!: ElementRef<HTMLElement>;

  subscriptions!: Array<Subscription>;
  context!: CanvasRenderingContext2D | null;

  // 1.- Funciones zip y merge
  mouseStart$!: Observable<IMouseEventObj>;
  mouseEnd$!: Observable<IMouseEventObj>;
  mouseMove$!: Observable<IMouseEventObj>;
  drawLine$!: Observable<any>;

  // 3.- Los operadores combineLatest y withLatestFrom
  formData$!: Observable<Event[]>;
  formName$!: Observable<Event>;
  formEmail$!: Observable<Event>;
  formNumber$!: Observable<Event>;
  submitButton$!: Observable<Event>;

  constructor(
    private readonly _rxjsService: RxjsLessonsService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');

    // 1.- Funciones zip y merge
    this.mouseStart$ = fromEvent<MouseEvent>(this.canvas.nativeElement, 'mousedown').pipe(
      map((event: MouseEvent) => {
        return {
          label: 'start',
          coords: this.getLocalClickCoords(event, this.canvas.nativeElement)
        }
      })
    );
    this.mouseEnd$ = fromEvent<MouseEvent>(this.canvas.nativeElement, 'mouseup').pipe(
      map((event: MouseEvent) => {
        return {
          label: 'end',
          coords: this.getLocalClickCoords(event, this.canvas.nativeElement)
        }
      })
    );
    this.mouseMove$ = fromEvent<MouseEvent>(this.canvas.nativeElement, 'mousemove').pipe(
      map((event: MouseEvent) => {
        return {
          label: 'drawing',
          coords: this.getLocalClickCoords(event, this.canvas.nativeElement)
        }
      })
    );
    // this.drawLine$ = zip(this.mouseStart$, this.mouseEnd$).pipe(
    //   tap(console.log),
    //   map(([start, end]) => {
    //     return {
    //       origin: start.coords,
    //       end: end.coords
    //     }
    //   })
    // )
    this.drawLine$ = merge(this.mouseStart$, this.mouseMove$, this.mouseEnd$).pipe(
      scan(this.computeDrawState, { label: 'init' }),
      filter(data => data.origin && data.coords),
      distinctUntilChanged(),
      tap(console.log),
    )

    // 3.- Los operadores combineLatest y withLatestFrom
    this.formName$ = fromEvent<InputEvent>(this.name.nativeElement, 'input').pipe(
      debounceTime(400),
      map((evt: any) => evt.target.value)
    );
    this.formEmail$ = fromEvent<InputEvent>(this.email.nativeElement, 'input').pipe(
      debounceTime(400),
      map((evt: any) => evt.target.value)
    );
    this.formNumber$ = fromEvent<InputEvent>(this.phone.nativeElement, 'input').pipe(
      debounceTime(400),
      map((evt: any) => evt.target.value)
    );
    this.submitButton$ = fromEvent<MouseEvent>(this.formButton.nativeElement, 'click');
    // this.formData$ = combineLatest(this.formName$, this.formEmail$, this.formNumber$)
    this.formData$ = this.submitButton$.pipe(
      withLatestFrom(this.formName$, this.formEmail$, this.formNumber$),
      map(data => {
        const [click, ...formData] = data;
        return formData;
      })
    );

    this.launchSubscriptions();
  }

  drawLine(initCoords: ICoords, endCoords: ICoords): void {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.context.beginPath();
      this.context.moveTo(initCoords.x, initCoords.y);
      this.context.lineTo(endCoords.x, endCoords.y);
      this.context.strokeStyle = 'black';
      this.context.lineWidth = 2;
      this.context.stroke();
      this.context.closePath();
    }
  }

  getLocalClickCoords(event: MouseEvent, parent: HTMLElement): ICoords {
    return {
      x: event.clientX - parent.offsetLeft,
      y: event.clientY - parent.offsetTop,
    }
  }

  computeDrawState(prevState: any, event: any) {
    switch (prevState.label) {
      case 'init':
      case 'end':
        if (event.label === 'start') {
          return {
            origin: event.coords,
            ...event
          }
        };
        break;
      case 'start':
      case 'drawing':
        return {
          origin: prevState.origin,
          ...event
        }
    };
    return prevState
  }

  launchSubscriptions(): void {
    this.subscriptions.push(
      // 1.- Funciones zip y merge
      // this.drawLine$.subscribe(data => this.drawLine(data.origin, data.end))
      this.drawLine$.subscribe(data => this.drawLine(data.origin, data.coords)),

      // 2.- Operadores concat y forkJoin
      fromEvent<MouseEvent>(this.button.nativeElement, 'click').subscribe(this._rxjsService.getComments.bind(this)),

      // 3.- Los operadores combineLatest y withLatestFrom
      this.formData$.subscribe(data => this._rxjsService.generateDisplayLog(this.displayLogs, data, 1))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
