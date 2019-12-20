import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    constructor(
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this._http.get('/api/auth/')
            .subscribe(data => {
                console.log(data);
            })
    }

}
