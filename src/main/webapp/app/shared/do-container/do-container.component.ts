import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'do-container',
    templateUrl: './do-container.component.html',
    styleUrls: ['./do-container.component.scss'],
})
export class DoContainerComponent implements OnInit {
    @Input() smallTitle: string = '全国工业增长趋势';
    @Input() dataComing: string = '贵州经信委';
    @Input() optionType: any;
    @Input() showEcharts = true;
    @Input() showTitle = true;
    @Input() showChangeNorm_type = false;
    @Input() nameMap: string;
    @Input() theme = 'echart-theme';
    @Input() tabItems: Array<string>;

    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
    @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
    isClick: Array<boolean>;
    isShow = false;

    constructor() {
    }

    ngOnInit() {

        if (this.tabItems) {
            this.isClick = new Array<boolean>(this.tabItems.length);
            this.isClick.fill(false);
            this.isClick[0] = true;
        }

        // this.optionType =  {
        //     tooltip: {
        //           trigger: 'item',
        //           formatter: '{b}: {c}',
        //       },
        //     visualMap: {
        //         min: 0,
        //         max: 100,
        //         left: 'left',
        //         top: 'bottom',
        //         text: ['高', '低'], // 文本，默认为数值文本
        //         calculable: true,
        //         color: [
        //             '#fff', '#22C7FF',
        //             ],
        //         textStyle: {
        //           color: '#fff',
        //         },
        //     },
        //     geo: {
        //       //    map: 'china',
        //         roam: false,
        //         top: '3%',
        //         layoutCenter: ['50%', '50%'],
        //         label: {
        //             emphasis: {
        //                 show: false,
        //             },
        //         },
        //         itemStyle: {
        //             normal: {
        //                 // areaColor: 'transparent',
        //                 // borderColor: '#818181',
        //                 borderWidth: 1.5,
        //             },
        //             emphasis: {
        //                 // areaColor: 'transparent',
        //                 // borderColor: '#818181',
        //                 borderWidth: 1.5,
        //             },
        //         },
        //     },
        //     series:
        //         {
        //             type: 'map',
        //             mapType: this.nameMap,
        //             roam: false,
        //             label: {
        //                 normal: {
        //                     show: true,
        //                 },
        //                 emphasis: {
        //                     textStyle: {
        //                         // color: '#fff'，
        //                     },
        //                 },
        //             },
        //             itemStyle: {

        //                 normal: {
        //                     // borderColor: '#389BB7',
        //                     areaColor: '#fff',
        //                 },
        //                 emphasis: {
        //                     // areaColor: '#389BB7',
        //                     borderWidth: 0,
        //                 },
        //             },
        //             animation: false,
        //             data: [
        //                 { name: '韶关市', value: 100 },
        //                 { name: '清远市', value: 90 },
        //                 { name: '河源市', value: 80 },
        //                 { name: '梅州市', value: 70 },
        //                 { name: '汕头市', value: 95 },
        //                 { name: '广州市', value: 100 },
        //                 { name: '深圳市', value: 100 },
        //                 { name: '珠海市', value: 100 },
        //                 { name: '佛山市', value: 90 },
        //                 { name: '江门市', value: 100 },
        //                 { name: '湛江市', value: 80 },
        //                 { name: '茂名市', value: 80 },
        //                 { name: '肇庆市', value: 60 },
        //                 { name: '惠州市', value: 100 },
        //                 { name: '梅州市', value: 50 },
        //                 { name: '汕尾市', value: 40 },
        //                 { name: '阳江市', value: 70 },
        //                 { name: '东莞市', value: 50 },
        //                 { name: '中山市', value: 80 },
        //                 { name: '潮州市', value: 70 },
        //                 { name: '揭阳市', value: 40 },
        //                 { name: '云浮市', value: 50 },
        //             ],
        //         },
        // };
    }

    onClicked(e) {
        this.clicked.emit(e);
    }

    onBtnClick(i) {
        this.isClick.fill(false);
        this.isClick[i] = true;
        this.btnClicked.emit(i);
    }
    onButtonShow() {
        this.isShow = !this.isShow;
    }
}
