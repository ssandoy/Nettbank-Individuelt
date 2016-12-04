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
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var Customer_1 = require("./Customer");
var SPA = (function () {
    function SPA(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.skjema = fb.group({
            personalNumber: ["", [forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{11}")]],
            firstName: ["", forms_1.Validators.required],
            lastName: ["", forms_1.Validators.required],
            phoneNumber: ["", [forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{8}")]],
            email: ["", [forms_1.Validators.required, forms_1.Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
            loanAmount: ["", [forms_1.Validators.required]],
            loanYears: ["", [forms_1.Validators.required, forms_1.Validators.pattern("^([1-9]|10)$")]],
            monthlyFee: ["",]
        });
    }
    SPA.prototype.ngOnInit = function () {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
    };
    SPA.prototype.hentAlleKunder = function () {
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
    SPA.prototype.vedSubmit = function () {
        if (this.skjemaStatus == "Registrere") {
            this.lagreKunde();
        }
        else if (this.skjemaStatus == "Endre") {
            this.endreEnKunde();
        }
        else {
            alert("Feil i applikasjonen!");
        }
    };
    SPA.prototype.registrerKunde = function () {
        // må resette verdiene i skjema dersom skjema har blitt brukt til endringer
        this.skjema.patchValue({ personalNumber: "" });
        this.skjema.patchValue({ firstName: "" });
        this.skjema.patchValue({ lastName: "" });
        this.skjema.patchValue({ phoneNumber: "" });
        this.skjema.patchValue({ email: "" });
        this.skjema.patchValue({ loanAmount: "" });
        this.skjema.patchValue({ loanYears: "" });
        this.skjema.patchValue({ monthlyFee: "" });
        this.skjema.markAsPristine(true);
        this.visKundeListe = false;
        this.skjemaStatus = "Registrere";
        this.visSkjema = true;
    };
    SPA.prototype.tilbakeTilListe = function () {
        this.visKundeListe = true;
        this.visSkjema = false;
    };
    SPA.prototype.lagreKunde = function () {
        var _this = this;
        var lagretKunde = new Customer_1.Customer();
        lagretKunde.personalNumber = this.skjema.value.personalNumber;
        lagretKunde.firstName = this.skjema.value.firstName;
        lagretKunde.lastName = this.skjema.value.lastName;
        lagretKunde.phoneNumber = this.skjema.value.phoneNumber;
        lagretKunde.email = this.skjema.value.email;
        lagretKunde.loanAmount = this.skjema.value.loanAmount;
        lagretKunde.loanYears = this.skjema.value.loanYears;
        var body = JSON.stringify(lagretKunde);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.post("api/Customer", body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.hentAlleKunder();
            _this.visSkjema = false;
            _this.visKundeListe = true;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig post-api/kunde"); });
    };
    ;
    SPA.prototype.sletteKunde = function (id) {
        var _this = this;
        this._http.delete("api/Customer/" + id)
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.hentAlleKunder();
        }, function (error) { return alert(error); }, function () { return console.log("ferdig delete-api/kunde"); });
    };
    ;
    // her blir kunden hentet og vist i skjema
    SPA.prototype.endreKunde = function (id) {
        var _this = this;
        this._http.get("api/Customer/" + id)
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.skjema.patchValue({ personalNumber: JsonData.PersonalNumber });
            /* TODO: FIX NON-EDITABLE*/
            _this.skjema.patchValue({ firstName: JsonData.FirstName });
            _this.skjema.patchValue({ lastName: JsonData.LastName });
            _this.skjema.patchValue({ phoneNumber: JsonData.PhoneNumber });
            _this.skjema.patchValue({ email: JsonData.Email });
            _this.skjema.patchValue({ monthlyFee: JsonData.monthlyFee });
            _this.skjema.patchValue({ loanYears: JsonData.loanYears });
            _this.skjema.patchValue({ loanAmount: JsonData.loanAmount });
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/kunde"); });
        this.skjemaStatus = "Endre";
        this.visSkjema = true;
        this.visKundeListe = false;
    };
    // her blir den endrede kunden lagret
    SPA.prototype.endreEnKunde = function () {
        var _this = this;
        var endretKunde = new Customer_1.Customer();
        endretKunde.personalNumber = this.skjema.value.personalNumber;
        endretKunde.firstName = this.skjema.value.firstName;
        endretKunde.lastName = this.skjema.value.lastName;
        endretKunde.phoneNumber = this.skjema.value.phoneNumber;
        endretKunde.email = this.skjema.value.email;
        endretKunde.loanAmount = this.skjema.value.loanAmount;
        endretKunde.loanYears = this.skjema.value.loanYears;
        var body = JSON.stringify(endretKunde);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.put("api/Customer/" + this.skjema.value.personalNumber, body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.hentAlleKunder();
            _this.visSkjema = false;
            _this.visKundeListe = true;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig put-api/kunde"); });
    };
    SPA = __decorate([
        core_1.Component({
            selector: "min-app",
            templateUrl: "./app/SPA.html",
            styleUrls: ["./stylesheet.css"]
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], SPA);
    return SPA;
}());
exports.SPA = SPA;
//# sourceMappingURL=SPA.js.map