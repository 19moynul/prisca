"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MasterComponent = void 0;
var core_1 = require("@angular/core");
var menu_1 = require("./menu");
var MasterComponent = /** @class */ (function () {
    function MasterComponent() {
        this.menu = "";
    }
    MasterComponent.prototype.ngOnInit = function () {
        this.menu = menu_1.Menu;
    };
    MasterComponent = __decorate([
        core_1.Component({
            selector: 'ngx-master',
            templateUrl: './master.component.html',
            styleUrls: ['./master.component.scss']
        })
    ], MasterComponent);
    return MasterComponent;
}());
exports.MasterComponent = MasterComponent;
