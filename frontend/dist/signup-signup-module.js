(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["signup-signup-module"],{

/***/ "./src/app/signup/signup-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/signup/signup-routing.module.ts ***!
  \*************************************************/
/*! exports provided: SignupRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupRoutingModule", function() { return SignupRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _signup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signup.component */ "./src/app/signup/signup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _signup_component__WEBPACK_IMPORTED_MODULE_2__["SignupComponent"]
    }
];
var SignupRoutingModule = /** @class */ (function () {
    function SignupRoutingModule() {
    }
    SignupRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SignupRoutingModule);
    return SignupRoutingModule;
}());



/***/ }),

/***/ "./src/app/signup/signup.component.html":
/*!**********************************************!*\
  !*** ./src/app/signup/signup.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\" [@routerTransition]>\r\n    <div class=\"row justify-content-md-center\">\r\n        <div class=\"col-md-4\">\r\n            <img class=\"user-avatar\" src=\"assets/images/logo.png\" width=\"150px\" />\r\n            <h1>ADMIN - EDUCLANGS</h1>\r\n            <form #signupForm=ngForm (ngSubmit)=\"onSubmit()\">\r\n\r\n                <div class=\"form-content\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control input-underline input-lg\" name=\"name\" [(ngModel)]=\"form.firstName\" id=\"\" placeholder=\"Full Name\" required>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"!error.firstName\"> {{ error.firstName }} </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <input type=\"email\" name=\"email\" [(ngModel)]=\"form.email\" class=\"form-control input-underline input-lg\" id=\"\" placeholder=\"Email\" required>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"!error.email\"> {{ error.email }} </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <input type=\"password\" name=\"password\" [(ngModel)]=\"form.password\" class=\"form-control input-underline input-lg\" id=\"\" placeholder=\"Password\" required>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"!error.password\"> {{ error.password }} </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"password\" name=\"password_confirmation\" [(ngModel)]=\"form.password_confirmation\" class=\"form-control input-underline input-lg\" id=\"\" placeholder=\"Repeat Password\" required>\r\n                        <div class=\"alert alert-danger\" [hidden]=\"!error.password_confirmation\"> {{ error.password_confirmation }} </div>\r\n                    </div>\r\n                </div>\r\n                 <!-- <a class=\"btn rounded-btn\" [routerLink]=\"['/dashboard']\" [disable]=\"!signupForm.valid\" > Register </a>&nbsp; -->\r\n               <button type=\"submit\" class=\"btn rounded-btn\"  [disabled]=\"!signupForm.valid\" > Register </button> &nbsp;\r\n                <a class=\"btn rounded-btn\" [routerLink]=\"['/login']\"> Log in </a>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/signup/signup.component.scss":
/*!**********************************************!*\
  !*** ./src/app/signup/signup.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n.login-page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  background: #222;\n  text-align: center;\n  color: #fff;\n  padding: 3em; }\n\n.login-page .col-lg-4 {\n    padding: 0; }\n\n.login-page .input-lg {\n    height: 46px;\n    padding: 10px 16px;\n    font-size: 18px;\n    line-height: 1.3333333;\n    border-radius: 0; }\n\n.login-page .input-underline {\n    background: 0 0;\n    border: none;\n    box-shadow: none;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.5);\n    color: #fff;\n    border-radius: 0; }\n\n.login-page .input-underline:focus {\n    border-bottom: 2px solid #fff;\n    box-shadow: none; }\n\n.login-page .rounded-btn {\n    border-radius: 50px;\n    color: rgba(255, 255, 255, 0.8);\n    background: #222;\n    border: 2px solid rgba(255, 255, 255, 0.8);\n    font-size: 18px;\n    line-height: 40px;\n    padding: 0 25px; }\n\n.login-page .rounded-btn:hover,\n  .login-page .rounded-btn:focus,\n  .login-page .rounded-btn:active,\n  .login-page .rounded-btn:visited {\n    color: white;\n    border: 2px solid white;\n    outline: none; }\n\n.login-page h1 {\n    font-weight: 300;\n    margin-top: 20px;\n    margin-bottom: 10px;\n    font-size: 36px; }\n\n.login-page h1 small {\n      color: rgba(255, 255, 255, 0.7); }\n\n.login-page .form-group {\n    padding: 8px 0; }\n\n.login-page .form-group input::-webkit-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-moz-placeholder {\n      /* Firefox 18- */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-ms-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-content {\n    padding: 40px 0; }\n\n.login-page .user-avatar {\n    border-radius: 50%;\n    border: 2px solid #fff; }\n\n.login-page .ng-invalid:not(form) {\n    border-left: 5px solid red; }\n\n.login-page .ng-valid:not(form) {\n    border-left: 5px solid green; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2lnbnVwL0M6XFx4YW1wcFxcaHRkb2NzXFxsYXJhdmVsLWFuZ3VsYXItaGFjaGluZXRcXGZyb250ZW5kL3NyY1xcYXBwXFxsb2dpblxcbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxlQUFjLEVBQ2pCOztBQUNEO0VBQ0ksbUJBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsU0FBUTtFQUNSLFVBQVM7RUFDVCxlQUFjO0VBQ2QsaUJBWDBCO0VBYTFCLG1CQUFrQjtFQUNsQixZQUFXO0VBQ1gsYUFBWSxFQTRGZjs7QUF2R0Q7SUFhUSxXQUFVLEVBQ2I7O0FBZEw7SUFnQlEsYUFBWTtJQUNaLG1CQUFrQjtJQUNsQixnQkFBZTtJQUNmLHVCQUFzQjtJQUN0QixpQkFBZ0IsRUFDbkI7O0FBckJMO0lBdUJRLGdCQUFlO0lBQ2YsYUFBWTtJQUNaLGlCQUFnQjtJQUNoQixrREFBaUQ7SUFDakQsWUFBVztJQUNYLGlCQUFnQixFQUNuQjs7QUE3Qkw7SUErQlEsOEJBQTZCO0lBQzdCLGlCQUFnQixFQUNuQjs7QUFqQ0w7SUFvQ1Esb0JBQW1CO0lBQ25CLGdDQUErQjtJQUMvQixpQkExQ3NCO0lBMkN0QiwyQ0FBMEM7SUFDMUMsZ0JBQWU7SUFDZixrQkFBaUI7SUFDakIsZ0JBQWUsRUFDbEI7O0FBM0NMOzs7O0lBZ0RRLGFBQTZCO0lBQzdCLHdCQUF3QztJQUN4QyxjQUFhLEVBQ2hCOztBQW5ETDtJQXNEUSxpQkFBZ0I7SUFDaEIsaUJBQWdCO0lBQ2hCLG9CQUFtQjtJQUNuQixnQkFBZSxFQUlsQjs7QUE3REw7TUEyRFksZ0NBQStCLEVBQ2xDOztBQTVEVDtJQWdFUSxlQUFjLEVBa0JqQjs7QUFsRkw7TUFrRVksMkNBQTBDLEVBQzdDOztBQW5FVDtNQXNFWSxpQkFBaUI7TUFDakIsMkNBQTBDLEVBQzdDOztBQXhFVDtNQTJFWSxpQkFBaUI7TUFDakIsMkNBQTBDLEVBQzdDOztBQTdFVDtNQWdGWSwyQ0FBMEMsRUFDN0M7O0FBakZUO0lBb0ZRLGdCQUFlLEVBQ2xCOztBQXJGTDtJQXdGUSxtQkFBa0I7SUFDbEIsdUJBQXNCLEVBQ3pCOztBQTFGTDtJQTZGUSwyQkFBeUIsRUFDNUI7O0FBOUZMO0lBaUdRLDZCQUEyQixFQUM5QiIsImZpbGUiOiJzcmMvYXBwL3NpZ251cC9zaWdudXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkdG9wbmF2LWJhY2tncm91bmQtY29sb3I6ICMyMjI7XHJcbjpob3N0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi5sb2dpbi1wYWdlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgYmFja2dyb3VuZDogJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yO1xyXG4gICAgLy8gYmFja2dyb3VuZDogZ3JheTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogM2VtO1xyXG4gICAgLmNvbC1sZy00IHtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG4gICAgLmlucHV0LWxnIHtcclxuICAgICAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAxNnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICB9XHJcbiAgICAuaW5wdXQtdW5kZXJsaW5lIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAwIDA7XHJcbiAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgfVxyXG4gICAgLmlucHV0LXVuZGVybGluZTpmb2N1cyB7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZmY7XHJcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIH1cclxuICAgIC5yb3VuZGVkLWJ0biB7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAkdG9wbmF2LWJhY2tncm91bmQtY29sb3I7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcclxuICAgICAgICBwYWRkaW5nOiAwIDI1cHg7XHJcbiAgICB9XHJcbiAgICAucm91bmRlZC1idG46aG92ZXIsXHJcbiAgICAucm91bmRlZC1idG46Zm9jdXMsXHJcbiAgICAucm91bmRlZC1idG46YWN0aXZlLFxyXG4gICAgLnJvdW5kZWQtYnRuOnZpc2l0ZWQge1xyXG4gICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBoMSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgIHNtYWxsIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmZvcm0tZ3JvdXAge1xyXG4gICAgICAgIHBhZGRpbmc6IDhweCAwO1xyXG4gICAgICAgIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQ6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgICAgIC8qIEZpcmVmb3ggMTgtICovXHJcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNikgIWltcG9ydGFudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgLyogRmlyZWZveCAxOSsgKi9cclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5mb3JtLWNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDQwcHggMDtcclxuICAgIH1cclxuICAgIC51c2VyLWF2YXRhciB7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nLWludmFsaWQ6bm90KGZvcm0pe1xyXG4gICAgICAgIGJvcmRlci1sZWZ0OjVweCBzb2xpZCByZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nLXZhbGlkOm5vdChmb3JtKXtcclxuICAgICAgICBib3JkZXItbGVmdDo1cHggc29saWQgZ3JlZW47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/signup/signup.component.ts":
/*!********************************************!*\
  !*** ./src/app/signup/signup.component.ts ***!
  \********************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _shared_services_token_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../shared/services/token.service */ "./src/app/shared/services/token.service.ts");
/* harmony import */ var _shared_services_httpcall_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../shared/services/httpcall.service */ "./src/app/shared/services/httpcall.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupComponent = /** @class */ (function () {
    function SignupComponent(httpcall, Token, router, auth) {
        this.httpcall = httpcall;
        this.Token = Token;
        this.router = router;
        this.auth = auth;
        this.form = {
            email: null,
            firstName: null,
            password: null,
            password_confirmation: null
        };
        this.error = [];
    }
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log(this.form);
        this.httpcall.signup(this.form).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    SignupComponent.prototype.handleResponse = function (data) {
        this.Token.handle(data.access_token, name);
        this.auth.changeAuthStatus(true);
        this.router.navigateByUrl('/login');
    };
    SignupComponent.prototype.handleError = function (error) {
        this.error = error.error.errors;
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.scss */ "./src/app/signup/signup.component.scss")],
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_1__["routerTransition"])()]
        }),
        __metadata("design:paramtypes", [_shared_services_httpcall_service__WEBPACK_IMPORTED_MODULE_5__["HttpcallService"],
            _shared_services_token_service__WEBPACK_IMPORTED_MODULE_4__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/signup/signup.module.ts":
/*!*****************************************!*\
  !*** ./src/app/signup/signup.module.ts ***!
  \*****************************************/
/*! exports provided: SignupModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupModule", function() { return SignupModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _signup_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./signup-routing.module */ "./src/app/signup/signup-routing.module.ts");
/* harmony import */ var _signup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./signup.component */ "./src/app/signup/signup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SignupModule = /** @class */ (function () {
    function SignupModule() {
    }
    SignupModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _signup_routing_module__WEBPACK_IMPORTED_MODULE_3__["SignupRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"]
            ],
            declarations: [_signup_component__WEBPACK_IMPORTED_MODULE_4__["SignupComponent"]]
        })
    ], SignupModule);
    return SignupModule;
}());



/***/ })

}]);
//# sourceMappingURL=signup-signup-module.js.map