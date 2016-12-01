import {Component} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Customer} from "./Customer";

@Component({
    selector: "min-app",
    templateUrl: "./app/VisKunder.html"
})
export class VisAlleKunder {
    public alleKunder: Array<Customer>;
    public laster: boolean;

    constructor(private _http: Http) {}

     ngOnInit() {
        this.laster = true;
         this.hentAlleKunder();
     }

     hentAlleKunder() {
        this._http.get("api/Customer/")
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => {
                this.alleKunder = [];
                if (JsonData) {
                    for (let kundeObjekt of JsonData) {
                        this.alleKunder.push(kundeObjekt);
                        this.laster = false;
                    }
                };
            },
            error => alert(error),
            () => console.log("ferdig get-api/kunde")
        );
    };

}