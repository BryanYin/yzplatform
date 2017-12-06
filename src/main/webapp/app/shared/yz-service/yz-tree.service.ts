import { TreeNode } from 'primeng/primeng';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class YzTreeService {

    constructor(private http: HttpClient) { }

    getFiles(files): Promise<Object> {
        return this.http.get(files)
            .toPromise();
    }
}
