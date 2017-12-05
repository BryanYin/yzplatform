import { RouteCacheService } from './../do-service/route-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoFrameService } from '../do-service/do-frame.service';
import { NgZone } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'do-frame',
  templateUrl: 'do-frame.component.html',
  styleUrls: ['do-frame.component.scss'],
})
export class DoFrameComponent implements OnInit {

  @Input() leftTitle: string;
  @Input() menubarNone = true;
  @Input() menubarNoneTwo = true;
  headerController: Array<boolean> = new Array<boolean>(2);
  footController: Array<boolean> = new Array<boolean>(3);
  menubar: MenuItem[];
  menubarTwo: MenuItem[];

  constructor(private router: Router,
    private service: DoFrameService,
    private activeRoute: ActivatedRoute,
    private zone: NgZone,
    private routeCacheService: RouteCacheService) {
    this.headerController.fill(false);
    this.footController.fill(false);
  }

  public ngOnInit() {
    this.headerController = this.service.headerController;
    this.footController = this.service.footController;
    this.menubar = [
      {
        label: '创新能力', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf8']));
        },
      },
      {
        label: '质量效益', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf9']));
        },
      },
      {
        label: '两化融合', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf10']));
        },
        items: [
          {
            label: '工业软件', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf13']));
            },
          },
          {
            label: '工业网络', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf11']));
            },
          },
          {
            label: '工控系统', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf12']));
            },
          },
          {
            label: '工业互联网平台', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf14']));
            },
          },
        ],
      },
      {
        label: '绿色发展', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf15']));
        },
      },
    ];

    this.menubarTwo = [
      {
        label: '工业运行',
        items: [
          {
            label: '总体监测', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf16']));
            },
          },
          {
            label: '区域监测', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf2']));
            },
          },
          {
            label: '行业监测',
          },
          {
            label: '趋势研判', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf17']));
            },
          },
        ],
      },
      {
        label: '产业布局', command: (event) => {
          this.zone.run(() => this.router.navigate(['pages/mf18']));
        },
        items: [
          {
            label: '中国制造2025分省市指南', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf19']));
            },
          },
          {
            label: '国家新型工业化产业示范基地',
          },
        ],
      },
      {
        label: '重点行业',
        items: [
          {
            label: '节能与新能源汽车', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf5']));
            },
          },
          {
            label: '新一代信息技术产业(手机)', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf21']));
            },
          },
          {
            label: '新一代信息技术产业(集成电路)', command: (event) => {
              this.zone.run(() => this.router.navigate(['pages/mf22']));
            },
          },
          {
            label: '高档数控机床和机器人',
          },
          {
            label: '航空航天装备',
          },
          {
            label: '海洋工程装备及高级技术船舶',
          },
          {
            label: '先进轨道交通装备',
          },
          {
            label: '电力装备',
          },
          {
            label: '农业机械设备',
          },
          {
            label: '新材料',
          },
          {
            label: '生物医疗及高性能医疗器械',
          },
        ],
      },
    ];
  }
  quitClicked() {
    const url = this.activeRoute.snapshot.url[0].path;
    let target: string = '';
    let parameter = {};
    switch (url) {
      case 'mf1':
      case 'mf8':
      case 'mf9':
      case 'mf10':
      case 'mf15':
        target = 'pages/country';
        this.service.selectIndex(0, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf11':
      case 'mf12':
      case 'mf13':
      case 'mf14':
        target = 'pages/mf10';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf2':
      case 'mf5':
      case 'mf16':
      case 'mf17':
      case 'mf18':
      case 'mf21':
      case 'mf22':
        target = 'pages/mf1';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf19':
      case 'mf20':
        target = 'pages/mf18';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf3':
        target = 'pages/mf2';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        break;
      case 'mf4':
        target = 'pages/mf3';
        this.service.selectIndex(1, this.headerController);
        this.service.selectIndex(1, this.footController);
        parameter = {
          name: this.routeCacheService.mf3UrlName, lon: this.routeCacheService.mf3UrlLon,
          lat: this.routeCacheService.mf3UrlLat,
        };
        break;
      case 'country':
      case 'nw1':
        target = 'pages/homepage';
        break;
      case 'nw2':
      case 'nw3':
      case 'nw4':
      case 'nw5':
      case 'nw6':
        target = 'pages/nw1';
        this.service.selectIndex(2, this.service.footController);
        break;
      case 'nw2s1':
        target = 'pages/nw2';
        break;
      default:
        target = 'pages/homepage';
        break;
    }
    this.zone.run(() => this.router.navigate([target, parameter]));
  }
  pushClicked() {
    this.zone.run(() => this.router.navigate(['pages/country']));
    this.service.selectIndex(0, this.service.headerController);
    this.headerController = this.service.headerController;
  }
  rushClicked() {
    this.zone.run(() => this.router.navigate(['pages/mf1']));
    this.service.selectIndex(1, this.service.headerController);
    this.headerController = this.service.headerController;
  }
  dataClicked() {
    this.zone.run(() => this.router.navigate(['pages/dataroam']));
    this.service.selectIndex(0, this.service.footController);
    this.footController = this.service.footController;
  }
  makeClicked() {
    this.zone.run(() => this.router.navigate(['pages/country']));
    this.service.selectIndex(1, this.service.footController);
    this.footController = this.service.footController;
  }
  netClicked() {
    this.zone.run(() => this.router.navigate(['pages/nw1']));
    this.service.selectIndex(2, this.service.footController);
    this.footController = this.service.footController;
  }
}
