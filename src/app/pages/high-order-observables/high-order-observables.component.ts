import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription, concatMap, from, fromEvent, map, mergeAll, mergeMap, scan, switchMap, tap } from 'rxjs';
import { RxjsLessonsService } from '../../services/rxjs-lessons.service';

@Component({
  selector: 'app-high-order-observables',
  templateUrl: './high-order-observables.component.html',
  styleUrls: ['./high-order-observables.component.scss']
})
export class HighOrderObservablesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('button') button!: ElementRef<HTMLElement>;
  @ViewChild('button2') button2!: ElementRef<HTMLElement>;
  @ViewChild('button3') button3!: ElementRef<HTMLElement>;

  subscriptions!: Array<Subscription>;

  // 1.- Introducción a los HOO: mergeAll y mergeMap
  obsApi$!: Observable<string>;
  obsApi2$!: Subscription;

  // 2.- Operadores switchMap y concatMap

  constructor(
    private readonly _rxjsService: RxjsLessonsService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    // 1.- Introducción a los HOO: mergeAll y mergeMap
    this.obsApi$ = this._rxjsService.getComment(1).pipe(
      map(data => JSON.stringify(data))
    )

    this.launchSubscriptions();
  }

  launchSubscriptions(): void {
    this._rxjsService.displayLogs$.next(this.displayLogs);
    this.subscriptions.push(
      // 1.- Introducción a los HOO: mergeAll y mergeMap
      // fromEvent<MouseEvent>(this.button.nativeElement, 'click').pipe(
      //   map(evt => this.obsApi$),
      //   mergeAll(),
      //   tap(console.log)
      // ).subscribe(data => this._rxjsService.generateDisplayLog(this._rxjsService.displayLogs$.value, data, 0))
      fromEvent<MouseEvent>(this.button.nativeElement, 'click').pipe(
        mergeMap(evt => this.obsApi$),
        tap(console.log)
      ).subscribe(data => this._rxjsService.generateDisplayLog(this._rxjsService.displayLogs$.value, data, 0)),


      // 2.- Operadores switchMap y concatMap
      fromEvent<MouseEvent>(this.button2.nativeElement, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        switchMap(id => this._rxjsService.getComment(id)),
        map(data => JSON.stringify(data)),
        tap(console.log)
      ).subscribe(data => this._rxjsService.generateDisplayLog(this._rxjsService.displayLogs$.value, data, 1)),

      // 3.- High Order Observables: de array a evento
      fromEvent<MouseEvent>(this.button3.nativeElement, 'click').pipe(
        scan((acc, evt) => acc + 1, 0),            
        concatMap(page => this._rxjsService.getCommentsList(page)),
        mergeMap(comments => from(comments)), // Tomamos el array con from y emitimos los daos uno a uno en un observable
        map(data => JSON.stringify(data)),
        tap(console.log)
      ).subscribe(data => this._rxjsService.generateDisplayLog(this._rxjsService.displayLogs$.value, data, 2)),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
