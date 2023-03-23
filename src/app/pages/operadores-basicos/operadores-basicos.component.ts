import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-operadores-basicos',
  templateUrl: './operadores-basicos.component.html',
  styleUrls: ['./operadores-basicos.component.scss']
})
export class OperadoresBasicosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  subscriptions!: Array<Subscription>;

  // 1.- Operadores mapTo, map y filter

  ngOnInit(): void {
    this.subscriptions = [];
  }

  ngAfterViewInit(): void {
    this.launchSubscriptions();
  }

  generateDisplayLog(content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = this.displayLogs.toArray()[index];
    logContainer.nativeElement.appendChild(element);
  }

  launchSubscriptions(): void {
    // 1.- Operadores mapTo, map y filter
    this.subscriptions.push(

    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}

