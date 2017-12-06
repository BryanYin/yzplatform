import { Injectable } from '@angular/core';

@Injectable()
export class YzFrameService {
    headerController: Array<boolean> = new Array<boolean>(2);
    footController: Array<boolean> = new Array<boolean>(3);

    constructor() {
        this.headerController.fill(false);
    }

    public selectIndex(idx: number, array: Array<boolean>) {
        array.fill(false);
        if (idx < array.length) {
            array[idx] = true;
        }
    }

}
