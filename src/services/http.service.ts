import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable, Subscription} from 'rxjs';

@Injectable()
export class HttpService {
    private url:string = 'assets/data/';

    private data: any;
    private observable: Observable<any>; 

    constructor(private http: Http) {

    }

    getProjects() {
        let o = this.http.get("assets/data/project.json").map(response =>  {
            if(response.status == 200) {
                return response.json();
            }

            return null;
        });

        return o;
    }

    getList(project) {
        let o = this.http.get(this.url + project + "/inventory.json").map(response =>  {
            if(response.status == 200) {
                return response.json();
            }

            return null;
        });

        return o;
    }

    getCachedList(project) {
        if(this.data) {
            // if `data` is available just return it as `Observable`
            return Observable.of(this.data); 
        } else if(this.observable) {
            // if `this.observable` is set then the request is in progress
            // return the `Observable` for the ongoing request
            return this.observable;
        } else {
        
            // create the request, store the `Observable` for subsequent subscribers
            this.observable = this.http.get(this.url + project + "/inventory.json").map(response =>  {
                // when the cached data is available we don't need the `Observable` reference anymore
                this.observable = null;

                if(response.status == 400) {
                    return null;
                } else if(response.status == 200) {
                    this.data = response.json();
                    return this.data;
                }
                // make it shared so more than one subscriber can get the result
            }).share();
            
            return this.observable;
        }
    }
}