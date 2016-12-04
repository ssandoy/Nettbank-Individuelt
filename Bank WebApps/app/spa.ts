import {Component, OnInit} from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/map";
import {Headers} from "@angular/http";
import {Customer} from "./Customer";

@Component({
    selector: "min-app",
    templateUrl:"./app/SPA.html",
    styleUrls: ["./stylesheet.css"]
})
export class SPA {
    public alleKunder: Array<Customer>;  
    visSkjema: boolean;
    skjemaStatus: string;
    visKundeListe: boolean;
    skjema: FormGroup;
    laster: boolean;

    constructor(private _http: Http, private fb: FormBuilder) {
        this.skjema = fb.group({
            personalNumber: ["", [Validators.required, Validators.pattern("[0-9]{11}")]],
            firstName: ["", Validators.required],
            lastName:  ["", Validators.required],
            phoneNumber: ["", [Validators.required, Validators.pattern("[0-9]{8}")]],
            email: ["", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]],
            loanAmount: ["", [Validators.required]],
            loanYears: ["", [Validators.required, Validators.pattern("^([1-9]|10)$")]],
            monthlyFee: ["", ]
    });
    }

    ngOnInit() {
        this.laster = true;
        this.hentAlleKunder();
        this.visSkjema = false;
        this.visKundeListe = true;
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

      vedSubmit() {
        if (this.skjemaStatus == "Registrere") {
            this.lagreKunde();
        }
        else if (this.skjemaStatus == "Endre") {
            this.endreEnKunde();
        }
        else {
            alert("Feil i applikasjonen!");
        }
    }

    registrerKunde() {
        // må resette verdiene i skjema dersom skjema har blitt brukt til endringer
        this.skjema.patchValue({ personalNumber: "" });
        this.skjema.patchValue({ firstName: "" });
        this.skjema.patchValue({ lastName: "" });
        this.skjema.patchValue({ phoneNumber: "" });
        this.skjema.patchValue({ email: "" });
        this.skjema.patchValue({ loanAmount: "" });
        this.skjema.patchValue({ loanYears: "" });
        this.skjema.patchValue({ monthlyFee: ""});
        this.skjema.markAsPristine(true);
        this.visKundeListe = false;
        this.skjemaStatus = "Registrere";
        this.visSkjema = true;
    }


    tilbakeTilListe() {
        this.visKundeListe = true;
        this.visSkjema = false;
    }

    lagreKunde() {
        var lagretKunde = new Customer();
        lagretKunde.personalNumber = this.skjema.value.personalNumber;
        lagretKunde.firstName = this.skjema.value.firstName;
        lagretKunde.lastName = this.skjema.value.lastName;
        lagretKunde.phoneNumber = this.skjema.value.phoneNumber;
        lagretKunde.email = this.skjema.value.email;
        lagretKunde.loanAmount = this.skjema.value.loanAmount;
        lagretKunde.loanYears = this.skjema.value.loanYears;

       
        var body: string = JSON.stringify(lagretKunde);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.post("api/Customer", body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
                retur=> {
                    this.hentAlleKunder();
                    this.visSkjema = false;
                    this.visKundeListe = true;
                },
            error => alert(error),
            () => console.log("ferdig post-api/kunde")
        );
    };

    sletteKunde(id: string) {
        this._http.delete("api/Customer/" + id)
            .map(returData => returData.toString())
            .subscribe(
            retur => {
                this.hentAlleKunder();
            },
            error => alert(error),
            () => console.log("ferdig delete-api/kunde")
        );
    };
    // her blir kunden hentet og vist i skjema
    endreKunde(id: string) {
        this._http.get("api/Customer/"+id)
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => { // legg de hentede data inn i feltene til endreSkjema.
                this.skjema.patchValue({ personalNumber: JsonData.PersonalNumber });
                /* TODO: FIX NON-EDITABLE*/
                this.skjema.patchValue({ firstName: JsonData.FirstName });
                this.skjema.patchValue({ lastName: JsonData.LastName });
                this.skjema.patchValue({ phoneNumber: JsonData.PhoneNumber });
                this.skjema.patchValue({ email: JsonData.Email });
                this.skjema.patchValue({ monthlyFee: JsonData.monthlyFee });
                this.skjema.patchValue({ loanYears: JsonData.loanYears });
                this.skjema.patchValue({ loanAmount: JsonData.loanAmount });
                
                },
            error => alert(error),
            () => console.log("ferdig get-api/kunde")
        );
        this.skjemaStatus = "Endre";
        this.visSkjema = true;
        this.visKundeListe = false;
    }
    // her blir den endrede kunden lagret
    endreEnKunde() {
        var endretKunde = new Customer();
        endretKunde.personalNumber = this.skjema.value.personalNumber;
        endretKunde.firstName = this.skjema.value.firstName;
        endretKunde.lastName = this.skjema.value.lastName;
        endretKunde.phoneNumber = this.skjema.value.phoneNumber;
        endretKunde.email = this.skjema.value.email;
        endretKunde.loanAmount = this.skjema.value.loanAmount;
        endretKunde.loanYears = this.skjema.value.loanYears;

        var body: string = JSON.stringify(endretKunde);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.put("api/Customer/" + this.skjema.value.personalNumber, body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
            retur => {
                this.hentAlleKunder();
                this.visSkjema = false;
                this.visKundeListe = true;
            },
            error => alert(error),
            () => console.log("ferdig put-api/kunde")
        );
    }
    

}