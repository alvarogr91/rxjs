import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, fromEvent, Observable, map, tap, filter, first, take, takeWhile, last, takeLast, skip, reduce, scan } from 'rxjs';
import { RxjsLessonsService } from 'src/app/services/rxjs-lessons.service';

@Component({
  selector: 'app-operadores-basicos',
  templateUrl: './operadores-basicos.component.html',
  styleUrls: ['./operadores-basicos.component.scss']
})

export class OperadoresBasicosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  @ViewChild('grid') gridElement!: ElementRef;
  subscriptions!: Array<Subscription>;

  // 1.- Operadores mapTo, map y filter
  click$!: Observable<Array<number>>;

  // 2.- Operador tap
  click2$!: Observable<Array<number>>;

  // 3.- Operadores first, take y takeWhile
  click3$!: Observable<Array<number>>;
  click4$!: Observable<Array<number>>;
  click5$!: Observable<Array<number>>;

  // 4.- Operadores last, takeLast y skip
  click6$!: Observable<Array<number>>;
  click7$!: Observable<Array<number>>;
  click8$!: Observable<Array<number>>;

  // 5.- Operadores reduce y scan
  click9$!: any;
  click10$!: any;

  constructor(private readonly _rxjsService: RxjsLessonsService) { }

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    // 1.- Operadores mapTo, map y filter
    this.click$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      // mapTo está deprecado, por lo que solo trabajaré con map
      map(event => [
        // Mostramos el index de columna y el de fila
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      filter(val => (val[0] + val[1]) % 2 !== 0) // Buscamos las casillas impares (grises)
    );

    // 2.- Operador tap
    this.click2$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      tap(
        event => console.log('Antes del map: ', event)
      ),
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      tap(
        event => console.log('Después del map: ', event)
      ),
    );

    // 3.- Operadores first, take y takeWhile
    this.click3$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      first(val => val[0] > 3) // Emitir solamente cuando se pulse una columna a partir de la cuarta y solo una vez
    );

    this.click4$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      take(4) // Emitir los 4 primeros eventos.
    );

    this.click5$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col > 3) // Emitir eventos siempre que la columna sea mayor que 3
    );

    // 4.- Operadores last, takeLast y skip
    this.click6$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col > 3),
      tap(val => console.log(`valid in takeWhile: [${val}]`)),
      last() // Emitiremos el último evento que cumpla la condición del takeWhile. OJO: no se pinta el último click, 
      // sino el último que cumple la condición
    );

    this.click7$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col > 3),
      tap(val => console.log(`valid in takeWhile: [${val}]`)),
      takeLast(3) // Emitimos los últimos 3 eventos cuando se haya cerrado el stream
    );

    this.click8$ = fromEvent<PointerEvent>(this.gridElement.nativeElement, 'click').pipe(
      map(event => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      tap(val => console.log(`cell: [${val}]`)),
      skip(5) // Nos saltamos los 5 primeros eventos
    );

    // 5.- Operadores reduce y scan
    this.click9$ = fromEvent<any>(this.gridElement.nativeElement, 'click').pipe(
      map((event: any) => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      tap((val: any) => console.log(`cell: [${val}]`)),
      reduce((accumulated: any, current: any) => { 
        return {
          clicks: accumulated.clicks + 1,
          cells: [...accumulated.cells, current]
        }
      }, { clicks: 0, cells: [] }) // Este parámetro (seed) permite inicializar el valor del objeto acumulado
    );
    this.click10$ = fromEvent<any>(this.gridElement.nativeElement, 'click').pipe(
      map((event: any) => [
        Math.floor(event.offsetX / 50), Math.floor(event.offsetY / 50)
      ]),
      takeWhile(([col, row]) => col != 0),
      tap((val: any) => console.log(`cell: [${val}]`)),
      scan((accumulated: any, current: any) => { 
        return {
          clicks: accumulated.clicks + 1,
          cells: [...accumulated.cells, current]
        }
      }, { clicks: 0, cells: [] }) // Este parámetro (seed) permite inicializar el valor del objeto acumulado
    );

    this.launchSubscriptions();
  }

  launchSubscriptions(): void {
    // 1.- Operadores mapTo, map y filter
    this.subscriptions.push(
      this.click$.subscribe((event: Array<number>) => console.log(event)),
      this.click$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 0))
    );

    // 2.- Operador tap
    this.subscriptions.push(
      this.click2$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 1))
    );

    // 3.- Operadores first, take y takeWhile
    this.subscriptions.push(
      this.click3$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 2)),
      this.click4$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 3)),
      this.click5$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 4)),
    );

    // 4.- Operadores last, takeLast y skip
    this.subscriptions.push(
      this.click6$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 5)),
      this.click7$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 6)),
      this.click8$.subscribe((event: Array<number>) => this._rxjsService.generateDisplayLog(this.displayLogs, event, 7)),
    );

    // 5.- Operadores reduce y scan
    this.subscriptions.push(
      this.click9$.subscribe((data: any) => this._rxjsService.generateDisplayLog(this.displayLogs, `${data.clicks} clicks: ${JSON.stringify(data.cells)}`, 8)),
      this.click10$.subscribe((data: any) => this._rxjsService.generateDisplayLog(this.displayLogs, `${data.clicks} clicks: ${JSON.stringify(data.cells)}`, 9))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}

