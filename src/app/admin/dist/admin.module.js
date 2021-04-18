"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_routing_module_1 = require("./admin-routing.module");
var master_component_1 = require("./master/master.component");
var forms_1 = require("@angular/forms");
var theme_1 = require("@nebular/theme");
var theme_module_1 = require("../../../ngx-admin/src/app/@theme/theme.module");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [master_component_1.MasterComponent],
            imports: [
                common_1.CommonModule,
                admin_routing_module_1.AdminRoutingModule,
                theme_1.NbLayoutModule,
                theme_1.NbSidebarModule,
                theme_module_1.ThemeModule,
                theme_1.NbMenuModule,
                theme_1.NbCardModule,
                theme_1.NbInputModule,
                theme_1.NbSelectModule,
                theme_1.NbButtonModule,
                theme_1.NbPopoverModule,
                theme_1.NbTabsetModule,
                forms_1.ReactiveFormsModule,
            ]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
