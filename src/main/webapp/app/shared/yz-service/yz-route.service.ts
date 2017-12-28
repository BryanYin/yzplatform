import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserRouteAccessService } from '../../shared/yz-service/auth';

@Injectable()
export class YzRouteService {
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

export function showLoginRoutes(path: Route | Routes): Routes {
    if (path instanceof Array) {
        return path.map((p) => setCanActive(p));
    }else {
        return [setCanActive(path)];
    }
}

function setCanActive(path: Route): Route {
    if (environment.showLogin) {
        if (path.canActivate) {
            path.canActivate = [...path.canActivate, UserRouteAccessService];
        } else {
            path.canActivate = [UserRouteAccessService];
        }
    }
    return path;
}
