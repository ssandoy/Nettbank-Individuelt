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
var forms_1 = require('@angular/forms');
var Skjema = (function () {
    function Skjema(fb) {
        this.fb = fb;
        this.Skjema = fb.group({
            personalNumber: ["", forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{11}")],
            firstName: ["", forms_1.Validators.required],
            lastName: ["", forms_1.Validators.required],
            phoneNumber: ["", forms_1.Validators.required, forms_1.Validators.pattern("[0-9]{8}")],
            email: ["", forms_1.Validators.required, forms_1.Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]
        });
    }
    Skjema.prototype.onSubmit = function () {
        console.log("modellbasert skjema submitted");
        console.log(this.Skjema);
        console.log(this.Skjema.value.brukernavn);
        console.log(this.Skjema.touched);
    };
    Skjema = __decorate([
        core_1.Component({
            selector: "min-app",
            templateUrl: "./app/CustomerSkjema.html"
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], Skjema);
    return Skjema;
}());
exports.Skjema = Skjema;
//# sourceMappingURL=CustomerSkjema.js.map