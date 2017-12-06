import { Injectable } from '@angular/core';

@Injectable()
export class YzDatatransService {

  constructor() { }

  public onObjArray(param: Array<any>, type: string, code: string): {} {
    let result = [];
    const keys = [];
    try {
      if ((code + '').indexOf('ec3-pie') >= 0 || (code + '').indexOf('ec3-map-heat') >= 0) {
        result = param;
      } else if ((code + '').indexOf('ec3-word') >= 0) {
        result = param;
      } else if ((code + '').indexOf('ec3-bmap-heat') >= 0) {
        for (const i of param) {
          const arr = [];
          result.push(arr);
        }
        for (const i of param) {
          for (const j of param[i]) {
            result[i].push(param[i][j]);
          }
        }
      } else if ((code + '').indexOf('ec3-radia') >= 0) {
        // tslint:disable-next-line:prefer-const
        let json = {}, json1 = {}, legend = [], data = [], indicator = [];
        for (let i = 0; i < param.length; i++) {
          if (json[param[i].L1] == null) {
            json[param[i].L1] = [];
          }
          json[param[i].L1].push(param[i].L3);
          json1[param[i].L2] = param[i].L4;
        }
        for (const key in json) {
          if (json.hasOwnProperty(key)) {
            legend.push(key);
            data.push({ name: key, value: json[key] });
          }
        }
        for (const key in json1) {
          if (json1.hasOwnProperty(key)) {
            indicator.push({ name: key, max: json1[key] });
          }
        }
        result = [{ indicator: indicator, legend: legend, data: data }];
      } else if ((code + '').indexOf('ec3-map-transfer') >= 0) {
        result = [{ seriesData: [], scatterData: [], lableNum: [] }];
        for (const i of param) {
          const seriesData = { coords: [[], []] };
          seriesData.coords[0].push(param[i].form_longitude);
          seriesData.coords[0].push(param[i].form_latitude);
          seriesData.coords[1].push(param[i].arrive_longitude);
          seriesData.coords[1].push(param[i].arrive_latitude);
          result[0].seriesData.push(seriesData);
          const scatterData = [{ name: '', value: [] }];
          scatterData[0].name = param[i].L1;
          scatterData[0].value.push(param[i].form_longitude);
          scatterData[0].value.push(param[i].form_latitude);
          result[0].scatterData.push(scatterData);
          result[0].lableNum.push(param[i].L2);
        }
      } else if ((code + '').indexOf('ec3-heat') >= 0) {
        result = [{ xdata: [], ydata: [], data: [] }];
        const json = {}, json1 = {};
        for (let i = 0; i < param.length; i++) {
          json[param[i].L1] = '';
          json1[param[i].L2] = '';
          result[0].data.push([param[i].L1, param[i].L2, param[i].L3]);
        }
        for (const key in json) {
          if (json.hasOwnProperty(key)) {
            result[0].xdata.push(key);
          }
        }
        for (const key in json1) {
          if (json.hasOwnProperty(key)) {
            result[0].ydata.push(key);
          }
        }
      } else if ((code + '').indexOf('ec3-visualMap') >= 0) {
        const dictionariesArr = {
          '北京市': '北京',
          '天津市': '天津',
          '河北省': '河北',
          '山西省': '山西',
          '内蒙古自治区': '内蒙古',
          '辽宁省': '辽宁',
          '吉林省': '吉林',
          '黑龙江省': '黑龙江',
          '上海市': '上海',
          '江苏省': '江苏',
          '浙江省': '浙江',
          '安徽省': '安徽',
          '福建省': '福建',
          '江西省': '江西',
          '山东省': '山东',
          '河南省': '河南',
          '湖北省': '湖北',
          '湖南省': '湖南',
          '广东省': '广东',
          '广西壮族自治区': '广西',
          '海南省': '海南',
          '重庆市': '重庆',
          '四川省': '四川',
          '贵州省': '贵州',
          '云南省': '云南',
          '西藏自治区': '西藏',
          '陕西省': '陕西',
          '甘肃省': '甘肃',
          '青海省': '青海',
          '宁夏回族自治区': '宁夏',
          '新疆维吾尔自治区': '新疆',
        };
        for (const i in param) {
          if (dictionariesArr[param[i].name] !== undefined) {
            param[i].name = dictionariesArr[param[i].name];
          }
        }
        result = param;

      } else if ((code + '').indexOf('ec3-scatterMap') >= 0) {
        // tslint:disable-next-line:forin
        for (const i in param) {
          result[i] = [];
          result[i].push(param[i].lon, param[i].lat);
          for (const x in param[i]) {
            if ((x === 'lon') || (x === 'lat')) {
            } else {
              result[i].push(param[i][x]);
            }
          }
        }
      } else if ((code + '').indexOf('ec3-effectScatter') >= 0) {
        const data = [];
        for (const i of param) {
          data[i] = [];
          data[i].push(param[i].x, param[i].y, param[i].area, param[i].value);
          for (const x in param[i]) {
            if ((x === 'x') || (x === 'y') || (x === 'area') || (x === 'value')) {
            } else {
              data[i].push(param[i][x]);
            }
          }
        }
        result = data;
      } else {
        for (const i in param[0]) {
          if (param[0].hasOwnProperty(i)) {
          const arr = [];
          result.push(arr);
          }
        }
        // 用foreach遍历json数组时，用i存json的key值,而不是序号值，将json转化为数组时，用param[i].xxx的方式取值
        for (const i in param[0]) {
          if (param[0].hasOwnProperty(i)) {
            keys.push(i);
          }
        }

        for (const i of param) {
          for (let j = 0; j < keys.length; j++) {
            const num = keys[j];
            if (i[num] === undefined) {
              result[j].push(0);
            } else {
              result[j].push(i[num]);
            }
          }
        }
      }
      console.log(result);
    } catch (e) {
      console.log(e);
    }

    return result;
  }

}
