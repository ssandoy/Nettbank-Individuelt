"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var VisAlleKunder = (function () {
    function VisAlleKunder(_http) {
        this._http = _http;
    }
    VisAlleKunder.prototype.ngOnInit = function () {
        this.laster = true;
        this.hentAlleKunder();
    };
    VisAlleKunder.prototype.hentAlleKunder = function () {
        var _this = this;
        this._http.get("api/Customer/")
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.alleKunder = [];
            if (JsonData) {
                for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; _i++) {
                    var kundeObjekt = JsonData_1[_i];
                    _this.alleKunder.push(kundeObjekt);
                    _this.laster = false;
                }
            }
            ;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/kunde"); });
    };
    ;
    VisAlleKunder = __decorate([
        core_1.Component({
            selector: "min-app",
            templateUrl: "./app/VisKunder.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VisAlleKunder);
    return VisAlleKunder;
}());
exports.VisAlleKunder = VisAlleKunder;
//# sourceMappingURL=showCustomers.js.map