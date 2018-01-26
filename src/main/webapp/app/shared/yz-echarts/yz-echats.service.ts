import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { NbThemeService } from '@nebular/theme';
import * as _ from 'lodash';

@Injectable()
export class YzEchartsService {

  private _assetsPath = 'assets/map/';

  constructor(private httpClient: HttpClient, private themeService: NbThemeService) { }

  public getMapJSON(mapName: string): Observable<Object> {
    return this.httpClient.get(this._assetsPath + mapName + '.json');
  }

  public getTheme(): Observable<any> {
    return this.themeService.getJsTheme().map((config) => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      return {
        color: ['#296FDD', '#65feca', '#e33f2e', '#6f4ce8', '#296FDD', '#65feca', '#e33f2e', '#6f4ce8'],
        backgroundColor: echarts.bg,
        'textStyle': {},
        'title': {
          'show': true,
          'left': 'center',
          'top': 5,
          'textStyle': {
            'color': '#ffffff',
          },
          'subtextStyle': {
            'color': '#ffffff',
          },
        },
        'line': {
          'itemStyle': {
            'normal': {
              'borderWidth': '2',
            },
          },
          'lineStyle': {
            'normal': {
              'width': '3',
            },
          },
          'symbolSize': '7',
          'symbol': 'circle',
          'smooth': false,
          'label': {
            'normal': {
              'show': true,
              'color': '#fff',
            },
          },
        },
        'radar': {
          'axisLine': {
            'lineStyle': {
              'opacity': 0.2,
            },
          },
          'splitLine': {
            'lineStyle': {
              'opacity': 0.2,
            },
          },
          'name': {
            'textStyle': {
              'color': '#fff',
              'fontSize': 16,
              'fontWeight': 'bold',
            },
          },
          'symbolSize': '7',
          'symbol': 'circle',
          'smooth': true,
          'splitArea': {
            'show': false,
            'areaStyle': {
              'color': ['rgba(250,250,250,0.1)', 'rgba(100,100,100,0.1)'],
            },
          },
        },
        'bar': {
          'itemStyle': {
            'normal': {
              'barBorderWidth': 0,
              'barBorderColor': '#ffffff',
            },
            'emphasis': {
              'barBorderWidth': 0,
              'barBorderColor': '#ffffff',
            },
          },
          'label': {
            'normal': {
              'show': true,
            },
          },
        },
        'pie': {
          'label': {
            'normal': {
              'show': true,
              'fontSize': 16,
              'fontWeight': 'bold',
              'color': '#fff',
            },
            'emphasis': {
              'show': true,
            },
          },
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'scatter': {
          'itemStyle': {
            'normal': {
              'color': '#E33F2E',
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'boxplot': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'parallel': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'sankey': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'funnel': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'gauge': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
            'emphasis': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
        },
        'candlestick': {
          'itemStyle': {
            'normal': {
              'color': '#e098c7',
              'color0': 'transparent',
              'borderColor': '#e098c7',
              'borderColor0': '#8fd3e8',
              'borderWidth': '2',
            },
          },
        },
        'graph': {
          'itemStyle': {
            'normal': {
              'borderWidth': 0,
              'borderColor': '#ffffff',
            },
          },
          'lineStyle': {
            'normal': {
              'width': 1,
              'color': '#aaa',
            },
          },
          'symbolSize': '7',
          'symbol': 'circle',
          'smooth': true,
          'color': [
            '#9b8bba',
            '#e098c7',
            '#8fd3e8',
            '#71669e',
            '#cc70af',
            '#7cb4cc',
          ],
          'label': {
            'normal': {
              'textStyle': {
                'color': '#ffffff',
              },
            },
          },
        },
        'map': {
          'itemStyle': {
            'normal': {
              'areaColor': '#f1faff',
              'borderColor': '#ccc',
              'borderWidth': 2,
            },
            'emphasis': {
              'areaColor': '#fd6a02',
              'borderColor': '#ccc',
              'borderWidth': 3,
            },
          },
          'label': {
            'normal': {
              'color': '#333',
            },
            'emphasis': {
              'color': '#333',
            },
          },
        },
        'geo': {
          'itemStyle': {
            'normal': {
              'areaColor': '#f1faff',
              'borderColor': '#ccc',
              'borderWidth': 2,
            },
            'emphasis': {
              'areaColor': '#fd6a02',
              'borderColor': '#ccc',
              'borderWidth': 3,
            },
          },
          'label': {
            'normal': {
              'color': '#333',
            },
            'emphasis': {
              'color': '#333',
            },
          },
        },
        'categoryAxis': {
          'axisLabel': {
            'rotate': 0,
            'showMinLabel': true,
            'showMaxLabel': true,
            'textStyle': {
              'color': '#fff',
              'fontSize': 16,
              'fontWeight': 'bold',
            },
          },
          'axisLine': {
            'lineStyle': {
              'color': '#fff',
            },
          },
          'splitLine': {
            'show': false,
          },
          'splitArea': {
            'show': false,
          },
        },
        'valueAxis': {
          'axisLabel': {
            'showMinLabel': true,
            'showMaxLabel': true,
            'textStyle': {
              'color': '#fff',
              'fontSize': 16,
              'fontWeight': 'bold',
            },
          },
          'axisLine': {
            'lineStyle': {
              'color': '#fff',
            },
          },
          'splitLine': {
            'show': false,
          },
          'splitArea': {
            'show': false,
          },
        },
        'logAxis': {
          'axisLabel': {
            'showMinLabel': true,
            'showMaxLabel': true,
            'textStyle': {
              'color': '#fff',
              'fontSize': 16,
              'fontWeight': 'bold',
            },
          },
          'axisLine': {
            'lineStyle': {
              'color': '#fff',
            },
          },
          'splitLine': {
            'show': false,
          },
          'splitArea': {
            'show': false,
          },
        },
        'timeAxis': {
          'axisLabel': {
            'showMinLabel': true,
            'showMaxLabel': true,
            'textStyle': {
              'color': '#fff',
              'fontSize': 16,
              'fontWeight': 'bold',
            },
          },
          'axisLine': {
            'lineStyle': {
              'color': '#fff',
            },
          },
          'splitLine': {
            'show': false,
          },
          'splitArea': {
            'show': false,
          },
        },
        'toolbox': {
          'iconStyle': {
            'normal': {
              'borderColor': '#999',
            },
            'emphasis': {
              'borderColor': '#666',
            },
          },
        },
        'legend': {
          'textStyle': {
            'color': '#fff',
            'fontSize': 16,
            'fontWeight': 'bold',
          },
          'left': 'center',
          'top': 'bottom',
        },
        'tooltip': {
          'axisPointer': {
            'lineStyle': {
              'color': '#ffffff',
              'width': 1,
            },
            'crossStyle': {
              'color': '#ffffff',
              'width': 1,
            },
          },
        },
        'timeline': {
          'axisType': 'category',
          'autoPlay': false,
          'playInterval': 1500,
          'left': '18%',
          'right': '18%',
          'bottom': '10',
          'lineStyle': {
            'color': '#8fd3e8',
            'width': 1,
          },
          'itemStyle': {
            'normal': {
              'color': '#8fd3e8',
              'borderWidth': 1,
            },
            'emphasis': {
              'color': '#8fd3e8',
            },
          },
          'controlStyle': {
            'normal': {
              'color': '#8fd3e8',
              'borderColor': '#8fd3e8',
              'borderWidth': 0.5,
            },
            'emphasis': {
              'color': '#8fd3e8',
              'borderColor': '#8fd3e8',
              'borderWidth': 0.5,
            },
          },
          'checkpointStyle': {
            'color': '#8fd3e8',
            'borderColor': 'rgba(138,124,168,0.37)',
          },
          'label': {
            'normal': {
              'textStyle': {
                'color': '#8fd3e8',
                'fontSize': 16,
                'fontWeight': 'bold',
              },
            },
            'emphasis': {
              'textStyle': {
                'color': '#8fd3e8',
                'fontSize': 16,
                'fontWeight': 'bold',
              },
            },
          },
          'tooltip': {
            'show': false,
          },
        },
        'visualMap': {
          'inRange': {
            'color': [
              '#f1faff',
              '#017df6',
            ],
          },
        },
        'dataZoom': {
          'backgroundColor': 'rgba(0,0,0,0)',
          'dataBackgroundColor': 'rgba(255,255,255,0.3)',
          'fillerColor': 'rgba(167,183,204,0.4)',
          'handleColor': '#a7b7cc',
          'handleSize': '100%',
          'textStyle': {
            'color': '#333',
          },
        },
        'markPoint': {
          'label': {
            'normal': {
              'textStyle': {
                'color': '#ffffff',
              },
            },
            'emphasis': {
              'textStyle': {
                'color': '#ffffff',
              },
            },
          },
        },
      };
    });
  }

  public getLineChartOptionTemplate(data: Map<string, any[]>): any {
    return {
      title: {
        left: 'center',
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        orient: 'horizontal',
        top: 'bottom',
        left: 'center',
        data: ['贵州省预测', '全国预测', '全国工业增加值增速', '贵州省工业增加值增速'],
      },
      grid: {
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [1, 2, 3, 4, 5],
        axisLabel: {
          interval: '0',
          rotate: 45,
        },
      },
      yAxis: [{
        type: 'value',
        name: '单位（%）',
      },
      ],
      series: [
        {
          name: '贵州省预测',
          type: 'line',
          data: [1, 2, 3, 4, 5],
        },
        {
          name: '全国预测',
          type: 'line',
          data: [1, 2, 3, 4, 5],
        },
        {
          name: '全国工业增加值增速',
          type: 'line',
          data: [2, 6, 7, 8, 9],
        },
        {
          name: '贵州省工业增加值增速',
          type: 'line',
          data: [5, 6, 7, 8, 9],
        },
      ],
    };
  }

  public getBarChartOptionTemplate(data: Map<string, any[]>): any {

    if (!data.get('x0') || !data.get('y0')) {
      return null;
    }

    return {
      // backgroundColor: echarts.bg,
      // color: [colors.primaryLight],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: data.get('x0'),
          // axisTick: {
          //   alignWithLabel: true,
          // },
          // axisLine: {
          //   lineStyle: {
          //     color: echarts.axisLineColor,
          //   },
          // },
          // axisLabel: {
          //   textStyle: {
          //     color: echarts.textColor,
          //   },
          // },
        },
      ],
      yAxis: [
        {
          type: 'value',
          // axisLine: {
          //   lineStyle: {
          //     color: echarts.axisLineColor,
          //   },
          // },
          // splitLine: {
          //   lineStyle: {
          //     color: echarts.splitLineColor,
          //   },
          // },
          // axisLabel: {
          //   textStyle: {
          //     color: echarts.textColor,
          //   },
          // },
        },
      ],
      series: [
        {
          name: '指标值',
          type: 'bar',
          barWidth: '60%',
          data: data.get('y0'),
        },
      ],
    };
  }

  public getPieChartOptionTemplate(data: Map<string, any[]>): any {
    if (!data.get('x0') || !data.get('y0')) {
      return null;
    }

    const pieData = _.zipWith(data.get('x0'), data.get('y0'), (a, b) => ({ name: a, value: b }));

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: data.get('x0')
      },
      series: [
        {
          name: '指标值',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          data: pieData
        }
      ]
    };
  }
}
