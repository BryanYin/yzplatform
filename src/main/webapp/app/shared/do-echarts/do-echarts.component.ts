import { Component, Input, Output, EventEmitter, OnInit, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { DoEchartsService } from './do-echats.service';

import * as echarts from 'echarts';

@Component({
  selector: 'do-echarts',
  template: `
    <div echarts [options]="options" [dataset]="dataset" [theme]="theme" [loading]="loading"
    (chartInit)="onChartInit($event)" (chartClick)="onChartClick($event)" (chartDblClick)="onChartDblClick($event)"
    (chartMouseDown)="onChartMouseDown($event)" (chartMouseUp)="onChartMouseUp($event)"
    (chartMouseOver)="onChartMouseOver($event)" (chartMouseOut)="onChartMouseOut($event)"
    (chartGlobalOut)="onChartGlobalOut($event)" (chartContextMenu)="onChartContextMenu($event)"
    (chartDataZoom)="onChartDataZoom($event)" (chartBrushSelected)="onChartBrushSelected($event)"
    class="echart"></div>
  `,
})
export class DoEchartsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() options: any;
  @Input() dataset: any[];
  @Input() theme: any= 'echart-theme';
  @Input() loading: boolean;
  @Input() nameMap: string;

  // chart events:
  @Output() chartInit: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartContextMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartDataZoom: EventEmitter<any> = new EventEmitter<any>();
  @Output() chartBrushSelected: EventEmitter<any> = new EventEmitter<any>();

  private _echartInstance: any;

  private _isSetOptionInInit = false;

  constructor(private service: DoEchartsService) {
  }

  ngOnInit() {

    if (this.nameMap) {
      this.service.getMapJSON(this.nameMap).subscribe(
        data => {
          echarts.registerMap(this.nameMap, data);
          if (this._echartInstance && this.options) {
            this._echartInstance.clear();
            this._echartInstance.setOption(this.options);
            this._echartInstance.resize();
            this._isSetOptionInInit = true;
          }
        },
        error => console.log(error),
      );
    }
    if (this.theme) {
        console.log('theme in component', this.theme);
        echarts.registerTheme(this.theme, this.service.getTheme());
    }
  }

  ngAfterViewInit() {
    if (!this._isSetOptionInInit) {
      if (this._echartInstance && this.options) {
        this._echartInstance.clear();
        this._echartInstance.setOption(this.options);
        this._echartInstance.resize();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._echartInstance && this.options) {
      this._echartInstance.clear();
      this._echartInstance.setOption(this.options);
      this._echartInstance.resize();
    }
  }

  public onChartInit(e) {
    this._echartInstance = e;
    this.chartInit.emit(e);
  }
  public onChartClick(e) {
    this.chartClick.emit(e);
  }
  public onChartDblClick(e) {
    this.chartDblClick.emit(e);
  }
  public onChartMouseDown(e) {
    this.chartMouseDown.emit(e);
  }
  public onChartMouseUp(e) {
    this.chartMouseUp.emit(e);
  }
  public onChartMouseOver(e) {
    this.chartMouseOver.emit(e);
  }
  public onChartMouseOut(e) {
    this.chartMouseOut.emit(e);
  }
  public onChartGlobalOut(e) {
    this.chartGlobalOut.emit(e);
  }
  public onChartContextMenu(e) {
    this.chartContextMenu.emit(e);
  }
  public onChartDataZoom(e) {
    this.chartDataZoom.emit(e);
  }
  public onChartBrushSelected(e) {
    this.chartBrushSelected.emit(e);
  }

}
