(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["users-users-module"],{

/***/ "./src/app/layout/users/User.ts":
/*!**************************************!*\
  !*** ./src/app/layout/users/User.ts ***!
  \**************************************/
/*! exports provided: User, Commission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Commission", function() { return Commission; });
var User = /** @class */ (function () {
    function User() {
        this.new();
        return this;
    }
    User.prototype.new = function () {
        this.firstName = "";
        this.lastName = "";
        this.staffTitle = "";
        this.mobileNumber = null;
        this.email = "";
        this.userPermission = "";
        this.notes = "";
        this.employmentStartDate = "";
        this.employmentEndDate = "";
        this.apointmentBooking = false;
        this.apointmentColor = "";
        this.services = [];
        if (this.commissions === undefined) {
            this.commissions = new Commission();
        }
        else {
            this.commissions.new();
        }
    };
    User.prototype.toDto = function () {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.mobileNumber,
            ennable_appointment_bookig: this.apointmentBooking ? 1 : 0,
            notes: this.notes,
            start_date: this.employmentStartDate,
            end_date: this.employmentEndDate,
            appointment_color: this.apointmentColor,
            dial_code: "",
            service_commission: this.commissions.service,
            product_commission: this.commissions.product,
            voucher_sales_commission: this.commissions.voucherSale,
        };
    };
    User.prototype.updateData = function (data) {
        var _a = data.find_user, id = _a.id, name = _a.name, email = _a.email;
        this.id = id;
        this.firstName = name;
        this.email = email;
    };
    return User;
}());

var Commission = /** @class */ (function () {
    function Commission() {
        this.new();
        return this;
    }
    Commission.prototype.new = function () {
        this.service = null;
        this.product = null;
        this.voucherSale = null;
    };
    return Commission;
}());



/***/ }),

/***/ "./src/app/layout/users/users-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/users/users-routing.module.ts ***!
  \******************************************************/
/*! exports provided: UsersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersRoutingModule", function() { return UsersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _users_component__WEBPACK_IMPORTED_MODULE_2__["UsersComponent"]
    }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/users/users.component.html":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [@routerTransition]>\r\n    <app-page-header [heading]=\"'Users'\" [icon]=\"'fa-users'\"></app-page-header>\r\n    <div class=\"row\">\r\n            <div class=\"col-sm-12\">\r\n\r\n                <div class=\"card mb-3\">\r\n                    <div class=\"card-header\">List User <button class=\"btn btn-sm btn-success pull-right\" type=\"button\" (click)=\"openCreateModal(content)\">Thêm mới</button></div>\r\n                    <div class=\"card-body table-responsive\">\r\n                        <table class=\"table table-hover table-striped\">\r\n                            <thead>\r\n                            <tr>\r\n                                <th>STT</th>\r\n                                <th>ID</th>\r\n                                <th>User name</th>\r\n                                <th>Role</th>\r\n                                <th>Status</th>\r\n                                <th>Action</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr *ngFor=\"let user of listusers; index as i\">\r\n                                <td>{{i+1}}</td>\r\n                                <td>{{user.id}}</td>\r\n                                <td>{{user.name}}</td>\r\n                                <td>Admintrolr</td>\r\n                                <td>\r\n                                  <label class=\"switch\">\r\n                                    <input type=\"checkbox\" checked=\"checked\">\r\n                                    <span class=\"slider round\"></span>\r\n                                  </label>\r\n                                </td>\r\n                                <td>\r\n                                  <button _ngcontent-c31=\"\" class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"openUpdateModal(content, user.id)\"><i class=\"fa fa-pencil-square-o\"></i></button>\r\n                                  <button _ngcontent-c31=\"\" class=\"btn btn-sm btn-danger\" type=\"button\"  (click)=\"dalete_user(user.id)\"><i class=\"fa fa-trash-o\"></i></button>\r\n                                </td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n    </div>\r\n\r\n    <ng-template #content let-modal>\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title col-sm-4 offset-sm-4\">{{isCreate ? 'Create User' : 'Update user'}}</h4>\r\n        <button type=\"button\" class=\"col-sm-4 close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n\r\n      <form #signupForm=ngForm (ngSubmit)=\"onSubmit()\">\r\n      <div class=\"modal-body\">\r\n        \r\n            <ngb-tabset>\r\n            <ngb-tab title=\"Details\">\r\n                <ng-template ngbTabContent>\r\n                    \r\n                        <div class=\"col-md-12 form-content\">\r\n                        <div class=\"row\">\r\n                          <div class=\"col-md-6\">\r\n                              <div class=\"row form-group\">\r\n                                  <div class=\"col-sm-6\">\r\n                                    <label class=\"control-label\">FIRST NAME</label>\r\n                                    <input [(ngModel)]=\"form.firstName\" type=\"text\" class=\"form-control input-underline input-lg\" name=\"first-name\" placeholder=\"e.g. Jane\" required>\r\n                                    <div class=\"alert alert-danger\" [hidden]=\"!error.name\"> {{ error.name }} </div>\r\n                                </div>\r\n                \r\n                                <div class=\"col-sm-6\">\r\n                                    <label class=\"control-label\">LAST NAME</label>\r\n                                    <input [(ngModel)]=\"form.lastName\" type=\"text\" name=\"last-name\" class=\"form-control input-underline input-lg\" placeholder=\"e.g. Doe\">\r\n                                    <div class=\"alert alert-danger\" [hidden]=\"!error.email\"> {{ error.email }} </div>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12\">\r\n                                <label class=\"control-label\">MOBILE NUMBER</label>\r\n                                <input [(ngModel)]=\"form.mobileNumber\" type=\"number\" name=\"number\" class=\"form-control input-underline input-lg\" placeholder=\"+84 91 234 56 78\">\r\n                                <div class=\"alert alert-danger\" [hidden]=\"!error.email\"> {{ error.email }} </div>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12\">\r\n                                    <label class=\"control-label\">EMAIL</label>\r\n                                    <input [(ngModel)]=\"form.email\" type=\"email\" name=\"email\" class=\"form-control input-underline input-lg\" placeholder=\"mail@example.com\">\r\n                                    <div class=\"alert alert-danger\" [hidden]=\"!error.email\"> {{ error.email }} </div>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12\">\r\n                                    <label class=\"control-label\">USER PERMISSION</label>\r\n                                    <select [(ngModel)]=\"form.userPermission\" name=\"user-permission\" class=\"form-control\">\r\n                                        <option selected>No Access</option>\r\n                                        <option>Basic</option>\r\n                                        <option>Low</option>\r\n                                        <option>Medium</option>\r\n                                        <option>High</option>\r\n                                    </select>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12 btn-switch\">\r\n                                    <label class=\"switch\">\r\n                                        <input type=\"checkbox\" [(ngModel)]=\"form.apointmentBooking\" name=\"apointmentBooking\">\r\n                                        <span class=\"slider round\"></span>\r\n                                    </label>\r\n                                    <label class=\"control-label\">ENABLE APPOINTMENT BOOKINGS</label>\r\n                                </div>\r\n                            </div>\r\n        \r\n                          </div>\r\n        \r\n                          <div class=\"col-md-6\">\r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12\">\r\n                                    <label class=\"control-label\">STAFF TITLE</label>\r\n                                    <input [(ngModel)]=\"form.staffTitle\" type=\"text\" name=\"staff-title\" class=\"form-control input-underline input-lg\"\r\n                                        placeholder=\"Add staff title (i.e. Hairdresser) viewable in online booking only (optional)\">\r\n                                    <div class=\"alert alert-danger\" [hidden]=\"!error.email\"> {{ error.email }} </div>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-12\">\r\n                                    <label class=\"control-label\">NOTES</label>\r\n                                    <textarea class=\"form-control form-text-area\" [(ngModel)]=\"form.notes\" name=\"notes\"\r\n                                        placeholder=\"Add private notes viewable in staff settings only (optional)\" rows=\"9\"></textarea>\r\n                                </div>\r\n                            </div>\r\n        \r\n                            <div class=\"row form-group\">\r\n                                <div class=\"col-sm-6\">\r\n                                    <label class=\"control-label\">EMPLOYMENT START DATE</label>\r\n                                    <input class=\"form-control\" placeholder=\"yyyy-mm-dd\" (click)=\"dst.toggle()\"\r\n                                        name=\"start-date\" [(ngModel)]=\"form.employmentStartDate\" ngbDatepicker #dst=\"ngbDatepicker\">\r\n                                    <!-- <div class=\"input-group-append\">\r\n                                        <button class=\"btn btn-outline-secondary calendar\" (click)=\"dst.toggle()\" type=\"button\"></button>\r\n                                    </div> -->\r\n                                </div>\r\n                                <div class=\"col-sm-6\">\r\n                                    <label class=\"control-label\">EMPLOYMENT END DATE</label>\r\n                                    <input class=\"form-control\" placeholder=\"yyyy-mm-dd\" (click)=\"de.toggle()\"\r\n                                        name=\"start-date\" [(ngModel)]=\"form.employmentEndDate\" ngbDatepicker #de=\"ngbDatepicker\">\r\n                                    <!-- <div class=\"input-group-append\">\r\n                                        <button class=\"btn btn-outline-secondary calendar\" (click)=\"de.toggle()\" type=\"button\"></button>\r\n                                    </div> -->\r\n                                </div>\r\n                            </div>\r\n        \r\n                          </div>\r\n                          <div *ngIf=\"form.apointmentBooking\">\r\n                                <label class=\"control-label\">APPOINTMENT COLOR</label>\r\n                            </div>\r\n        \r\n                      </div>\r\n                    </div>\r\n\r\n                </ng-template>\r\n            </ngb-tab>\r\n            <ngb-tab>\r\n                <ng-template ngbTabTitle>Services</ng-template>\r\n                <ng-template ngbTabContent>\r\n\r\n                    <br>\r\n                        <p style=\"font-size: 12px; color: rgba(98,98,98,.55);\">Assign services this staff member can perform.</p>\r\n                        <div class=\"custom-control custom-checkbox\">\r\n                            <input type=\"checkbox\" class=\"custom-control-input\" id=\"customCheck1\">\r\n                        <label class=\"custom-control-label\" for=\"customCheck1\">Select All</label>\r\n                        </div>\r\n                        <hr>\r\n                        <div class=\"container row\">\r\n                        <div class=\"col-sm-6 custom-control custom-checkbox\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" id=\"customCheck2\">\r\n                                <label class=\"custom-control-label\" for=\"customCheck2\">Blow Dry</label>\r\n                        </div>\r\n                        <div class=\"col-sm-6 custom-control custom-checkbox\">\r\n                                <input type=\"checkbox\" class=\"custom-control-input\" id=\"customCheck3\">\r\n                                <label class=\"custom-control-label\" for=\"customCheck3\">Haircut</label>\r\n                        </div>\r\n                    </div>\r\n                \r\n                        \r\n                </ng-template>\r\n            </ngb-tab>\r\n            <ngb-tab title=\"Commission\">\r\n                <ng-template ngbTabContent>\r\n                    \r\n                    <div class=\"col-sm-6\">\r\n                        <form role=\"form\">\r\n                            <br>\r\n                            <div class=\"row\">\r\n                                <div class=\"col-sm-6\">\r\n                                        <label class=\"control-label\">SERVICE COMMISSION</label>\r\n                                        <div class=\"form-group input-group\">\r\n                                            <div class=\"input-group-prepend\">\r\n                                                <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\r\n                                            </div>\r\n                                            <input [(ngModel)]=\"form.commissions.service\" name=\"service\" type=\"number\" class=\"form-control\" placeholder=\"0.0\">\r\n                                        </div>\r\n                                </div>\r\n                                <div class=\"col-sm-6\">\r\n                                        <label class=\"control-label\">PRODUCT COMMISSION</label>\r\n                                        <div class=\"form-group input-group\">\r\n                                            <div class=\"input-group-prepend\">\r\n                                                <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\r\n                                            </div>\r\n                                            <input [(ngModel)]=\"form.commissions.product\" name=\"product\" type=\"number\" class=\"form-control\" placeholder=\"0.0\">\r\n                                        </div>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"row\">\r\n                                    <div class=\"col-sm-6\">\r\n                                            <label class=\"control-label\">VOUCHER SALES COMMISSION</label>\r\n                                            <div class=\"form-group input-group\">\r\n                                                <div class=\"input-group-prepend\">\r\n                                                    <span class=\"input-group-text\" id=\"basic-addon1\">%</span>\r\n                                                </div>\r\n                                                <input [(ngModel)]=\"form.commissions.voucherSale\" name=\"voucher\" type=\"number\" class=\"form-control\" placeholder=\"0.0\">\r\n                                            </div>\r\n                                    </div>\r\n                            </div>\r\n                            </form>\r\n\r\n                        </div>\r\n                </ng-template>\r\n            </ngb-tab>\r\n        </ngb-tabset>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-light pull-right\" (click)=\"modal.dismiss('Cancel click')\"> Cancel </button>\r\n        <button type=\"submit\" class=\"btn btn-dark pull-right\" [disabled]=\"!signupForm.valid\" > Register </button>\r\n    </div>\r\n</form>\r\n<!--       <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"modal.close('Save click')\">Save</button>\r\n      </div> -->\r\n    </ng-template>"

/***/ }),

/***/ "./src/app/layout/users/users.component.scss":
/*!***************************************************!*\
  !*** ./src/app/layout/users/users.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modal-header .modal-title {\n  text-align: center; }\n\n.modal-header .close {\n  text-align: right;\n  margin: -1rem 0rem -1rem auto;\n  outline: none; }\n\n.control-label {\n  font-size: 13px;\n  text-transform: uppercase;\n  font-weight: 700; }\n\n.form-text-area {\n  resize: none; }\n\n.btn-switch .control-label {\n  margin-left: 10px; }\n\n.btn-switch {\n  display: flex;\n  align-items: center; }\n\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px; }\n\n/* Hide default HTML checkbox */\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0; }\n\n/* The slider */\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: .4s; }\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  transition: .4s; }\n\ninput:checked + .slider {\n  background-color: #2196F3; }\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3; }\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px); }\n\n/* Rounded sliders */\n\n.slider.round {\n  border-radius: 34px; }\n\n.slider.round:before {\n  border-radius: 50%; }\n\n.ng-invalid:not(form) {\n  border-left: 5px solid red; }\n\n.ng-valid:not(form) {\n  border-left: 5px solid green; }\n\n.form-group {\n  padding: 8px 0; }\n\n.form-group input::-webkit-input-placeholder {\n    color: #656565 !important; }\n\n.form-group input:-moz-placeholder {\n    /* Firefox 18- */\n    color: #656565 !important; }\n\n.form-group input::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #656565 !important; }\n\n.form-group input:-ms-input-placeholder {\n    color: #656565 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3VzZXJzL0M6XFx4YW1wcFxcaHRkb2NzXFxsYXJhdmVsLWFuZ3VsYXItaGFjaGluZXRcXGZyb250ZW5kL3NyY1xcYXBwXFxsYXlvdXRcXHVzZXJzXFx1c2Vycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFrQixFQUNuQjs7QUFFRDtFQUNFLGtCQUFpQjtFQUNqQiw4QkFBNkI7RUFDN0IsY0FBYSxFQUNkOztBQUVEO0VBQ0UsZ0JBQWU7RUFDZiwwQkFBeUI7RUFDekIsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0UsYUFBWSxFQUNiOztBQUVEO0VBQ0Usa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0UsY0FBYTtFQUNiLG9CQUFtQixFQUNwQjs7QUFFRDtFQUNFLG1CQUFrQjtFQUNsQixzQkFBcUI7RUFDckIsWUFBVztFQUNYLGFBQVksRUFDYjs7QUFFRCxnQ0FBZ0M7O0FBQ2hDO0VBQ0UsV0FBVTtFQUNWLFNBQVE7RUFDUixVQUFTLEVBQ1Y7O0FBRUQsZ0JBQWdCOztBQUNoQjtFQUNFLG1CQUFrQjtFQUNsQixnQkFBZTtFQUNmLE9BQU07RUFDTixRQUFPO0VBQ1AsU0FBUTtFQUNSLFVBQVM7RUFDVCx1QkFBc0I7RUFFdEIsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSxtQkFBa0I7RUFDbEIsWUFBVztFQUNYLGFBQVk7RUFDWixZQUFXO0VBQ1gsVUFBUztFQUNULFlBQVc7RUFDWCx3QkFBdUI7RUFFdkIsZ0JBQWUsRUFDaEI7O0FBRUQ7RUFDRSwwQkFBeUIsRUFDMUI7O0FBRUQ7RUFDRSw0QkFBMkIsRUFDNUI7O0FBRUQ7RUFDRSxvQ0FBbUM7RUFFbkMsNEJBQTJCLEVBQzVCOztBQUVELHFCQUFxQjs7QUFDckI7RUFDRSxvQkFBbUIsRUFDcEI7O0FBRUQ7RUFDRSxtQkFBa0IsRUFDbkI7O0FBRUQ7RUFDSSwyQkFBeUIsRUFDNUI7O0FBRUQ7RUFDSSw2QkFBMkIsRUFDOUI7O0FBRUQ7RUFDSSxlQUFjLEVBa0JqQjs7QUFuQkQ7SUFHUSwwQkFBeUIsRUFDNUI7O0FBSkw7SUFPUSxpQkFBaUI7SUFDakIsMEJBQXlCLEVBQzVCOztBQVRMO0lBWVEsaUJBQWlCO0lBQ2pCLDBCQUF5QixFQUM1Qjs7QUFkTDtJQWlCUSwwQkFBeUIsRUFDNUIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdXNlcnMvdXNlcnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubW9kYWwtaGVhZGVyIC5tb2RhbC10aXRsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ubW9kYWwtaGVhZGVyIC5jbG9zZSB7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgbWFyZ2luOiAtMXJlbSAwcmVtIC0xcmVtIGF1dG87XHJcbiAgb3V0bGluZTogbm9uZTtcclxufVxyXG5cclxuLmNvbnRyb2wtbGFiZWwge1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuXHJcbi5mb3JtLXRleHQtYXJlYSB7XHJcbiAgcmVzaXplOiBub25lO1xyXG59XHJcblxyXG4uYnRuLXN3aXRjaCAuY29udHJvbC1sYWJlbCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbi5idG4tc3dpdGNoIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zd2l0Y2gge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiAzNHB4O1xyXG59XHJcblxyXG4vKiBIaWRlIGRlZmF1bHQgSFRNTCBjaGVja2JveCAqL1xyXG4uc3dpdGNoIGlucHV0IHtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHdpZHRoOiAwO1xyXG4gIGhlaWdodDogMDtcclxufVxyXG5cclxuLyogVGhlIHNsaWRlciAqL1xyXG4uc2xpZGVyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJvdHRvbTogMDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xyXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogLjRzO1xyXG4gIHRyYW5zaXRpb246IC40cztcclxufVxyXG5cclxuLnNsaWRlcjpiZWZvcmUge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIGhlaWdodDogMjZweDtcclxuICB3aWR0aDogMjZweDtcclxuICBsZWZ0OiA0cHg7XHJcbiAgYm90dG9tOiA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiAuNHM7XHJcbiAgdHJhbnNpdGlvbjogLjRzO1xyXG59XHJcblxyXG5pbnB1dDpjaGVja2VkICsgLnNsaWRlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZGMztcclxufVxyXG5cclxuaW5wdXQ6Zm9jdXMgKyAuc2xpZGVyIHtcclxuICBib3gtc2hhZG93OiAwIDAgMXB4ICMyMTk2RjM7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWQgKyAuc2xpZGVyOmJlZm9yZSB7XHJcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XHJcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNnB4KTtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjZweCk7XHJcbn1cclxuXHJcbi8qIFJvdW5kZWQgc2xpZGVycyAqL1xyXG4uc2xpZGVyLnJvdW5kIHtcclxuICBib3JkZXItcmFkaXVzOiAzNHB4O1xyXG59XHJcblxyXG4uc2xpZGVyLnJvdW5kOmJlZm9yZSB7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG59XHJcblxyXG4ubmctaW52YWxpZDpub3QoZm9ybSl7XHJcbiAgICBib3JkZXItbGVmdDo1cHggc29saWQgcmVkO1xyXG59XHJcblxyXG4ubmctdmFsaWQ6bm90KGZvcm0pe1xyXG4gICAgYm9yZGVyLWxlZnQ6NXB4IHNvbGlkIGdyZWVuO1xyXG59XHJcblxyXG4uZm9ybS1ncm91cCB7XHJcbiAgICBwYWRkaW5nOiA4cHggMDtcclxuICAgIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICBjb2xvcjogIzY1NjU2NSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Oi1tb3otcGxhY2Vob2xkZXIge1xyXG4gICAgICAgIC8qIEZpcmVmb3ggMTgtICovXHJcbiAgICAgICAgY29sb3I6ICM2NTY1NjUgIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dDo6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgLyogRmlyZWZveCAxOSsgKi9cclxuICAgICAgICBjb2xvcjogIzY1NjU2NSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Oi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgY29sb3I6ICM2NTY1NjUgIWltcG9ydGFudDtcclxuICAgIH1cclxufVxyXG5cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/users/users.component.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/users/users.component.ts ***!
  \*************************************************/
/*! exports provided: UsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersComponent", function() { return UsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./User */ "./src/app/layout/users/User.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UsersComponent = /** @class */ (function () {
    function UsersComponent(http, modal) {
        this.http = http;
        this.modal = modal;
        this.form = new _User__WEBPACK_IMPORTED_MODULE_4__["User"]();
        this.error = [];
        this.getUser();
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.modalOptions = {
            backdrop: 'static',
            size: 'lg'
        };
    };
    UsersComponent.prototype.openModal = function (content) {
        var _this = this;
        this.modal.open(content, this.modalOptions).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    UsersComponent.prototype.openCreateModal = function (content) {
        this.isCreate = true;
        this.form.new();
        this.openModal(content);
    };
    UsersComponent.prototype.openUpdateModal = function (content, userId) {
        var _this = this;
        this.isCreate = false;
        this.http.post('http://localhost:8000/api/show_user', { id: userId })
            .subscribe(function (data) {
            _this.form.updateData(data);
            _this.openModal(content);
        });
    };
    UsersComponent.prototype.getDismissReason = function (reason) {
        if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].ESC) {
            return 'by pressing ESC';
        }
        else if (reason === _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["ModalDismissReasons"].BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    UsersComponent.prototype.getUser = function () {
        var _this = this;
        // console.log('Get Products and Update Table');
        return this.http.get('http://localhost:8000/api/list-user')
            .subscribe(function (listusers) {
            console.log(listusers.list_user);
            _this.listusers = listusers.list_user;
        });
    };
    UsersComponent.prototype.onSubmit = function () {
        var dto = this.form.toDto();
        console.table(dto);
        if (this.isCreate) {
            this.Crete_user(dto);
        }
        else {
            this.update_user(dto);
        }
        this.modal.dismissAll();
    };
    UsersComponent.prototype.Crete_user = function (user) {
        var _this = this;
        this.http.post('http://localhost:8000/api/create_user', user)
            .subscribe(function (data) {
            _this.getUser();
        });
    };
    UsersComponent.prototype.update_user = function (user) {
        var _this = this;
        this.http.post('http://localhost:8000/api/update_user', user)
            .subscribe(function (data) {
            _this.getUser();
        });
    };
    UsersComponent.prototype.dalete_user = function (id) {
        var _this = this;
        // console.log('Get Products and Update Table');
        return this.http.post('http://localhost:8000/api/delete_user', { 'id': id })
            .subscribe(function (data) {
            _this.getUser();
        });
    };
    UsersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(/*! ./users.component.html */ "./src/app/layout/users/users.component.html"),
            styles: [__webpack_require__(/*! ./users.component.scss */ "./src/app/layout/users/users.component.scss")],
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_1__["routerTransition"])()]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"]])
    ], UsersComponent);
    return UsersComponent;
}());



/***/ }),

/***/ "./src/app/layout/users/users.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/users/users.module.ts ***!
  \**********************************************/
/*! exports provided: UsersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersModule", function() { return UsersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_modules_page_header_page_header_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared/modules/page-header/page-header.module */ "./src/app/shared/modules/page-header/page-header.module.ts");
/* harmony import */ var _users_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users-routing.module */ "./src/app/layout/users/users-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _users_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./users.component */ "./src/app/layout/users/users.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _users_routing_module__WEBPACK_IMPORTED_MODULE_3__["UsersRoutingModule"], _shared_modules_page_header_page_header_module__WEBPACK_IMPORTED_MODULE_2__["PageHeaderModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__["NgbModule"]],
            declarations: [_users_component__WEBPACK_IMPORTED_MODULE_6__["UsersComponent"]]
        })
    ], UsersModule);
    return UsersModule;
}());



/***/ })

}]);
//# sourceMappingURL=users-users-module.js.map