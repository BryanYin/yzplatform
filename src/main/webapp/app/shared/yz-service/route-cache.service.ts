import { Injectable } from '@angular/core';

@Injectable()
export class RouteCacheService {
    mf3UrlName: any;
    mf3UrlLon: any;
    mf3UrlLat: any;
    constructor() {
    }
    assignmentUrl(mf3Name, mf3Lon, mf3Lat) {
        this.mf3UrlName = mf3Name;
        this.mf3UrlLon = mf3Lon;
        this.mf3UrlLat = mf3Lat;
    }
}
