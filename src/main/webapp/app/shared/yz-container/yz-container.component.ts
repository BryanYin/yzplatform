import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'yz-container',
    templateUrl: './yz-container.component.html',
    styleUrls: ['./yz-container.component.scss'],
})
export class YzContainerComponent implements OnInit {
    @Input() smallTitle: string;
    @Input() dataComing: string;
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
