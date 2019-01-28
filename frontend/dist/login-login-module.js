(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./node_modules/ng-snotify/index.js":
/*!******************************************!*\
  !*** ./node_modules/ng-snotify/index.js ***!
  \******************************************/
/*! exports provided: SnotifyModule, SnotifyComponent, SnotifyService, SnotifyPosition, SnotifyToast, ToastComponent, TruncatePipe, KeysPipe, ButtonsComponent, PromptComponent, ToastDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnotifyModule", function() { return SnotifyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnotifyComponent", function() { return SnotifyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnotifyService", function() { return SnotifyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnotifyPosition", function() { return SnotifyPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnotifyToast", function() { return SnotifyToast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastComponent", function() { return ToastComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TruncatePipe", function() { return TruncatePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeysPipe", function() { return KeysPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonsComponent", function() { return ButtonsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromptComponent", function() { return PromptComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastDefaults", function() { return ToastDefaults; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast style.
 */
var SnotifyStyle = {
    simple: 'simple',
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    async: 'async',
    confirm: 'confirm',
    prompt: 'prompt'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast main model
 */
var SnotifyToast = /** @class */ (function () {
    function SnotifyToast(id, title, body, config) {
        var _this = this;
        this.id = id;
        this.title = title;
        this.body = body;
        this.config = config;
        /**
         * Emits {SnotifyEvent}
         */
        this.eventEmitter = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
         */
        this._eventsHolder = [];
        if (this.config.type === SnotifyStyle.prompt) {
            this.value = '';
        }
        this.on('hidden', function () {
            _this._eventsHolder.forEach(function (subscription) {
                subscription.unsubscribe();
            });
        });
    }
    /**
     * Subscribe to toast events
     * @param {SnotifyEvent} event
     * @param {(toast: SnotifyToast) => void} action
     * @returns {this}
     */
    /**
     * Subscribe to toast events
     * @param {?} event
     * @param {?} action
     * @return {?}
     */
    SnotifyToast.prototype.on = /**
     * Subscribe to toast events
     * @param {?} event
     * @param {?} action
     * @return {?}
     */
    function (event, action) {
        var _this = this;
        this._eventsHolder.push(this.eventEmitter.subscribe(function (e) {
            if (e === event) {
                action(_this);
            }
        }));
        return this;
    };
    return SnotifyToast;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Transform arguments to Snotify object
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function TransformArgument(target, propertyKey, descriptor) {
    if (propertyKey === SnotifyStyle.async) {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ result;
                if (args.length === 2) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null,
                        action: args[1]
                    };
                }
                else if (args.length === 3) {
                    if (typeof args[1] === 'string') {
                        result = {
                            title: args[1],
                            body: args[0],
                            config: null,
                            action: args[2]
                        };
                    }
                    else {
                        result = {
                            title: null,
                            body: args[0],
                            config: args[2],
                            action: args[1]
                        };
                    }
                }
                else {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[3],
                        action: args[2]
                    };
                }
                return descriptor.value.apply(this, [/** @type {?} */ (result)]);
            }
        };
    }
    else {
        return {
            value: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var /** @type {?} */ result;
                if (args.length === 1) {
                    result = {
                        title: null,
                        body: args[0],
                        config: null
                    };
                }
                else if (args.length === 3) {
                    result = {
                        title: args[1],
                        body: args[0],
                        config: args[2]
                    };
                }
                else {
                    result = (_a = {
                            title: null,
                            config: null,
                            body: args[0]
                        }, _a[typeof args[1] === 'string' ? 'title' : 'config'] = args[1], _a);
                }
                return descriptor.value.apply(this, [/** @type {?} */ (result)]);
                var _a;
            }
        };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generates random id
 * @return {?}
 */
function uuid() {
    return Math.floor(Math.random() * (Date.now() - 1)) + 1;
}
/**
 * Simple is object check.
 * @param {?} item {Object<any>}
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
/**
 * Deep merge objects.
 * @param {...?} sources {Array<Object<any>>}
 * @return {?}
 */
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var /** @type {?} */ target = {};
    if (!sources.length) {
        return target;
    }
    while (sources.length > 0) {
        var /** @type {?} */ source = sources.shift();
        if (isObject(source)) {
            for (var /** @type {?} */ key in source) {
                if (isObject(source[key])) {
                    target[key] = mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, (_a = {}, _a[key] = source[key], _a));
                }
            }
        }
    }
    return target;
    var _a;
}
/**
 * @param {?} start
 * @param {?} duration
 * @param {?} callback
 * @return {?}
 */

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Defines toast style depending on method name
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function SetToastType(target, propertyKey, descriptor) {
    return {
        value: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (/** @type {?} */ (args[0])).config = __assign({}, (/** @type {?} */ (args[0])).config, { type: propertyKey });
            return descriptor.value.apply(this, args);
        }
    };
}

var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * SnotifyService - create, remove, config toasts
 */
var SnotifyService = /** @class */ (function () {
    function SnotifyService(config) {
        this.config = config;
        this.emitter = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.toastChanged = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.toastDeleted = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.notifications = [];
    }
    /**
     * emit changes in notifications array
     * @return {?}
     */
    SnotifyService.prototype.emit = /**
     * emit changes in notifications array
     * @return {?}
     */
    function () {
        this.emitter.next(this.notifications.slice());
    };
    /**
     * returns SnotifyToast object
     * @param id {Number}
     * @return {SnotifyToast|undefined}
     */
    /**
     * returns SnotifyToast object
     * @param {?} id {Number}
     * @return {?}
     */
    SnotifyService.prototype.get = /**
     * returns SnotifyToast object
     * @param {?} id {Number}
     * @return {?}
     */
    function (id) {
        return this.notifications.find(function (toast) { return toast.id === id; });
    };
    /**
     * add SnotifyToast to notifications array
     * @param {?} toast {SnotifyToast}
     * @return {?}
     */
    SnotifyService.prototype.add = /**
     * add SnotifyToast to notifications array
     * @param {?} toast {SnotifyToast}
     * @return {?}
     */
    function (toast) {
        if (this.config.global.newOnTop) {
            this.notifications.unshift(toast);
        }
        else {
            this.notifications.push(toast);
        }
        this.emit();
    };
    /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param id {number}
     * @param remove {boolean}
     */
    /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param {?=} id {number}
     * @param {?=} remove {boolean}
     * @return {?}
     */
    SnotifyService.prototype.remove = /**
     * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
     * @param {?=} id {number}
     * @param {?=} remove {boolean}
     * @return {?}
     */
    function (id, remove) {
        if (!id) {
            return this.clear();
        }
        else if (remove) {
            this.notifications = this.notifications.filter(function (toast) { return toast.id !== id; });
            return this.emit();
        }
        this.toastDeleted.next(id);
    };
    /**
     * Clear notifications array
     */
    /**
     * Clear notifications array
     * @return {?}
     */
    SnotifyService.prototype.clear = /**
     * Clear notifications array
     * @return {?}
     */
    function () {
        this.notifications = [];
        this.emit();
    };
    /**
     * Creates toast and add it to array, returns toast id
     * @param snotify {Snotify}
     * @return {number}
     */
    /**
     * Creates toast and add it to array, returns toast id
     * @param {?} snotify {Snotify}
     * @return {?}
     */
    SnotifyService.prototype.create = /**
     * Creates toast and add it to array, returns toast id
     * @param {?} snotify {Snotify}
     * @return {?}
     */
    function (snotify) {
        var /** @type {?} */ config = mergeDeep(this.config.toast, this.config.type[snotify.config.type], snotify.config);
        var /** @type {?} */ toast = new SnotifyToast(uuid(), snotify.title, snotify.body, config);
        this.add(toast);
        return toast;
    };
    /**
     * @param {?} defaults
     * @return {?}
     */
    SnotifyService.prototype.setDefaults = /**
     * @param {?} defaults
     * @return {?}
     */
    function (defaults) {
        return this.config = /** @type {?} */ (mergeDeep(this.config, defaults));
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.simple = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.success = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.error = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.info = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.warning = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.confirm = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.prompt = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        return this.create(args);
    };
    /**
     * Transform toast arguments into {Snotify} object
     */
    /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    SnotifyService.prototype.async = /**
     * Transform toast arguments into {Snotify} object
     * @param {?} args
     * @return {?}
     */
    function (args) {
        var _this = this;
        var /** @type {?} */ async;
        if (args.action instanceof Promise) {
            async = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(args.action);
        }
        else {
            async = args.action;
        }
        var /** @type {?} */ toast = this.create(args);
        toast.on('mounted', function () {
            var /** @type {?} */ subscription = async.subscribe(function (next) {
                _this.mergeToast(toast, next);
            }, function (error) {
                _this.mergeToast(toast, error, SnotifyStyle.error);
                subscription.unsubscribe();
            }, function () {
                _this.mergeToast(toast, {}, SnotifyStyle.success);
                subscription.unsubscribe();
            });
        });
        return toast;
    };
    /**
     * @param {?} toast
     * @param {?} next
     * @param {?=} type
     * @return {?}
     */
    SnotifyService.prototype.mergeToast = /**
     * @param {?} toast
     * @param {?} next
     * @param {?=} type
     * @return {?}
     */
    function (toast, next, type) {
        if (next.body) {
            toast.body = next.body;
        }
        if (next.title) {
            toast.title = next.title;
        }
        if (type) {
            toast.config = mergeDeep(toast.config, this.config.global, this.config.toast[type], { type: type }, next.config);
        }
        else {
            toast.config = mergeDeep(toast.config, next.config);
        }
        if (next.html) {
            toast.config.html = next.html;
        }
        this.emit();
        this.toastChanged.next(toast);
    };
    /**
     * Creates empty toast with html string inside
     * @param {string | SafeHtml} html
     * @param {SnotifyToastConfig} config
     * @returns {number}
     */
    /**
     * Creates empty toast with html string inside
     * @param {?} html
     * @param {?=} config
     * @return {?}
     */
    SnotifyService.prototype.html = /**
     * Creates empty toast with html string inside
     * @param {?} html
     * @param {?=} config
     * @return {?}
     */
    function (html, config) {
        return this.create({
            title: null,
            body: null,
            config: __assign$1({}, config, { html: html })
        });
    };
    SnotifyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    SnotifyService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['SnotifyToastConfig',] },] },
    ]; };
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "simple", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "success", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "error", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "info", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "warning", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "confirm", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "prompt", null);
    __decorate([
        TransformArgument
        /**
         * Determines current toast type and collects default configuration
         */
        ,
        SetToastType,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", SnotifyToast)
    ], SnotifyService.prototype, "async", null);
    return SnotifyService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Toast position
 */
var SnotifyPosition = /** @class */ (function () {
    function SnotifyPosition() {
    }
    SnotifyPosition.leftTop = 'leftTop';
    SnotifyPosition.leftCenter = 'leftCenter';
    SnotifyPosition.leftBottom = 'leftBottom';
    SnotifyPosition.rightTop = 'rightTop';
    SnotifyPosition.rightCenter = 'rightCenter';
    SnotifyPosition.rightBottom = 'rightBottom';
    SnotifyPosition.centerTop = 'centerTop';
    SnotifyPosition.centerCenter = 'centerCenter';
    SnotifyPosition.centerBottom = 'centerBottom';
    return SnotifyPosition;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnotifyComponent = /** @class */ (function () {
    function SnotifyComponent(service) {
        this.service = service;
        /**
         * Backdrop Opacity
         */
        this.backdrop = -1;
    }
    /**
     * Init base options. Subscribe to options, lifecycle change
     */
    /**
     * Init base options. Subscribe to options, lifecycle change
     * @return {?}
     */
    SnotifyComponent.prototype.ngOnInit = /**
     * Init base options. Subscribe to options, lifecycle change
     * @return {?}
     */
    function () {
        var _this = this;
        this.emitter = this.service.emitter.subscribe(function (toasts) {
            if (_this.service.config.global.newOnTop) {
                _this.dockSize_a = -_this.service.config.global.maxOnScreen;
                _this.dockSize_b = undefined;
                _this.blockSize_a = -_this.service.config.global.maxAtPosition;
                _this.blockSize_b = undefined;
                _this.withBackdrop = toasts.filter(function (toast) { return toast.config.backdrop >= 0; });
            }
            else {
                _this.dockSize_a = 0;
                _this.dockSize_b = _this.service.config.global.maxOnScreen;
                _this.blockSize_a = 0;
                _this.blockSize_b = _this.service.config.global.maxAtPosition;
                _this.withBackdrop = toasts.filter(function (toast) { return toast.config.backdrop >= 0; }).reverse();
            }
            _this.notifications = _this.splitToasts(toasts.slice(_this.dockSize_a, _this.dockSize_b));
            _this.stateChanged('mounted');
        });
    };
    // TODO: fix backdrop if more than one toast called in a row
    /**
     * Changes the backdrop opacity
     * @param {SnotifyEvent} event
     */
    /**
     * Changes the backdrop opacity
     * @param {?} event
     * @return {?}
     */
    SnotifyComponent.prototype.stateChanged = /**
     * Changes the backdrop opacity
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.withBackdrop.length) {
            if (this.backdrop >= 0) {
                this.backdrop = -1;
            }
            return;
        }
        switch (event) {
            case 'mounted':
                if (this.backdrop < 0) {
                    this.backdrop = 0;
                }
                break;
            case 'beforeShow':
                this.backdrop = this.withBackdrop[this.withBackdrop.length - 1].config.backdrop;
                break;
            case 'beforeHide':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = 0;
                }
                break;
            case 'hidden':
                if (this.withBackdrop.length === 1) {
                    this.backdrop = -1;
                }
                break;
        }
    };
    /**
     * Split toasts toasts into different objects
     * @param {SnotifyToast[]} toasts
     * @returns {SnotifyNotifications}
     */
    /**
     * Split toasts toasts into different objects
     * @param {?} toasts
     * @return {?}
     */
    SnotifyComponent.prototype.splitToasts = /**
     * Split toasts toasts into different objects
     * @param {?} toasts
     * @return {?}
     */
    function (toasts) {
        var /** @type {?} */ result = {};
        for (var /** @type {?} */ property in SnotifyPosition) {
            if (SnotifyPosition.hasOwnProperty(property)) {
                result[SnotifyPosition[property]] = [];
            }
        }
        toasts.forEach(function (toast) {
            result[/** @type {?} */ (toast.config.position)].push(toast);
        });
        return result;
    };
    /**
     * Unsubscribe subscriptions
     */
    /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    SnotifyComponent.prototype.ngOnDestroy = /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    function () {
        this.emitter.unsubscribe();
    };
    SnotifyComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-snotify',
                    template: "<div class=\"snotify-backdrop\" *ngIf=\"backdrop >= 0\" [style.opacity]=\"backdrop\"></div> <div *ngFor=\"let position of notifications | keys\" class=\"snotify snotify-{{position}}\"> <ng-snotify-toast *ngFor=\"let notification of notifications[position] | slice:blockSize_a:blockSize_b\" [toast]=\"notification\" (stateChanged)=\"stateChanged($event)\" > </ng-snotify-toast> </div> ",
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
                },] },
    ];
    /** @nocollapse */
    SnotifyComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    return SnotifyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ToastComponent = /** @class */ (function () {
    function ToastComponent(service) {
        this.service = service;
        this.stateChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * Toast state
         */
        this.state = {
            paused: false,
            progress: 0,
            animation: '',
            isDestroying: false,
            promptType: SnotifyStyle.prompt
        };
    }
    // Lifecycles
    /**
     * Init base options. Subscribe to toast changed, toast deleted
     */
    /**
     * Init base options. Subscribe to toast changed, toast deleted
     * @return {?}
     */
    ToastComponent.prototype.ngOnInit = /**
     * Init base options. Subscribe to toast changed, toast deleted
     * @return {?}
     */
    function () {
        var _this = this;
        this.toastChangedSubscription = this.service.toastChanged.subscribe(function (toast) {
            if (_this.toast.id === toast.id) {
                _this.initToast();
            }
        });
        this.toastDeletedSubscription = this.service.toastDeleted.subscribe(function (id) {
            if (_this.toast.id === id) {
                _this.onRemove();
            }
        });
        if (!this.toast.config.timeout) {
            this.toast.config.showProgressBar = false;
        }
        this.toast.eventEmitter.next('mounted');
        this.state.animation = 'snotifyToast--in';
    };
    /**
     * @return {?}
     */
    ToastComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.stateChanged.emit('beforeShow');
            _this.toast.eventEmitter.next('beforeShow');
            _this.state.animation = _this.toast.config.animation.enter;
        }, this.service.config.toast.animation.time / 5); // time to show toast push animation (snotifyToast--in)
    };
    /**
     * Unsubscribe subscriptions
     */
    /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    ToastComponent.prototype.ngOnDestroy = /**
     * Unsubscribe subscriptions
     * @return {?}
     */
    function () {
        cancelAnimationFrame(this.animationFrame);
        this.toast.eventEmitter.next('destroyed');
        this.toastChangedSubscription.unsubscribe();
        this.toastDeletedSubscription.unsubscribe();
    };
    /*
    Event hooks
     */
    /**
     * Trigger OnClick lifecycle
     */
    /**
     * Trigger OnClick lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onClick = /**
     * Trigger OnClick lifecycle
     * @return {?}
     */
    function () {
        this.toast.eventEmitter.next('click');
        if (this.toast.config.closeOnClick) {
            this.service.remove(this.toast.id);
        }
    };
    /**
     * Trigger beforeDestroy lifecycle. Removes toast
     */
    /**
     * Trigger beforeDestroy lifecycle. Removes toast
     * @return {?}
     */
    ToastComponent.prototype.onRemove = /**
     * Trigger beforeDestroy lifecycle. Removes toast
     * @return {?}
     */
    function () {
        var _this = this;
        this.state.isDestroying = true;
        this.toast.eventEmitter.next('beforeHide');
        this.stateChanged.emit('beforeHide');
        this.state.animation = this.toast.config.animation.exit;
        setTimeout(function () {
            _this.stateChanged.emit('hidden');
            _this.state.animation = 'snotifyToast--out';
            _this.toast.eventEmitter.next('hidden');
            setTimeout(function () { return _this.service.remove(_this.toast.id, true); }, _this.toast.config.animation.time / 2);
        }, this.toast.config.animation.time / 2);
    };
    /**
     * Trigger onHoverEnter lifecycle
     */
    /**
     * Trigger onHoverEnter lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onMouseEnter = /**
     * Trigger onHoverEnter lifecycle
     * @return {?}
     */
    function () {
        this.toast.eventEmitter.next('mouseenter');
        if (this.toast.config.pauseOnHover) {
            this.state.paused = true;
        }
    };
    /**
     * Trigger onHoverLeave lifecycle
     */
    /**
     * Trigger onHoverLeave lifecycle
     * @return {?}
     */
    ToastComponent.prototype.onMouseLeave = /**
     * Trigger onHoverLeave lifecycle
     * @return {?}
     */
    function () {
        if (this.toast.config.pauseOnHover && this.toast.config.timeout) {
            this.state.paused = false;
            this.startTimeout(this.toast.config.timeout * this.state.progress);
        }
        this.toast.eventEmitter.next('mouseleave');
    };
    /**
     * Remove toast completely after animation
     */
    /**
     * Remove toast completely after animation
     * @return {?}
     */
    ToastComponent.prototype.onExitTransitionEnd = /**
     * Remove toast completely after animation
     * @return {?}
     */
    function () {
        if (this.state.isDestroying) {
            return;
        }
        this.initToast();
        this.toast.eventEmitter.next('shown');
    };
    /*
     Common
     */
    /**
     * Initialize base toast config
     *
     */
    /**
     * Initialize base toast config
     *
     * @return {?}
     */
    ToastComponent.prototype.initToast = /**
     * Initialize base toast config
     *
     * @return {?}
     */
    function () {
        if (this.toast.config.timeout > 0) {
            this.startTimeout(0);
        }
    };
    /**
     * Start progress bar
     * @param startTime {number}
     * @default 0
     */
    /**
     * Start progress bar
     * \@default 0
     * @param {?=} startTime {number}
     * @return {?}
     */
    ToastComponent.prototype.startTimeout = /**
     * Start progress bar
     * \@default 0
     * @param {?=} startTime {number}
     * @return {?}
     */
    function (startTime) {
        var _this = this;
        if (startTime === void 0) { startTime = 0; }
        var /** @type {?} */ start = performance.now();
        var /** @type {?} */ calculate = function () {
            _this.animationFrame = requestAnimationFrame(function (timestamp) {
                var /** @type {?} */ runtime = timestamp + startTime - start;
                var /** @type {?} */ progress = Math.min(runtime / _this.toast.config.timeout, 1);
                if (_this.state.paused) {
                    cancelAnimationFrame(_this.animationFrame);
                }
                else if (runtime < _this.toast.config.timeout) {
                    _this.state.progress = progress;
                    calculate();
                }
                else {
                    _this.state.progress = 1;
                    cancelAnimationFrame(_this.animationFrame);
                    _this.service.remove(_this.toast.id);
                }
            });
        };
        calculate();
    };
    ToastComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-snotify-toast',
                    template: "<div [attr.role]=\"toast.config.type === state.promptType ? 'dialog' : 'alert'\" [attr.aria-labelledby]=\"'snotify_'+toast.id\" [attr.aria-modal]=\"toast.config.type === state.promptType\" [ngClass]=\"[ 'snotifyToast animated', 'snotify-' + toast.config.type, state.animation, toast.valid === undefined ? '' : (toast.valid ? 'snotifyToast--valid' : 'snotifyToast--invalid') ]\" [ngStyle]=\"{ '-webkit-transition': toast.config.animation.time + 'ms', transition: toast.config.animation.time + 'ms', '-webkit-animation-duration': toast.config.animation.time + 'ms', 'animation-duration': toast.config.animation.time + 'ms' }\" (animationend)=\"onExitTransitionEnd()\" (click)=\"onClick()\" (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\"> <div class=\"snotifyToast__progressBar\" *ngIf=\"toast.config.showProgressBar\"> <span class=\"snotifyToast__progressBar__percentage\" [ngStyle]=\"{'width': (state.progress * 100) + '%'}\"></span> </div> <div class=\"snotifyToast__inner\" *ngIf=\"!toast.config.html; else toastHTML\"> <div class=\"snotifyToast__title\" [attr.id]=\"'snotify_'+toast.id\" *ngIf=\"toast.title\">{{toast.title | truncate : toast.config.titleMaxLength}}</div> <div class=\"snotifyToast__body\" *ngIf=\"toast.body\">{{toast.body | truncate : toast.config.bodyMaxLength}}</div> <ng-snotify-prompt *ngIf=\"toast.config.type === state.promptType\" [toast]=\"toast\"> </ng-snotify-prompt> <div *ngIf=\"!toast.config.icon; else elseBlock\" [ngClass]=\"['snotify-icon', (toast.config.iconClass || 'snotify-icon--' + toast.config.type)]\"></div> <ng-template #elseBlock> <img class=\"snotify-icon\" [src]='toast.config.icon' /> </ng-template> </div> <ng-template #toastHTML> <div class=\"snotifyToast__inner\" [innerHTML]=\"toast.config.html\"></div> </ng-template> <ng-snotify-button *ngIf=\"toast.config.buttons\" [toast]=\"toast\"></ng-snotify-button> </div> ",
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                },] },
    ];
    /** @nocollapse */
    ToastComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    ToastComponent.propDecorators = {
        "toast": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "stateChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return ToastComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TruncatePipe = /** @class */ (function () {
    function TruncatePipe() {
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    TruncatePipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var /** @type {?} */ limit = 40;
        var /** @type {?} */ trail = '...';
        if (args.length > 0) {
            limit = args.length > 0 ? parseInt(args[0], 10) : limit;
            trail = args.length > 1 ? args[1] : trail;
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'truncate'
                },] },
    ];
    return TruncatePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ButtonsComponent = /** @class */ (function () {
    function ButtonsComponent(service) {
        this.service = service;
    }
    /**
     * remove toast
     */
    /**
     * remove toast
     * @return {?}
     */
    ButtonsComponent.prototype.remove = /**
     * remove toast
     * @return {?}
     */
    function () {
        this.service.remove(this.toast.id);
    };
    ButtonsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-snotify-button',
                    template: "<div class=\"snotifyToast__buttons\"> <button type=\"button\" *ngFor=\"let button of toast.config.buttons\" [ngClass]=\"{'snotifyToast__buttons--bold': button.bold}\" (click)=\"button.action ? button.action(toast) : remove()\"> {{button.text}} </button> </div> ",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                },] },
    ];
    /** @nocollapse */
    ButtonsComponent.ctorParameters = function () { return [
        { type: SnotifyService, },
    ]; };
    ButtonsComponent.propDecorators = {
        "toast": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return ButtonsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PromptComponent = /** @class */ (function () {
    function PromptComponent() {
        /**
         * Is PROMPT focused
         */
        this.isPromptFocused = false;
    }
    PromptComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-snotify-prompt',
                    template: "<span class=\"snotifyToast__input\" [ngClass]=\"{'snotifyToast__input--filled': isPromptFocused}\"> <input (input)=\"toast.value = $event.target.value; toast.eventEmitter.next('input')\" autofocus class=\"snotifyToast__input__field\" type=\"text\" [id]=\"toast.id\" (focus)=\"isPromptFocused = true\" (blur)=\"isPromptFocused = !!toast.value.length;\"/> <label class=\"snotifyToast__input__label\" [for]=\"toast.id\"> <span class=\"snotifyToast__input__labelContent\">{{toast.config.placeholder | truncate}}</span> </label> </span> ",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                },] },
    ];
    /** @nocollapse */
    PromptComponent.propDecorators = {
        "toast": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PromptComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    KeysPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} args
     * @return {?}
     */
    function (value, args) {
        if (args === void 0) { args = null; }
        if (!value) {
            return value;
        }
        return Object.keys(value);
    };
    KeysPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'keys',
                    pure: false
                },] },
    ];
    return KeysPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Snotify default configuration object
 */
var ToastDefaults = {
    global: {
        newOnTop: true,
        maxOnScreen: 8,
        maxAtPosition: 8
    },
    toast: {
        type: SnotifyStyle.simple,
        showProgressBar: true,
        timeout: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        bodyMaxLength: 150,
        titleMaxLength: 16,
        backdrop: -1,
        icon: null,
        iconClass: null,
        html: null,
        position: SnotifyPosition.rightBottom,
        animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 }
    },
    type: (_a = {}, _a[SnotifyStyle.prompt] = {
            timeout: 0,
            closeOnClick: false,
            buttons: [
                { text: 'Ok', action: null, bold: true },
                { text: 'Cancel', action: null, bold: false },
            ],
            placeholder: 'Enter answer here...',
            type: SnotifyStyle.prompt,
        }, _a[SnotifyStyle.confirm] = {
            timeout: 0,
            closeOnClick: false,
            buttons: [
                { text: 'Ok', action: null, bold: true },
                { text: 'Cancel', action: null, bold: false },
            ],
            type: SnotifyStyle.confirm,
        }, _a[SnotifyStyle.simple] = {
            type: SnotifyStyle.simple
        }, _a[SnotifyStyle.success] = {
            type: SnotifyStyle.success
        }, _a[SnotifyStyle.error] = {
            type: SnotifyStyle.error
        }, _a[SnotifyStyle.warning] = {
            type: SnotifyStyle.warning
        }, _a[SnotifyStyle.info] = {
            type: SnotifyStyle.info
        }, _a[SnotifyStyle.async] = {
            pauseOnHover: false,
            closeOnClick: false,
            timeout: 0,
            showProgressBar: false,
            type: SnotifyStyle.async
        }, _a)
};
var _a;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SnotifyModule = /** @class */ (function () {
    function SnotifyModule() {
    }
    /**
     * @return {?}
     */
    SnotifyModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: SnotifyModule,
            providers: [SnotifyService]
        };
    };
    SnotifyModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
                    ],
                    declarations: [
                        SnotifyComponent, ToastComponent, TruncatePipe,
                        ButtonsComponent, PromptComponent, KeysPipe
                    ],
                    exports: [
                        SnotifyComponent, TruncatePipe, KeysPipe
                    ]
                },] },
    ];
    return SnotifyModule;
}());




/***/ }),

/***/ "./node_modules/ngx-loading/fesm5/ngx-loading.js":
/*!*******************************************************!*\
  !*** ./node_modules/ngx-loading/fesm5/ngx-loading.js ***!
  \*******************************************************/
/*! exports provided: NgxLoadingService, NgxLoadingComponent, NgxLoadingModule, NgxLoadingConfig, ngxLoadingAnimationTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxLoadingService", function() { return NgxLoadingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxLoadingComponent", function() { return NgxLoadingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxLoadingModule", function() { return NgxLoadingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxLoadingConfig", function() { return NgxLoadingConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ngxLoadingAnimationTypes", function() { return ngxLoadingAnimationTypes; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLoadingConfig = /** @class */ (function () {
    function NgxLoadingConfig(config) {
        if (config === void 0) { config = {}; }
        this.backdropBorderRadius = config.backdropBorderRadius;
        this.backdropBackgroundColour = config.backdropBackgroundColour;
        this.fullScreenBackdrop = config.fullScreenBackdrop;
        this.animationType = config.animationType;
        this.primaryColour = config.primaryColour;
        this.secondaryColour = config.secondaryColour;
        this.tertiaryColour = config.tertiaryColour;
    }
    return NgxLoadingConfig;
}());
/** @type {?} */
var ngxLoadingAnimationTypes = {
    chasingDots: 'chasing-dots',
    circle: 'sk-circle',
    circleSwish: 'circleSwish',
    cubeGrid: 'sk-cube-grid',
    doubleBounce: 'double-bounce',
    none: 'none',
    pulse: 'pulse',
    rectangleBounce: 'rectangle-bounce',
    rotatingPlane: 'rotating-plane',
    threeBounce: 'three-bounce',
    wanderingCubes: 'wandering-cubes'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLoadingService = /** @class */ (function () {
    function NgxLoadingService(config) {
        this.config = config;
        this.loadingConfig = this.config || new NgxLoadingConfig();
    }
    NgxLoadingService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    NgxLoadingService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: ['loadingConfig',] }] }
    ]; };
    /** @nocollapse */ NgxLoadingService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function NgxLoadingService_Factory() { return new NgxLoadingService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])("loadingConfig", 8)); }, token: NgxLoadingService, providedIn: "root" });
    return NgxLoadingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLoadingComponent = /** @class */ (function () {
    function NgxLoadingComponent(LoadingService, changeDetectorRef) {
        this.LoadingService = LoadingService;
        this.changeDetectorRef = changeDetectorRef;
        this.config = new NgxLoadingConfig();
        this.defaultConfig = {
            animationType: ngxLoadingAnimationTypes.threeBounce,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.3)',
            backdropBorderRadius: '0px',
            fullScreenBackdrop: false,
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        };
        this.ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
    }
    /**
     * @return {?}
     */
    NgxLoadingComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setupConfig();
    };
    /**
     * @return {?}
     */
    NgxLoadingComponent.prototype.setupConfig = /**
     * @return {?}
     */
    function () {
        for (var option in this.defaultConfig) {
            if (typeof this.config[option] === 'boolean') {
                if (this.config[option] != null) {
                    continue;
                }
                this.config[option] = this.LoadingService.loadingConfig[option] != null ? this.LoadingService.loadingConfig[option] : this.defaultConfig[option];
            }
            else {
                if (this.config[option] != null) {
                    continue;
                }
                this.config[option] = this.LoadingService.loadingConfig[option] != null ? this.LoadingService.loadingConfig[option] : this.defaultConfig[option];
            }
        }
    };
    /**
     * @param {?} show
     * @return {?}
     */
    NgxLoadingComponent.prototype.setShow = /**
     * @param {?} show
     * @return {?}
     */
    function (show) {
        this.show = show;
        this.changeDetectorRef.markForCheck();
    };
    NgxLoadingComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ngx-loading',
                    template: "\n    <div *ngIf=\"show\">\n      <div class=\"backdrop\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\" [ngStyle]=\"{'border-radius': config?.backdropBorderRadius, 'background-color': config?.backdropBackgroundColour}\"></div>\n\n      <div [ngSwitch]=\"config?.animationType\">\n        <div class=\"spinner-circle\" *ngSwitchCase=\"ngxLoadingAnimationTypes.circle\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\"\n          [ngStyle]=\"{'border-top-color': config?.secondaryColour, 'border-right-color': config?.secondaryColour, 'border-bottom-color': config?.secondaryColour, 'border-left-color': config?.primaryColour}\">\n        </div>\n\n        <div *ngSwitchCase=\"ngxLoadingAnimationTypes.cubeGrid\" class=\"sk-cube-grid\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"sk-cube sk-cube1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube2\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube3\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube4\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube5\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube6\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube7\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube8\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"sk-cube sk-cube9\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n        </div>\n\n        <div class=\"spinner-sk-rotateplane\" *ngSwitchCase=\"ngxLoadingAnimationTypes.rotatingPlane\" [ngStyle]=\"{'background-color': config?.primaryColour}\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\"></div>\n\n        <div class=\"spinner-rectangle-bounce\" *ngSwitchCase=\"ngxLoadingAnimationTypes.rectangleBounce\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"rect1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"rect2\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"rect3\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"rect4\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"rect5\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n        </div>\n\n        <div class=\"spinner-wandering-cubes\" *ngSwitchCase=\"ngxLoadingAnimationTypes.wanderingCubes\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"cube1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"cube2\" [ngStyle]=\"{'background-color': config?.secondaryColour}\"></div>\n        </div>\n\n        <div class=\"spinner-double-bounce\" *ngSwitchCase=\"ngxLoadingAnimationTypes.doubleBounce\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"double-bounce1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"double-bounce2\" [ngStyle]=\"{'background-color': config?.secondaryColour}\"></div>\n        </div>\n\n        <div class=\"spinner-pulse\" *ngSwitchCase=\"ngxLoadingAnimationTypes.pulse\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n\n        <div class=\"spinner-chasing-dots\" *ngSwitchCase=\"ngxLoadingAnimationTypes.chasingDots\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"dot1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"dot2\" [ngStyle]=\"{'background-color': config?.secondaryColour}\"></div>\n        </div>\n\n        <div class=\"spinner-circle-swish\" *ngSwitchCase=\"ngxLoadingAnimationTypes.circleSwish\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\" [ngStyle]=\"{'color': config?.primaryColour}\"></div>\n\n        <div *ngSwitchCase=\"ngxLoadingAnimationTypes.none\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\"></div>\n\n        <div *ngSwitchDefault class=\"spinner-three-bounce\" [ngClass]=\"{'full-screen' : config?.fullScreenBackdrop == true}\">\n          <div class=\"bounce1\" [ngStyle]=\"{'background-color': config?.primaryColour}\"></div>\n          <div class=\"bounce2\" [ngStyle]=\"{'background-color': config?.secondaryColour}\"></div>\n          <div class=\"bounce3\" [ngStyle]=\"{'background-color': config?.tertiaryColour}\"></div>\n        </div>\n        \n        <ng-container *ngIf=\"template\">\n            <ng-container *ngTemplateOutlet=\"template\"></ng-container>\n        </ng-container>\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .backdrop {\n        z-index: 1999;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        background-color: rgba(0, 0, 0, 0.3);\n      }\n\n      /* Spinner Circle styles */\n      .spinner-circle,\n      .spinner-circle:after {\n          border-radius: 50%;\n          width: 10em;\n          height: 10em;\n      }\n\n      .spinner-circle {\n          font-size: 6px;\n          border-top: 1.1em solid rgba(255, 255, 255, 0.2);\n          border-right: 1.1em solid rgba(255, 255, 255, 0.2);\n          border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);\n          border-left: 1.1em solid #ffffff;\n          margin: auto;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n          -webkit-transform: translateZ(0);\n          -ms-transform: translateZ(0);\n          transform: translateZ(0);\n          -webkit-animation: load8 1.1s infinite linear;\n          animation: load8 1.1s infinite linear;\n      }\n      @-webkit-keyframes load8 {\n          0% {\n              -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n          }\n          100% {\n              -webkit-transform: rotate(360deg);\n              transform: rotate(360deg);\n          }\n      }\n      @keyframes load8 {\n          0% {\n              -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n          }\n          100% {\n              -webkit-transform: rotate(360deg);\n              transform: rotate(360deg);\n          }\n      }\n\n      /* Circle Swish styles */\n      .spinner-circle-swish {\n          font-size: 60px;\n          overflow: hidden;\n          width: 1em;\n          height: 1em;\n          z-index: 2000;\n          border-radius: 50%;\n          margin: auto;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n          -webkit-transform: translateZ(0);\n          -ms-transform: translateZ(0);\n          transform: translateZ(0);\n          -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;\n          animation: load6 1.7s infinite ease, round 1.7s infinite ease;\n        }\n        @-webkit-keyframes load6 {\n          0% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n          5%,\n          95% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n          10%,\n          59% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;\n          }\n          20% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;\n          }\n          38% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;\n          }\n          100% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n        }\n        @keyframes load6 {\n          0% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n          5%,\n          95% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n          10%,\n          59% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;\n          }\n          20% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;\n          }\n          38% {\n            box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em;\n          }\n          100% {\n            box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;\n          }\n        }\n        @-webkit-keyframes round {\n          0% {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n          }\n          100% {\n            -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n          }\n        }\n        @keyframes round {\n          0% {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n          }\n          100% {\n            -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n          }\n        }\n\n      /* Cube Grid styles */\n      .sk-cube-grid {\n          width: 40px;\n          height: 40px;\n\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n      }\n\n      .sk-cube-grid .sk-cube {\n          width: 33%;\n          height: 33%;\n          background-color: #333;\n          float: left;\n          -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n      }\n\n      .sk-cube-grid .sk-cube1 {\n          -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n      }\n\n      .sk-cube-grid .sk-cube2 {\n          -webkit-animation-delay: 0.3s;\n          animation-delay: 0.3s;\n      }\n\n      .sk-cube-grid .sk-cube3 {\n          -webkit-animation-delay: 0.4s;\n          animation-delay: 0.4s;\n      }\n\n      .sk-cube-grid .sk-cube4 {\n          -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n      }\n\n      .sk-cube-grid .sk-cube5 {\n          -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n      }\n\n      .sk-cube-grid .sk-cube6 {\n          -webkit-animation-delay: 0.3s;\n          animation-delay: 0.3s;\n      }\n\n      .sk-cube-grid .sk-cube7 {\n          -webkit-animation-delay: 0s;\n          animation-delay: 0s;\n      }\n\n      .sk-cube-grid .sk-cube8 {\n          -webkit-animation-delay: 0.1s;\n          animation-delay: 0.1s;\n      }\n\n      .sk-cube-grid .sk-cube9 {\n          -webkit-animation-delay: 0.2s;\n          animation-delay: 0.2s;\n      }\n\n      @-webkit-keyframes sk-cubeGridScaleDelay {\n          0%, 70%, 100% {\n              -webkit-transform: scale3D(1, 1, 1);\n              transform: scale3D(1, 1, 1);\n          } 35% {\n              -webkit-transform: scale3D(0, 0, 1);\n              transform: scale3D(0, 0, 1);\n          }\n      }\n\n      @keyframes sk-cubeGridScaleDelay {\n          0%, 70%, 100% {\n              -webkit-transform: scale3D(1, 1, 1);\n              transform: scale3D(1, 1, 1);\n          } 35% {\n              -webkit-transform: scale3D(0, 0, 1);\n              transform: scale3D(0, 0, 1);\n          }\n      }\n\n      /* Double Bounce styles */\n      .spinner-double-bounce {\n          width: 40px;\n          height: 40px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n      }\n\n      .double-bounce1, .double-bounce2 {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n          background-color: #333;\n          opacity: 0.6;\n          position: absolute;\n          top: 0;\n          left: 0;\n          -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n          animation: sk-bounce 2.0s infinite ease-in-out;\n      }\n\n      .double-bounce2 {\n          -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n      }\n\n      @-webkit-keyframes sk-bounce {\n          0%, 100% { -webkit-transform: scale(0.0) }\n          50% { -webkit-transform: scale(1.0) }\n      }\n\n      @keyframes sk-bounce {\n          0%, 100% {\n            transform: scale(0.0);\n            -webkit-transform: scale(0.0);\n          } 50% {\n            transform: scale(1.0);\n            -webkit-transform: scale(1.0);\n          }\n      }\n\n      /* Pulse styles */\n      .spinner-pulse {\n          width: 40px;\n          height: 40px;\n          background-color: #333;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n          border-radius: 100%;\n          -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;\n          animation: sk-scaleout 1.0s infinite ease-in-out;\n      }\n\n      @-webkit-keyframes sk-scaleout {\n          0% { -webkit-transform: scale(0) }\n          100% {\n            -webkit-transform: scale(1.0);\n            opacity: 0;\n          }\n      }\n\n      @keyframes sk-scaleout {\n          0% {\n            -webkit-transform: scale(0);\n            transform: scale(0);\n          } 100% {\n            -webkit-transform: scale(1.0);\n            transform: scale(1.0);\n            opacity: 0;\n          }\n      }\n\n      /* Three Bounce styles */\n      .spinner-three-bounce {\n          width: 70px;\n          text-align: center;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          height: 20px;\n          margin: auto;\n          z-index: 2000;\n      }\n\n      .spinner-three-bounce > div {\n          width: 18px;\n          height: 18px;\n          background-color: #ffffff;\n\n          border-radius: 100%;\n          display: inline-block;\n          -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n          animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n      }\n\n      .spinner-three-bounce .bounce1 {\n          -webkit-animation-delay: -0.32s;\n          animation-delay: -0.32s;\n      }\n\n      .spinner-three-bounce .bounce2 {\n          -webkit-animation-delay: -0.16s;\n          animation-delay: -0.16s;\n      }\n\n      @-webkit-keyframes sk-bouncedelay {\n          0%, 80%, 100% { -webkit-transform: scale(0) }\n          40% { -webkit-transform: scale(1.0) }\n      }\n\n      @keyframes sk-bouncedelay {\n          0%, 80%, 100% {\n              -webkit-transform: scale(0);\n              transform: scale(0);\n          } 40% {\n              -webkit-transform: scale(1.0);\n              transform: scale(1.0);\n          }\n      }\n\n      /* Rotate Plane styles */\n      .spinner-sk-rotateplane {\n          width: 40px;\n          height: 40px;\n          background-color: #ffffff;\n          text-align: center;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n          -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;\n          animation: sk-rotateplane 1.2s infinite ease-in-out;\n      }\n\n      @-webkit-keyframes sk-rotateplane {\n          0% { -webkit-transform: perspective(120px) }\n          50% { -webkit-transform: perspective(120px) rotateY(180deg) }\n          100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }\n      }\n\n      @keyframes sk-rotateplane {\n          0% {\n              transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n              -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)\n          } 50% {\n              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n              -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)\n          } 100% {\n              transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n              -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n          }\n      }\n\n      /* Rectangle Bounce styles*/\n      .spinner-rectangle-bounce {\n          width: 50px;\n          height: 40px;\n          font-size: 10px;\n          text-align: center;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n      }\n\n      .spinner-rectangle-bounce > div {\n          background-color: #ffffff;\n          height: 100%;\n          width: 6px;\n          display: inline-block;\n          -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n          animation: sk-stretchdelay 1.2s infinite ease-in-out;\n      }\n\n      .spinner-rectangle-bounce .rect2 {\n          -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s;\n      }\n\n      .spinner-rectangle-bounce .rect3 {\n          -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n      }\n\n      .spinner-rectangle-bounce .rect4 {\n          -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n      }\n\n      .spinner-rectangle-bounce .rect5 {\n          -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s;\n      }\n\n      @-webkit-keyframes sk-stretchdelay {\n          0%, 40%, 100% { -webkit-transform: scaleY(0.4) }\n          20% { -webkit-transform: scaleY(1.0) }\n      }\n\n      @keyframes sk-stretchdelay {\n          0%, 40%, 100% {\n              transform: scaleY(0.4);\n              -webkit-transform: scaleY(0.4);\n          }  20% {\n              transform: scaleY(1.0);\n              -webkit-transform: scaleY(1.0);\n          }\n      }\n\n      /* Wandering Cubes styles */\n      .spinner-wandering-cubes {\n          width: 60px;\n          height: 58px;\n          font-size: 10px;\n          text-align: center;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n      }\n\n      .cube1, .cube2 {\n          background-color: #ffffff;\n          width: 15px;\n          height: 15px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;\n          animation: sk-cubemove 1.8s infinite ease-in-out;\n      }\n\n      .cube2 {\n          -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s;\n      }\n\n      @-webkit-keyframes sk-cubemove {\n          25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }\n          50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }\n          75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }\n          100% { -webkit-transform: rotate(-360deg) }\n      }\n\n      @keyframes sk-cubemove {\n          25% {\n              transform: translateX(42px) rotate(-90deg) scale(0.5);\n              -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n          } 50% {\n              transform: translateX(42px) translateY(42px) rotate(-179deg);\n              -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n          } 50.1% {\n              transform: translateX(42px) translateY(42px) rotate(-180deg);\n              -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n          } 75% {\n              transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n              -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n          } 100% {\n              transform: rotate(-360deg);\n              -webkit-transform: rotate(-360deg);\n          }\n      }\n\n      /* Circle styles */\n      .sk-circle {\n          width: 40px;\n          height: 40px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n        }\n        .sk-circle .sk-child {\n          width: 100%;\n          height: 100%;\n          position: absolute;\n          left: 0;\n          top: 0;\n        }\n        .sk-circle .sk-child:before {\n          content: '';\n          display: block;\n          margin: 0 auto;\n          width: 15%;\n          height: 15%;\n          background-color: #333;\n          border-radius: 100%;\n          -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\n                  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;\n        }\n        .sk-circle .sk-circle2 {\n          -webkit-transform: rotate(30deg);\n              -ms-transform: rotate(30deg);\n                  transform: rotate(30deg); }\n        .sk-circle .sk-circle3 {\n          -webkit-transform: rotate(60deg);\n              -ms-transform: rotate(60deg);\n                  transform: rotate(60deg); }\n        .sk-circle .sk-circle4 {\n          -webkit-transform: rotate(90deg);\n              -ms-transform: rotate(90deg);\n                  transform: rotate(90deg); }\n        .sk-circle .sk-circle5 {\n          -webkit-transform: rotate(120deg);\n              -ms-transform: rotate(120deg);\n                  transform: rotate(120deg); }\n        .sk-circle .sk-circle6 {\n          -webkit-transform: rotate(150deg);\n              -ms-transform: rotate(150deg);\n                  transform: rotate(150deg); }\n        .sk-circle .sk-circle7 {\n          -webkit-transform: rotate(180deg);\n              -ms-transform: rotate(180deg);\n                  transform: rotate(180deg); }\n        .sk-circle .sk-circle8 {\n          -webkit-transform: rotate(210deg);\n              -ms-transform: rotate(210deg);\n                  transform: rotate(210deg); }\n        .sk-circle .sk-circle9 {\n          -webkit-transform: rotate(240deg);\n              -ms-transform: rotate(240deg);\n                  transform: rotate(240deg); }\n        .sk-circle .sk-circle10 {\n          -webkit-transform: rotate(270deg);\n              -ms-transform: rotate(270deg);\n                  transform: rotate(270deg); }\n        .sk-circle .sk-circle11 {\n          -webkit-transform: rotate(300deg);\n              -ms-transform: rotate(300deg);\n                  transform: rotate(300deg); }\n        .sk-circle .sk-circle12 {\n          -webkit-transform: rotate(330deg);\n              -ms-transform: rotate(330deg);\n                  transform: rotate(330deg); }\n        .sk-circle .sk-circle2:before {\n          -webkit-animation-delay: -1.1s;\n                  animation-delay: -1.1s; }\n        .sk-circle .sk-circle3:before {\n          -webkit-animation-delay: -1s;\n                  animation-delay: -1s; }\n        .sk-circle .sk-circle4:before {\n          -webkit-animation-delay: -0.9s;\n                  animation-delay: -0.9s; }\n        .sk-circle .sk-circle5:before {\n          -webkit-animation-delay: -0.8s;\n                  animation-delay: -0.8s; }\n        .sk-circle .sk-circle6:before {\n          -webkit-animation-delay: -0.7s;\n                  animation-delay: -0.7s; }\n        .sk-circle .sk-circle7:before {\n          -webkit-animation-delay: -0.6s;\n                  animation-delay: -0.6s; }\n        .sk-circle .sk-circle8:before {\n          -webkit-animation-delay: -0.5s;\n                  animation-delay: -0.5s; }\n        .sk-circle .sk-circle9:before {\n          -webkit-animation-delay: -0.4s;\n                  animation-delay: -0.4s; }\n        .sk-circle .sk-circle10:before {\n          -webkit-animation-delay: -0.3s;\n                  animation-delay: -0.3s; }\n        .sk-circle .sk-circle11:before {\n          -webkit-animation-delay: -0.2s;\n                  animation-delay: -0.2s; }\n        .sk-circle .sk-circle12:before {\n          -webkit-animation-delay: -0.1s;\n                  animation-delay: -0.1s; }\n\n        @-webkit-keyframes sk-circleBounceDelay {\n          0%, 80%, 100% {\n            -webkit-transform: scale(0);\n                    transform: scale(0);\n          } 40% {\n            -webkit-transform: scale(1);\n                    transform: scale(1);\n          }\n        }\n\n        @keyframes sk-circleBounceDelay {\n          0%, 80%, 100% {\n            -webkit-transform: scale(0);\n                    transform: scale(0);\n          } 40% {\n            -webkit-transform: scale(1);\n                    transform: scale(1);\n          }\n        }\n\n        /* Chasing Dots styles */\n        .spinner-chasing-dots {\n          width: 40px;\n          height: 40px;\n          position: absolute;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          margin: auto;\n          z-index: 2000;\n          text-align: center;\n          -webkit-animation: sk-rotate 2.0s infinite linear;\n          animation: sk-rotate 2.0s infinite linear;\n        }\n\n        .dot1, .dot2 {\n          width: 60%;\n          height: 60%;\n          display: inline-block;\n          position: absolute;\n          top: 0;\n          background-color: #333;\n          border-radius: 100%;\n          -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n          animation: sk-bounce 2.0s infinite ease-in-out;\n        }\n\n        .dot2 {\n          top: auto;\n          bottom: 0;\n          -webkit-animation-delay: -1.0s;\n          animation-delay: -1.0s;\n        }\n\n        @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}\n        @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}\n\n        @-webkit-keyframes sk-bounce {\n          0%, 100% { -webkit-transform: scale(0.0) }\n          50% { -webkit-transform: scale(1.0) }\n        }\n\n        @keyframes sk-bounce {\n          0%, 100% {\n            transform: scale(0.0);\n            -webkit-transform: scale(0.0);\n          } 50% {\n            transform: scale(1.0);\n            -webkit-transform: scale(1.0);\n          }\n        }\n\n      .full-screen {\n          position: fixed;\n          position: -ms-page;\n      }\n    "
                    ]
                },] },
    ];
    NgxLoadingComponent.ctorParameters = function () { return [
        { type: NgxLoadingService },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }
    ]; };
    NgxLoadingComponent.propDecorators = {
        show: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        template: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
    };
    return NgxLoadingComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxLoadingModule = /** @class */ (function () {
    function NgxLoadingModule() {
    }
    /**
     * @param {?} loadingConfig
     * @return {?}
     */
    NgxLoadingModule.forRoot = /**
     * @param {?} loadingConfig
     * @return {?}
     */
    function (loadingConfig) {
        return {
            ngModule: NgxLoadingModule,
            providers: [{ provide: 'loadingConfig', useValue: loadingConfig }]
        };
    };
    NgxLoadingModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                    declarations: [NgxLoadingComponent],
                    exports: [NgxLoadingComponent]
                },] },
    ];
    return NgxLoadingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWxvYWRpbmcuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1sb2FkaW5nL2xpYi9uZ3gtbG9hZGluZy1jb25maWcudHMiLCJuZzovL25neC1sb2FkaW5nL2xpYi9uZ3gtbG9hZGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbG9hZGluZy9saWIvbmd4LWxvYWRpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbG9hZGluZy9saWIvbmd4LWxvYWRpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSU5neExvYWRpbmdDb25maWcge1xyXG4gICAgYmFja2Ryb3BCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XHJcbiAgICBiYWNrZHJvcEJhY2tncm91bmRDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICBmdWxsU2NyZWVuQmFja2Ryb3A/OiBib29sZWFuO1xyXG4gICAgYW5pbWF0aW9uVHlwZT86IHN0cmluZztcclxuICAgIHByaW1hcnlDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICBzZWNvbmRhcnlDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICB0ZXJ0aWFyeUNvbG91cj86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hMb2FkaW5nQ29uZmlnIGltcGxlbWVudHMgSU5neExvYWRpbmdDb25maWcge1xyXG4gICAgYmFja2Ryb3BCb3JkZXJSYWRpdXM/OiBzdHJpbmc7XHJcbiAgICBiYWNrZHJvcEJhY2tncm91bmRDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICBmdWxsU2NyZWVuQmFja2Ryb3A/OiBib29sZWFuO1xyXG4gICAgYW5pbWF0aW9uVHlwZT86IHN0cmluZztcclxuICAgIHByaW1hcnlDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICBzZWNvbmRhcnlDb2xvdXI/OiBzdHJpbmc7XHJcbiAgICB0ZXJ0aWFyeUNvbG91cj86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZyB8IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBJTmd4TG9hZGluZ0NvbmZpZyA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5iYWNrZHJvcEJvcmRlclJhZGl1cyA9IGNvbmZpZy5iYWNrZHJvcEJvcmRlclJhZGl1cztcclxuICAgICAgICB0aGlzLmJhY2tkcm9wQmFja2dyb3VuZENvbG91ciA9IGNvbmZpZy5iYWNrZHJvcEJhY2tncm91bmRDb2xvdXI7XHJcbiAgICAgICAgdGhpcy5mdWxsU2NyZWVuQmFja2Ryb3AgPSBjb25maWcuZnVsbFNjcmVlbkJhY2tkcm9wO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uVHlwZSA9IGNvbmZpZy5hbmltYXRpb25UeXBlO1xyXG4gICAgICAgIHRoaXMucHJpbWFyeUNvbG91ciA9IGNvbmZpZy5wcmltYXJ5Q29sb3VyO1xyXG4gICAgICAgIHRoaXMuc2Vjb25kYXJ5Q29sb3VyID0gY29uZmlnLnNlY29uZGFyeUNvbG91cjtcclxuICAgICAgICB0aGlzLnRlcnRpYXJ5Q29sb3VyID0gY29uZmlnLnRlcnRpYXJ5Q29sb3VyO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgbmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzID0ge1xyXG4gICAgY2hhc2luZ0RvdHM6ICdjaGFzaW5nLWRvdHMnLFxyXG4gICAgY2lyY2xlOiAnc2stY2lyY2xlJyxcclxuICAgIGNpcmNsZVN3aXNoOiAnY2lyY2xlU3dpc2gnLFxyXG4gICAgY3ViZUdyaWQ6ICdzay1jdWJlLWdyaWQnLFxyXG4gICAgZG91YmxlQm91bmNlOiAnZG91YmxlLWJvdW5jZScsXHJcbiAgICBub25lOiAnbm9uZScsXHJcbiAgICBwdWxzZTogJ3B1bHNlJyxcclxuICAgIHJlY3RhbmdsZUJvdW5jZTogJ3JlY3RhbmdsZS1ib3VuY2UnLFxyXG4gICAgcm90YXRpbmdQbGFuZTogJ3JvdGF0aW5nLXBsYW5lJyxcclxuICAgIHRocmVlQm91bmNlOiAndGhyZWUtYm91bmNlJyxcclxuICAgIHdhbmRlcmluZ0N1YmVzOiAnd2FuZGVyaW5nLWN1YmVzJ1xyXG59O1xyXG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElOZ3hMb2FkaW5nQ29uZmlnLCBOZ3hMb2FkaW5nQ29uZmlnIH0gZnJvbSAnLi9uZ3gtbG9hZGluZy1jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TG9hZGluZ1NlcnZpY2Uge1xyXG4gIHB1YmxpYyBsb2FkaW5nQ29uZmlnOiBJTmd4TG9hZGluZ0NvbmZpZztcclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdCgnbG9hZGluZ0NvbmZpZycpIHByaXZhdGUgY29uZmlnOiBJTmd4TG9hZGluZ0NvbmZpZykge1xyXG4gICAgdGhpcy5sb2FkaW5nQ29uZmlnID0gdGhpcy5jb25maWcgfHwgbmV3IE5neExvYWRpbmdDb25maWcoKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzLCBJTmd4TG9hZGluZ0NvbmZpZywgTmd4TG9hZGluZ0NvbmZpZyB9IGZyb20gJy4vbmd4LWxvYWRpbmctY29uZmlnJztcclxuaW1wb3J0IHsgTmd4TG9hZGluZ1NlcnZpY2UgfSBmcm9tICcuL25neC1sb2FkaW5nLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1sb2FkaW5nJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFja2Ryb3BcIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJyA6IGNvbmZpZz8uZnVsbFNjcmVlbkJhY2tkcm9wID09IHRydWV9XCIgW25nU3R5bGVdPVwieydib3JkZXItcmFkaXVzJzogY29uZmlnPy5iYWNrZHJvcEJvcmRlclJhZGl1cywgJ2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LmJhY2tkcm9wQmFja2dyb3VuZENvbG91cn1cIj48L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgW25nU3dpdGNoXT1cImNvbmZpZz8uYW5pbWF0aW9uVHlwZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLWNpcmNsZVwiICpuZ1N3aXRjaENhc2U9XCJuZ3hMb2FkaW5nQW5pbWF0aW9uVHlwZXMuY2lyY2xlXCIgW25nQ2xhc3NdPVwieydmdWxsLXNjcmVlbicgOiBjb25maWc/LmZ1bGxTY3JlZW5CYWNrZHJvcCA9PSB0cnVlfVwiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJ7J2JvcmRlci10b3AtY29sb3InOiBjb25maWc/LnNlY29uZGFyeUNvbG91ciwgJ2JvcmRlci1yaWdodC1jb2xvcic6IGNvbmZpZz8uc2Vjb25kYXJ5Q29sb3VyLCAnYm9yZGVyLWJvdHRvbS1jb2xvcic6IGNvbmZpZz8uc2Vjb25kYXJ5Q29sb3VyLCAnYm9yZGVyLWxlZnQtY29sb3InOiBjb25maWc/LnByaW1hcnlDb2xvdXJ9XCI+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIm5neExvYWRpbmdBbmltYXRpb25UeXBlcy5jdWJlR3JpZFwiIGNsYXNzPVwic2stY3ViZS1ncmlkXCIgW25nQ2xhc3NdPVwieydmdWxsLXNjcmVlbicgOiBjb25maWc/LmZ1bGxTY3JlZW5CYWNrZHJvcCA9PSB0cnVlfVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNrLWN1YmUgc2stY3ViZTFcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnByaW1hcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2stY3ViZSBzay1jdWJlMlwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzay1jdWJlIHNrLWN1YmUzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29uZmlnPy5wcmltYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNrLWN1YmUgc2stY3ViZTRcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnByaW1hcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2stY3ViZSBzay1jdWJlNVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzay1jdWJlIHNrLWN1YmU2XCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29uZmlnPy5wcmltYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNrLWN1YmUgc2stY3ViZTdcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnByaW1hcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2stY3ViZSBzay1jdWJlOFwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzay1jdWJlIHNrLWN1YmU5XCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29uZmlnPy5wcmltYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1zay1yb3RhdGVwbGFuZVwiICpuZ1N3aXRjaENhc2U9XCJuZ3hMb2FkaW5nQW5pbWF0aW9uVHlwZXMucm90YXRpbmdQbGFuZVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJyA6IGNvbmZpZz8uZnVsbFNjcmVlbkJhY2tkcm9wID09IHRydWV9XCI+PC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyLXJlY3RhbmdsZS1ib3VuY2VcIiAqbmdTd2l0Y2hDYXNlPVwibmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzLnJlY3RhbmdsZUJvdW5jZVwiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nIDogY29uZmlnPy5mdWxsU2NyZWVuQmFja2Ryb3AgPT0gdHJ1ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN0MVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN0MlwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN0M1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN0NFwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWN0NVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItd2FuZGVyaW5nLWN1YmVzXCIgKm5nU3dpdGNoQ2FzZT1cIm5neExvYWRpbmdBbmltYXRpb25UeXBlcy53YW5kZXJpbmdDdWJlc1wiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nIDogY29uZmlnPy5mdWxsU2NyZWVuQmFja2Ryb3AgPT0gdHJ1ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWJlMVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjdWJlMlwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8uc2Vjb25kYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1kb3VibGUtYm91bmNlXCIgKm5nU3dpdGNoQ2FzZT1cIm5neExvYWRpbmdBbmltYXRpb25UeXBlcy5kb3VibGVCb3VuY2VcIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJyA6IGNvbmZpZz8uZnVsbFNjcmVlbkJhY2tkcm9wID09IHRydWV9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZG91YmxlLWJvdW5jZTFcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnByaW1hcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZG91YmxlLWJvdW5jZTJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnNlY29uZGFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItcHVsc2VcIiAqbmdTd2l0Y2hDYXNlPVwibmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzLnB1bHNlXCIgW25nQ2xhc3NdPVwieydmdWxsLXNjcmVlbicgOiBjb25maWc/LmZ1bGxTY3JlZW5CYWNrZHJvcCA9PSB0cnVlfVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItY2hhc2luZy1kb3RzXCIgKm5nU3dpdGNoQ2FzZT1cIm5neExvYWRpbmdBbmltYXRpb25UeXBlcy5jaGFzaW5nRG90c1wiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nIDogY29uZmlnPy5mdWxsU2NyZWVuQmFja2Ryb3AgPT0gdHJ1ZX1cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb3QxXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29uZmlnPy5wcmltYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRvdDJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb25maWc/LnNlY29uZGFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXItY2lyY2xlLXN3aXNoXCIgKm5nU3dpdGNoQ2FzZT1cIm5neExvYWRpbmdBbmltYXRpb25UeXBlcy5jaXJjbGVTd2lzaFwiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nIDogY29uZmlnPy5mdWxsU2NyZWVuQmFja2Ryb3AgPT0gdHJ1ZX1cIiBbbmdTdHlsZV09XCJ7J2NvbG9yJzogY29uZmlnPy5wcmltYXJ5Q29sb3VyfVwiPjwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJuZ3hMb2FkaW5nQW5pbWF0aW9uVHlwZXMubm9uZVwiIFtuZ0NsYXNzXT1cInsnZnVsbC1zY3JlZW4nIDogY29uZmlnPy5mdWxsU2NyZWVuQmFja2Ryb3AgPT0gdHJ1ZX1cIj48L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IGNsYXNzPVwic3Bpbm5lci10aHJlZS1ib3VuY2VcIiBbbmdDbGFzc109XCJ7J2Z1bGwtc2NyZWVuJyA6IGNvbmZpZz8uZnVsbFNjcmVlbkJhY2tkcm9wID09IHRydWV9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlMVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8ucHJpbWFyeUNvbG91cn1cIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2UyXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29uZmlnPy5zZWNvbmRhcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlM1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbmZpZz8udGVydGlhcnlDb2xvdXJ9XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgICBzdHlsZXM6IFtcclxuICAgICAgICBgXHJcbiAgICAgIC5iYWNrZHJvcCB7XHJcbiAgICAgICAgei1pbmRleDogMTk5OTtcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyogU3Bpbm5lciBDaXJjbGUgc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLWNpcmNsZSxcclxuICAgICAgLnNwaW5uZXItY2lyY2xlOmFmdGVyIHtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgIHdpZHRoOiAxMGVtO1xyXG4gICAgICAgICAgaGVpZ2h0OiAxMGVtO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3Bpbm5lci1jaXJjbGUge1xyXG4gICAgICAgICAgZm9udC1zaXplOiA2cHg7XHJcbiAgICAgICAgICBib3JkZXItdG9wOiAxLjFlbSBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbiAgICAgICAgICBib3JkZXItcmlnaHQ6IDEuMWVtIHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDEuMWVtIHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICAgICAgICAgIGJvcmRlci1sZWZ0OiAxLjFlbSBzb2xpZCAjZmZmZmZmO1xyXG4gICAgICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICAgei1pbmRleDogMjAwMDtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xyXG4gICAgICAgICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcclxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkOCAxLjFzIGluZmluaXRlIGxpbmVhcjtcclxuICAgICAgICAgIGFuaW1hdGlvbjogbG9hZDggMS4xcyBpbmZpbml0ZSBsaW5lYXI7XHJcbiAgICAgIH1cclxuICAgICAgQC13ZWJraXQta2V5ZnJhbWVzIGxvYWQ4IHtcclxuICAgICAgICAgIDAlIHtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgMTAwJSB7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgQGtleWZyYW1lcyBsb2FkOCB7XHJcbiAgICAgICAgICAwJSB7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDEwMCUge1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBDaXJjbGUgU3dpc2ggc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLWNpcmNsZS1zd2lzaCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgd2lkdGg6IDFlbTtcclxuICAgICAgICAgIGhlaWdodDogMWVtO1xyXG4gICAgICAgICAgei1pbmRleDogMjAwMDtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcclxuICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZDYgMS43cyBpbmZpbml0ZSBlYXNlLCByb3VuZCAxLjdzIGluZmluaXRlIGVhc2U7XHJcbiAgICAgICAgICBhbmltYXRpb246IGxvYWQ2IDEuN3MgaW5maW5pdGUgZWFzZSwgcm91bmQgMS43cyBpbmZpbml0ZSBlYXNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgbG9hZDYge1xyXG4gICAgICAgICAgMCUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIDAgLTAuODNlbSAwIC0wLjQyZW0sIDAgLTAuODNlbSAwIC0wLjQ0ZW0sIDAgLTAuODNlbSAwIC0wLjQ2ZW0sIDAgLTAuODNlbSAwIC0wLjQ3N2VtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgNSUsXHJcbiAgICAgICAgICA5NSUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIDAgLTAuODNlbSAwIC0wLjQyZW0sIDAgLTAuODNlbSAwIC0wLjQ0ZW0sIDAgLTAuODNlbSAwIC0wLjQ2ZW0sIDAgLTAuODNlbSAwIC0wLjQ3N2VtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgMTAlLFxyXG4gICAgICAgICAgNTklIHtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAtMC44M2VtIDAgLTAuNGVtLCAtMC4wODdlbSAtMC44MjVlbSAwIC0wLjQyZW0sIC0wLjE3M2VtIC0wLjgxMmVtIDAgLTAuNDRlbSwgLTAuMjU2ZW0gLTAuNzg5ZW0gMCAtMC40NmVtLCAtMC4yOTdlbSAtMC43NzVlbSAwIC0wLjQ3N2VtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgMjAlIHtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAtMC44M2VtIDAgLTAuNGVtLCAtMC4zMzhlbSAtMC43NThlbSAwIC0wLjQyZW0sIC0wLjU1NWVtIC0wLjYxN2VtIDAgLTAuNDRlbSwgLTAuNjcxZW0gLTAuNDg4ZW0gMCAtMC40NmVtLCAtMC43NDllbSAtMC4zNGVtIDAgLTAuNDc3ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAzOCUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIC0wLjM3N2VtIC0wLjc0ZW0gMCAtMC40MmVtLCAtMC42NDVlbSAtMC41MjJlbSAwIC0wLjQ0ZW0sIC0wLjc3NWVtIC0wLjI5N2VtIDAgLTAuNDZlbSwgLTAuODJlbSAtMC4wOWVtIDAgLTAuNDc3ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAxMDAlIHtcclxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAtMC44M2VtIDAgLTAuNGVtLCAwIC0wLjgzZW0gMCAtMC40MmVtLCAwIC0wLjgzZW0gMCAtMC40NGVtLCAwIC0wLjgzZW0gMCAtMC40NmVtLCAwIC0wLjgzZW0gMCAtMC40NzdlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQGtleWZyYW1lcyBsb2FkNiB7XHJcbiAgICAgICAgICAwJSB7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgLTAuODNlbSAwIC0wLjRlbSwgMCAtMC44M2VtIDAgLTAuNDJlbSwgMCAtMC44M2VtIDAgLTAuNDRlbSwgMCAtMC44M2VtIDAgLTAuNDZlbSwgMCAtMC44M2VtIDAgLTAuNDc3ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICA1JSxcclxuICAgICAgICAgIDk1JSB7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgLTAuODNlbSAwIC0wLjRlbSwgMCAtMC44M2VtIDAgLTAuNDJlbSwgMCAtMC44M2VtIDAgLTAuNDRlbSwgMCAtMC44M2VtIDAgLTAuNDZlbSwgMCAtMC44M2VtIDAgLTAuNDc3ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAxMCUsXHJcbiAgICAgICAgICA1OSUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIC0wLjA4N2VtIC0wLjgyNWVtIDAgLTAuNDJlbSwgLTAuMTczZW0gLTAuODEyZW0gMCAtMC40NGVtLCAtMC4yNTZlbSAtMC43ODllbSAwIC0wLjQ2ZW0sIC0wLjI5N2VtIC0wLjc3NWVtIDAgLTAuNDc3ZW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAyMCUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIC0wLjMzOGVtIC0wLjc1OGVtIDAgLTAuNDJlbSwgLTAuNTU1ZW0gLTAuNjE3ZW0gMCAtMC40NGVtLCAtMC42NzFlbSAtMC40ODhlbSAwIC0wLjQ2ZW0sIC0wLjc0OWVtIC0wLjM0ZW0gMCAtMC40NzdlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDM4JSB7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgLTAuODNlbSAwIC0wLjRlbSwgLTAuMzc3ZW0gLTAuNzRlbSAwIC0wLjQyZW0sIC0wLjY0NWVtIC0wLjUyMmVtIDAgLTAuNDRlbSwgLTAuNzc1ZW0gLTAuMjk3ZW0gMCAtMC40NmVtLCAtMC44MmVtIC0wLjA5ZW0gMCAtMC40NzdlbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDEwMCUge1xyXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwIC0wLjgzZW0gMCAtMC40ZW0sIDAgLTAuODNlbSAwIC0wLjQyZW0sIDAgLTAuODNlbSAwIC0wLjQ0ZW0sIDAgLTAuODNlbSAwIC0wLjQ2ZW0sIDAgLTAuODNlbSAwIC0wLjQ3N2VtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgcm91bmQge1xyXG4gICAgICAgICAgMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDEwMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEBrZXlmcmFtZXMgcm91bmQge1xyXG4gICAgICAgICAgMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIDEwMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLyogQ3ViZSBHcmlkIHN0eWxlcyAqL1xyXG4gICAgICAuc2stY3ViZS1ncmlkIHtcclxuICAgICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG5cclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zay1jdWJlLWdyaWQgLnNrLWN1YmUge1xyXG4gICAgICAgICAgd2lkdGg6IDMzJTtcclxuICAgICAgICAgIGhlaWdodDogMzMlO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWN1YmVHcmlkU2NhbGVEZWxheSAxLjNzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgYW5pbWF0aW9uOiBzay1jdWJlR3JpZFNjYWxlRGVsYXkgMS4zcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNrLWN1YmUtZ3JpZCAuc2stY3ViZTEge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zay1jdWJlLWdyaWQgLnNrLWN1YmUyIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjNzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc2stY3ViZS1ncmlkIC5zay1jdWJlMyB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC40cztcclxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC40cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNrLWN1YmUtZ3JpZCAuc2stY3ViZTQge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zay1jdWJlLWdyaWQgLnNrLWN1YmU1IHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc2stY3ViZS1ncmlkIC5zay1jdWJlNiB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogMC4zcztcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNrLWN1YmUtZ3JpZCAuc2stY3ViZTcge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDBzO1xyXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwcztcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNrLWN1YmUtZ3JpZCAuc2stY3ViZTgge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zay1jdWJlLWdyaWQgLnNrLWN1YmU5IHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgICAgIH0gMzUlIHtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBrZXlmcmFtZXMgc2stY3ViZUdyaWRTY2FsZURlbGF5IHtcclxuICAgICAgICAgIDAlLCA3MCUsIDEwMCUge1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZTNEKDEsIDEsIDEpO1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUzRCgxLCAxLCAxKTtcclxuICAgICAgICAgIH0gMzUlIHtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUzRCgwLCAwLCAxKTtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlM0QoMCwgMCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qIERvdWJsZSBCb3VuY2Ugc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLWRvdWJsZS1ib3VuY2Uge1xyXG4gICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgICBib3R0b206IDA7XHJcbiAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICB6LWluZGV4OiAyMDAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuZG91YmxlLWJvdW5jZTEsIC5kb3VibGUtYm91bmNlMiB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjY7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgICAgYW5pbWF0aW9uOiBzay1ib3VuY2UgMi4wcyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmRvdWJsZS1ib3VuY2UyIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAgICAgMCUsIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKSB9XHJcbiAgICAgICAgICA1MCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKSB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBrZXlmcmFtZXMgc2stYm91bmNlIHtcclxuICAgICAgICAgIDAlLCAxMDAlIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjApO1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAgIH0gNTAlIHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLyogUHVsc2Ugc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLXB1bHNlIHtcclxuICAgICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXNjYWxlb3V0IDEuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICBhbmltYXRpb246IHNrLXNjYWxlb3V0IDEuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1zY2FsZW91dCB7XHJcbiAgICAgICAgICAwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKSB9XHJcbiAgICAgICAgICAxMDAlIHtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBrZXlmcmFtZXMgc2stc2NhbGVvdXQge1xyXG4gICAgICAgICAgMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgICB9IDEwMCUge1xyXG4gICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBUaHJlZSBCb3VuY2Ugc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLXRocmVlLWJvdW5jZSB7XHJcbiAgICAgICAgICB3aWR0aDogNzBweDtcclxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIGhlaWdodDogMjBweDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zcGlubmVyLXRocmVlLWJvdW5jZSA+IGRpdiB7XHJcbiAgICAgICAgICB3aWR0aDogMThweDtcclxuICAgICAgICAgIGhlaWdodDogMThweDtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcblxyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzay1ib3VuY2VkZWxheSAxLjRzIGluZmluaXRlIGVhc2UtaW4tb3V0IGJvdGg7XHJcbiAgICAgICAgICBhbmltYXRpb246IHNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNwaW5uZXItdGhyZWUtYm91bmNlIC5ib3VuY2UxIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjMycztcclxuICAgICAgfVxyXG5cclxuICAgICAgLnNwaW5uZXItdGhyZWUtYm91bmNlIC5ib3VuY2UyIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjE2cztcclxuICAgICAgfVxyXG5cclxuICAgICAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcclxuICAgICAgICAgIDAlLCA4MCUsIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCkgfVxyXG4gICAgICAgICAgNDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCkgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcclxuICAgICAgICAgIDAlLCA4MCUsIDEwMCUge1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgICAgfSA0MCUge1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLjApO1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLyogUm90YXRlIFBsYW5lIHN0eWxlcyAqL1xyXG4gICAgICAuc3Bpbm5lci1zay1yb3RhdGVwbGFuZSB7XHJcbiAgICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICAgICBib3R0b206IDA7XHJcbiAgICAgICAgICBtYXJnaW46IGF1dG87XHJcbiAgICAgICAgICB6LWluZGV4OiAyMDAwO1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IHNrLXJvdGF0ZXBsYW5lIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICBhbmltYXRpb246IHNrLXJvdGF0ZXBsYW5lIDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1yb3RhdGVwbGFuZSB7XHJcbiAgICAgICAgICAwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgfVxyXG4gICAgICAgICAgNTAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVZKDE4MGRlZykgfVxyXG4gICAgICAgICAgMTAwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWSgxODBkZWcpICByb3RhdGVYKDE4MGRlZykgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBAa2V5ZnJhbWVzIHNrLXJvdGF0ZXBsYW5lIHtcclxuICAgICAgICAgIDAlIHtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZyk7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKDBkZWcpIHJvdGF0ZVkoMGRlZylcclxuICAgICAgICAgIH0gNTAlIHtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHBlcnNwZWN0aXZlKDEyMHB4KSByb3RhdGVYKC0xODAuMWRlZykgcm90YXRlWSgwZGVnKTtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MC4xZGVnKSByb3RhdGVZKDBkZWcpXHJcbiAgICAgICAgICB9IDEwMCUge1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogcGVyc3BlY3RpdmUoMTIwcHgpIHJvdGF0ZVgoLTE4MGRlZykgcm90YXRlWSgtMTc5LjlkZWcpO1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSgxMjBweCkgcm90YXRlWCgtMTgwZGVnKSByb3RhdGVZKC0xNzkuOWRlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qIFJlY3RhbmdsZSBCb3VuY2Ugc3R5bGVzKi9cclxuICAgICAgLnNwaW5uZXItcmVjdGFuZ2xlLWJvdW5jZSB7XHJcbiAgICAgICAgICB3aWR0aDogNTBweDtcclxuICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5zcGlubmVyLXJlY3RhbmdsZS1ib3VuY2UgPiBkaXYge1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgIHdpZHRoOiA2cHg7XHJcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stc3RyZXRjaGRlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICBhbmltYXRpb246IHNrLXN0cmV0Y2hkZWxheSAxLjJzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3Bpbm5lci1yZWN0YW5nbGUtYm91bmNlIC5yZWN0MiB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMXM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjFzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3Bpbm5lci1yZWN0YW5nbGUtYm91bmNlIC5yZWN0MyB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTEuMHM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3Bpbm5lci1yZWN0YW5nbGUtYm91bmNlIC5yZWN0NCB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuc3Bpbm5lci1yZWN0YW5nbGUtYm91bmNlIC5yZWN0NSB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuOHM7XHJcbiAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBALXdlYmtpdC1rZXlmcmFtZXMgc2stc3RyZXRjaGRlbGF5IHtcclxuICAgICAgICAgIDAlLCA0MCUsIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDAuNCkgfVxyXG4gICAgICAgICAgMjAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxLjApIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgQGtleWZyYW1lcyBzay1zdHJldGNoZGVsYXkge1xyXG4gICAgICAgICAgMCUsIDQwJSwgMTAwJSB7XHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZVkoMC40KTtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVZKDAuNCk7XHJcbiAgICAgICAgICB9ICAyMCUge1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGVZKDEuMCk7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWSgxLjApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBXYW5kZXJpbmcgQ3ViZXMgc3R5bGVzICovXHJcbiAgICAgIC5zcGlubmVyLXdhbmRlcmluZy1jdWJlcyB7XHJcbiAgICAgICAgICB3aWR0aDogNjBweDtcclxuICAgICAgICAgIGhlaWdodDogNThweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5jdWJlMSwgLmN1YmUyIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgICB3aWR0aDogMTVweDtcclxuICAgICAgICAgIGhlaWdodDogMTVweDtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY3ViZW1vdmUgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgICAgIGFuaW1hdGlvbjogc2stY3ViZW1vdmUgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmN1YmUyIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC45cztcclxuICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuOXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jdWJlbW92ZSB7XHJcbiAgICAgICAgICAyNSUgeyAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpIH1cclxuICAgICAgICAgIDUwJSB7IC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDQycHgpIHRyYW5zbGF0ZVkoNDJweCkgcm90YXRlKC0xODBkZWcpIH1cclxuICAgICAgICAgIDc1JSB7IC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KSB9XHJcbiAgICAgICAgICAxMDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKSB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEBrZXlmcmFtZXMgc2stY3ViZW1vdmUge1xyXG4gICAgICAgICAgMjUlIHtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNDJweCkgcm90YXRlKC05MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSByb3RhdGUoLTkwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICAgICAgfSA1MCUge1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTc5ZGVnKTtcclxuICAgICAgICAgIH0gNTAuMSUge1xyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgICAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MnB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgICAgICAgIH0gNzUlIHtcclxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDQycHgpIHJvdGF0ZSgtMjcwZGVnKSBzY2FsZSgwLjUpO1xyXG4gICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSg0MnB4KSByb3RhdGUoLTI3MGRlZykgc2NhbGUoMC41KTtcclxuICAgICAgICAgIH0gMTAwJSB7XHJcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTM2MGRlZyk7XHJcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLyogQ2lyY2xlIHN0eWxlcyAqL1xyXG4gICAgICAuc2stY2lyY2xlIHtcclxuICAgICAgICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgbGVmdDogMDtcclxuICAgICAgICAgIHJpZ2h0OiAwO1xyXG4gICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgICAgICAgei1pbmRleDogMjAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2hpbGQge1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAuc2stY2lyY2xlIC5zay1jaGlsZDpiZWZvcmUge1xyXG4gICAgICAgICAgY29udGVudDogJyc7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgICAgd2lkdGg6IDE1JTtcclxuICAgICAgICAgIGhlaWdodDogMTUlO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stY2lyY2xlQm91bmNlRGVsYXkgMS4ycyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb246IHNrLWNpcmNsZUJvdW5jZURlbGF5IDEuMnMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlMiB7XHJcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDMwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzBkZWcpO1xyXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7IH1cclxuICAgICAgICAuc2stY2lyY2xlIC5zay1jaXJjbGUzIHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoNjBkZWcpO1xyXG4gICAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSg2MGRlZyk7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDYwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTQge1xyXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlNSB7XHJcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDEyMGRlZyk7IH1cclxuICAgICAgICAuc2stY2lyY2xlIC5zay1jaXJjbGU2IHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTcge1xyXG4gICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICAgICAgICAgIC1tcy10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlOCB7XHJcbiAgICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDIxMGRlZyk7IH1cclxuICAgICAgICAuc2stY2lyY2xlIC5zay1jaXJjbGU5IHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjQwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTEwIHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMjcwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTExIHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzAwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTEyIHtcclxuICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTtcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzMwZGVnKTsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTI6YmVmb3JlIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMS4xcztcclxuICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4xczsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTM6YmVmb3JlIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMXM7XHJcbiAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTFzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlNDpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjlzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjlzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlNTpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjhzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjhzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlNjpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjdzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjdzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlNzpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjZzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjZzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlODpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjVzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjVzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlOTpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjRzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjRzOyB9XHJcbiAgICAgICAgLnNrLWNpcmNsZSAuc2stY2lyY2xlMTA6YmVmb3JlIHtcclxuICAgICAgICAgIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAtMC4zcztcclxuICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zczsgfVxyXG4gICAgICAgIC5zay1jaXJjbGUgLnNrLWNpcmNsZTExOmJlZm9yZSB7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMnM7XHJcbiAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMnM7IH1cclxuICAgICAgICAuc2stY2lyY2xlIC5zay1jaXJjbGUxMjpiZWZvcmUge1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0wLjFzO1xyXG4gICAgICAgICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IC0wLjFzOyB9XHJcblxyXG4gICAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1jaXJjbGVCb3VuY2VEZWxheSB7XHJcbiAgICAgICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgICB9IDQwJSB7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQGtleWZyYW1lcyBzay1jaXJjbGVCb3VuY2VEZWxheSB7XHJcbiAgICAgICAgICAwJSwgODAlLCAxMDAlIHtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XHJcbiAgICAgICAgICB9IDQwJSB7XHJcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogQ2hhc2luZyBEb3RzIHN0eWxlcyAqL1xyXG4gICAgICAgIC5zcGlubmVyLWNoYXNpbmctZG90cyB7XHJcbiAgICAgICAgICB3aWR0aDogNDBweDtcclxuICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgIHRvcDogMDtcclxuICAgICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgICByaWdodDogMDtcclxuICAgICAgICAgIGJvdHRvbTogMDtcclxuICAgICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICAgIHotaW5kZXg6IDIwMDA7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stcm90YXRlIDIuMHMgaW5maW5pdGUgbGluZWFyO1xyXG4gICAgICAgICAgYW5pbWF0aW9uOiBzay1yb3RhdGUgMi4wcyBpbmZpbml0ZSBsaW5lYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuZG90MSwgLmRvdDIge1xyXG4gICAgICAgICAgd2lkdGg6IDYwJTtcclxuICAgICAgICAgIGhlaWdodDogNjAlO1xyXG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XHJcbiAgICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogc2stYm91bmNlIDIuMHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgICAgICAgICBhbmltYXRpb246IHNrLWJvdW5jZSAyLjBzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmRvdDIge1xyXG4gICAgICAgICAgdG9wOiBhdXRvO1xyXG4gICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IC0xLjBzO1xyXG4gICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMS4wcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1yb3RhdGUgeyAxMDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIH19XHJcbiAgICAgICAgQGtleWZyYW1lcyBzay1yb3RhdGUgeyAxMDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpIH19XHJcblxyXG4gICAgICAgIEAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2Uge1xyXG4gICAgICAgICAgMCUsIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC4wKSB9XHJcbiAgICAgICAgICA1MCUgeyAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMS4wKSB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBAa2V5ZnJhbWVzIHNrLWJvdW5jZSB7XHJcbiAgICAgICAgICAwJSwgMTAwJSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC4wKTtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuMCk7XHJcbiAgICAgICAgICB9IDUwJSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcclxuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEuMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLmZ1bGwtc2NyZWVuIHtcclxuICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICAgIHBvc2l0aW9uOiAtbXMtcGFnZTtcclxuICAgICAgfVxyXG4gICAgYFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TG9hZGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoKSBzaG93OiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgY29uZmlnOiBJTmd4TG9hZGluZ0NvbmZpZyA9IG5ldyBOZ3hMb2FkaW5nQ29uZmlnKCk7XHJcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIHByaXZhdGUgZGVmYXVsdENvbmZpZzogSU5neExvYWRpbmdDb25maWcgPSB7XHJcbiAgICAgICAgYW5pbWF0aW9uVHlwZTogbmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzLnRocmVlQm91bmNlLFxyXG4gICAgICAgIGJhY2tkcm9wQmFja2dyb3VuZENvbG91cjogJ3JnYmEoMCwgMCwgMCwgMC4zKScsXHJcbiAgICAgICAgYmFja2Ryb3BCb3JkZXJSYWRpdXM6ICcwcHgnLFxyXG4gICAgICAgIGZ1bGxTY3JlZW5CYWNrZHJvcDogZmFsc2UsXHJcbiAgICAgICAgcHJpbWFyeUNvbG91cjogJyNmZmZmZmYnLFxyXG4gICAgICAgIHNlY29uZGFyeUNvbG91cjogJyNmZmZmZmYnLFxyXG4gICAgICAgIHRlcnRpYXJ5Q29sb3VyOiAnI2ZmZmZmZidcclxuICAgIH07XHJcbiAgICBwdWJsaWMgbmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzID0gbmd4TG9hZGluZ0FuaW1hdGlvblR5cGVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgTG9hZGluZ1NlcnZpY2U6IE5neExvYWRpbmdTZXJ2aWNlLCBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cENvbmZpZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBDb25maWcoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBvcHRpb24gaW4gdGhpcy5kZWZhdWx0Q29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWdbb3B0aW9uXSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWdbb3B0aW9uXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbb3B0aW9uXSA9IHRoaXMuTG9hZGluZ1NlcnZpY2UubG9hZGluZ0NvbmZpZ1tvcHRpb25dICE9IG51bGwgPyB0aGlzLkxvYWRpbmdTZXJ2aWNlLmxvYWRpbmdDb25maWdbb3B0aW9uXSA6IHRoaXMuZGVmYXVsdENvbmZpZ1tvcHRpb25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnW29wdGlvbl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW29wdGlvbl0gPSB0aGlzLkxvYWRpbmdTZXJ2aWNlLmxvYWRpbmdDb25maWdbb3B0aW9uXSAhPSBudWxsID8gdGhpcy5Mb2FkaW5nU2VydmljZS5sb2FkaW5nQ29uZmlnW29wdGlvbl0gOiB0aGlzLmRlZmF1bHRDb25maWdbb3B0aW9uXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2hvdyhzaG93OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zaG93ID0gc2hvdztcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElOZ3hMb2FkaW5nQ29uZmlnIH0gZnJvbSAnLi4vcHVibGljX2FwaSc7XHJcbmltcG9ydCB7IE5neExvYWRpbmdDb21wb25lbnQgfSBmcm9tICcuL25neC1sb2FkaW5nLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neExvYWRpbmdDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hMb2FkaW5nQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TG9hZGluZ01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QobG9hZGluZ0NvbmZpZzogSU5neExvYWRpbmdDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ3hMb2FkaW5nTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdsb2FkaW5nQ29uZmlnJywgdXNlVmFsdWU6IGxvYWRpbmdDb25maWcgfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQXFCSSwwQkFBWSxNQUE4QjtRQUE5Qix1QkFBQSxFQUFBLFdBQThCO1FBQ3RDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDeEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztRQUNoRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztLQUMvQztJQUNMLHVCQUFDO0NBQUEsSUFBQTs7QUFFRCxJQUFhLHdCQUF3QixHQUFHO0lBQ3BDLFdBQVcsRUFBRSxjQUFjO0lBQzNCLE1BQU0sRUFBRSxXQUFXO0lBQ25CLFdBQVcsRUFBRSxhQUFhO0lBQzFCLFFBQVEsRUFBRSxjQUFjO0lBQ3hCLFlBQVksRUFBRSxlQUFlO0lBQzdCLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLE9BQU87SUFDZCxlQUFlLEVBQUUsa0JBQWtCO0lBQ25DLGFBQWEsRUFBRSxnQkFBZ0I7SUFDL0IsV0FBVyxFQUFFLGNBQWM7SUFDM0IsY0FBYyxFQUFFLGlCQUFpQjtDQUNwQzs7Ozs7O0FDNUNEO0lBU0UsMkJBQXlELE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ2hGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLGdCQUFnQixFQUFFLENBQUM7S0FDNUQ7O2dCQVJGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OztnREFJYyxRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7Ozs0QkFUakQ7Q0FZQzs7Ozs7O0FDWkQ7SUF5eEJJLDZCQUFvQixjQUFpQyxFQUFVLGlCQUFvQztRQUEvRSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBYjFGLFdBQU0sR0FBc0IsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRXBELGtCQUFhLEdBQXNCO1lBQ3ZDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxXQUFXO1lBQ25ELHdCQUF3QixFQUFFLG9CQUFvQjtZQUM5QyxvQkFBb0IsRUFBRSxLQUFLO1lBQzNCLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsY0FBYyxFQUFFLFNBQVM7U0FDNUIsQ0FBQztRQUNLLDZCQUF3QixHQUFHLHdCQUF3QixDQUFDO0tBRTZDOzs7O0lBRXhHLHNDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7OztJQUVPLHlDQUFXOzs7SUFBbkI7UUFDSSxLQUFLLElBQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckMsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO29CQUM3QixTQUFTO2lCQUNaO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEo7aUJBQU07Z0JBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtvQkFDN0IsU0FBUztpQkFDWjtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BKO1NBQ0o7S0FDSjs7Ozs7SUFFTSxxQ0FBTzs7OztJQUFkLFVBQWUsSUFBYTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDekM7O2dCQWh6QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsMGdLQStEWDtvQkFDQyxNQUFNLEVBQUU7d0JBQ0osNDNyQkFnc0JIO3FCQUNBO2lCQUNKOzs7Z0JBdndCUSxpQkFBaUI7Z0JBRmpCLGlCQUFpQjs7O3VCQTJ3QnJCLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOztJQXdDViwwQkFBQztDQUFBOzs7Ozs7QUNyekJEO0lBS0E7S0FZQzs7Ozs7SUFOUSx3QkFBTzs7OztJQUFkLFVBQWUsYUFBZ0M7UUFDN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsQ0FBQztTQUNuRSxDQUFDO0tBQ0g7O2dCQVhGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO29CQUNuQyxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDL0I7O0lBUUQsdUJBQUM7Q0FBQTs7Ozs7Ozs7Ozs7Ozs7In0=

/***/ }),

/***/ "./src/app/login/login-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page\" [@routerTransition]>\r\n    <ngx-loading [show]=\"loading\" [config]=\"{animationType: ngxLoadingAnimationTypes.circle, primaryColour: primaryColour, secondaryColour: secondaryColour, backdropBorderRadius: '3px'}\"\r\n      [template]=\"loadingTemplate\"></ngx-loading>\r\n\r\n    <div class=\"row justify-content-md-center\">\r\n        <div class=\"col-md-4\">\r\n            <img src=\"assets/images/logo.png\" width=\"150px\" class=\"user-avatar\" />\r\n            <h1>SB Admin BS4 Angular7</h1>\r\n            <form #loginForm=ngForm (ngSubmit)=\"onSubmit()\">\r\n                <div class=\"form-content\">\r\n                    <div class=\"alert alert-danger\" [hidden]=\"!error\"> {{error}} </div>\r\n                    <div class=\"form-group\">\r\n                        <input type=\"email\" name=\"email\" [(ngModel)]=\"form.email\" class=\"form-control input-underline input-lg\" placeholder=\"Email\" required>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <input type=\"password\" name=\"password\" [(ngModel)]=\"form.password\" class=\"form-control input-underline input-lg\" placeholder=\"Password\" required>\r\n                    </div>\r\n                </div>\r\n                <button type=\"submit\" class=\"btn rounded-btn\" [disabled]=\"!loginForm.valid\"> Log in </button>\r\n                &nbsp;\r\n                <a class=\"btn rounded-btn\" [routerLink]=\"['/signup']\">Register</a>\r\n                <small class=\"float-right\"><a [routerLink]=\"['/request-password-reset'] \"> Reset Password</a></small>\r\n            </form>\r\n        </div>\r\n    </div>\r\n    <ng-snotify class=\"{{style}}\"></ng-snotify>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block; }\n\n.login-page {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: auto;\n  background: #222;\n  text-align: center;\n  color: #fff;\n  padding: 3em; }\n\n.login-page .col-lg-4 {\n    padding: 0; }\n\n.login-page .input-lg {\n    height: 46px;\n    padding: 10px 16px;\n    font-size: 18px;\n    line-height: 1.3333333;\n    border-radius: 0; }\n\n.login-page .input-underline {\n    background: 0 0;\n    border: none;\n    box-shadow: none;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.5);\n    color: #fff;\n    border-radius: 0; }\n\n.login-page .input-underline:focus {\n    border-bottom: 2px solid #fff;\n    box-shadow: none; }\n\n.login-page .rounded-btn {\n    border-radius: 50px;\n    color: rgba(255, 255, 255, 0.8);\n    background: #222;\n    border: 2px solid rgba(255, 255, 255, 0.8);\n    font-size: 18px;\n    line-height: 40px;\n    padding: 0 25px; }\n\n.login-page .rounded-btn:hover,\n  .login-page .rounded-btn:focus,\n  .login-page .rounded-btn:active,\n  .login-page .rounded-btn:visited {\n    color: white;\n    border: 2px solid white;\n    outline: none; }\n\n.login-page h1 {\n    font-weight: 300;\n    margin-top: 20px;\n    margin-bottom: 10px;\n    font-size: 36px; }\n\n.login-page h1 small {\n      color: rgba(255, 255, 255, 0.7); }\n\n.login-page .form-group {\n    padding: 8px 0; }\n\n.login-page .form-group input::-webkit-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-moz-placeholder {\n      /* Firefox 18- */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-group input:-ms-input-placeholder {\n      color: rgba(255, 255, 255, 0.6) !important; }\n\n.login-page .form-content {\n    padding: 40px 0; }\n\n.login-page .user-avatar {\n    border-radius: 50%;\n    border: 2px solid #fff; }\n\n.login-page .ng-invalid:not(form) {\n    border-left: 5px solid red; }\n\n.login-page .ng-valid:not(form) {\n    border-left: 5px solid green; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vQzpcXHhhbXBwXFxodGRvY3NcXGxhcmF2ZWwtYW5ndWxhci1oYWNoaW5ldFxcZnJvbnRlbmQvc3JjXFxhcHBcXGxvZ2luXFxsb2dpbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGVBQWMsRUFDakI7O0FBQ0Q7RUFDSSxtQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxTQUFRO0VBQ1IsVUFBUztFQUNULGVBQWM7RUFDZCxpQkFYMEI7RUFhMUIsbUJBQWtCO0VBQ2xCLFlBQVc7RUFDWCxhQUFZLEVBNEZmOztBQXZHRDtJQWFRLFdBQVUsRUFDYjs7QUFkTDtJQWdCUSxhQUFZO0lBQ1osbUJBQWtCO0lBQ2xCLGdCQUFlO0lBQ2YsdUJBQXNCO0lBQ3RCLGlCQUFnQixFQUNuQjs7QUFyQkw7SUF1QlEsZ0JBQWU7SUFDZixhQUFZO0lBQ1osaUJBQWdCO0lBQ2hCLGtEQUFpRDtJQUNqRCxZQUFXO0lBQ1gsaUJBQWdCLEVBQ25COztBQTdCTDtJQStCUSw4QkFBNkI7SUFDN0IsaUJBQWdCLEVBQ25COztBQWpDTDtJQW9DUSxvQkFBbUI7SUFDbkIsZ0NBQStCO0lBQy9CLGlCQTFDc0I7SUEyQ3RCLDJDQUEwQztJQUMxQyxnQkFBZTtJQUNmLGtCQUFpQjtJQUNqQixnQkFBZSxFQUNsQjs7QUEzQ0w7Ozs7SUFnRFEsYUFBNkI7SUFDN0Isd0JBQXdDO0lBQ3hDLGNBQWEsRUFDaEI7O0FBbkRMO0lBc0RRLGlCQUFnQjtJQUNoQixpQkFBZ0I7SUFDaEIsb0JBQW1CO0lBQ25CLGdCQUFlLEVBSWxCOztBQTdETDtNQTJEWSxnQ0FBK0IsRUFDbEM7O0FBNURUO0lBZ0VRLGVBQWMsRUFrQmpCOztBQWxGTDtNQWtFWSwyQ0FBMEMsRUFDN0M7O0FBbkVUO01Bc0VZLGlCQUFpQjtNQUNqQiwyQ0FBMEMsRUFDN0M7O0FBeEVUO01BMkVZLGlCQUFpQjtNQUNqQiwyQ0FBMEMsRUFDN0M7O0FBN0VUO01BZ0ZZLDJDQUEwQyxFQUM3Qzs7QUFqRlQ7SUFvRlEsZ0JBQWUsRUFDbEI7O0FBckZMO0lBd0ZRLG1CQUFrQjtJQUNsQix1QkFBc0IsRUFDekI7O0FBMUZMO0lBNkZRLDJCQUF5QixFQUM1Qjs7QUE5Rkw7SUFpR1EsNkJBQTJCLEVBQzlCIiwiZmlsZSI6InNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkdG9wbmF2LWJhY2tncm91bmQtY29sb3I6ICMyMjI7XHJcbjpob3N0IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcbi5sb2dpbi1wYWdlIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgYmFja2dyb3VuZDogJHRvcG5hdi1iYWNrZ3JvdW5kLWNvbG9yO1xyXG4gICAgLy8gYmFja2dyb3VuZDogZ3JheTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogM2VtO1xyXG4gICAgLmNvbC1sZy00IHtcclxuICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgfVxyXG4gICAgLmlucHV0LWxnIHtcclxuICAgICAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAxNnB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMS4zMzMzMzMzO1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICB9XHJcbiAgICAuaW5wdXQtdW5kZXJsaW5lIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAwIDA7XHJcbiAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgfVxyXG4gICAgLmlucHV0LXVuZGVybGluZTpmb2N1cyB7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNmZmY7XHJcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIH1cclxuICAgIC5yb3VuZGVkLWJ0biB7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwcHg7XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAkdG9wbmF2LWJhY2tncm91bmQtY29sb3I7XHJcbiAgICAgICAgYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcclxuICAgICAgICBwYWRkaW5nOiAwIDI1cHg7XHJcbiAgICB9XHJcbiAgICAucm91bmRlZC1idG46aG92ZXIsXHJcbiAgICAucm91bmRlZC1idG46Zm9jdXMsXHJcbiAgICAucm91bmRlZC1idG46YWN0aXZlLFxyXG4gICAgLnJvdW5kZWQtYnRuOnZpc2l0ZWQge1xyXG4gICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XHJcbiAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBoMSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICAgICAgZm9udC1zaXplOiAzNnB4O1xyXG4gICAgICAgIHNtYWxsIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmZvcm0tZ3JvdXAge1xyXG4gICAgICAgIHBhZGRpbmc6IDhweCAwO1xyXG4gICAgICAgIGlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQ6LW1vei1wbGFjZWhvbGRlciB7XHJcbiAgICAgICAgICAgIC8qIEZpcmVmb3ggMTgtICovXHJcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNikgIWltcG9ydGFudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0OjotbW96LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgLyogRmlyZWZveCAxOSsgKi9cclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHtcclxuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSAhaW1wb3J0YW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC5mb3JtLWNvbnRlbnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDQwcHggMDtcclxuICAgIH1cclxuICAgIC51c2VyLWF2YXRhciB7XHJcbiAgICAgICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICNmZmY7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nLWludmFsaWQ6bm90KGZvcm0pe1xyXG4gICAgICAgIGJvcmRlci1sZWZ0OjVweCBzb2xpZCByZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLm5nLXZhbGlkOm5vdChmb3JtKXtcclxuICAgICAgICBib3JkZXItbGVmdDo1cHggc29saWQgZ3JlZW47XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _router_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../router.animations */ "./src/app/router.animations.ts");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _shared_services_token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/token.service */ "./src/app/shared/services/token.service.ts");
/* harmony import */ var _shared_services_httpcall_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/services/httpcall.service */ "./src/app/shared/services/httpcall.service.ts");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import {SnotifyService, SnotifyPosition, SnotifyToastConfig} from 'ng-snotify';
var PrimaryWhite = '#ffffff';
var SecondaryGrey = '#ccc';
var PrimaryRed = '#dd0031';
var SecondaryBlue = '#006ddd';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(translate, router, httpcall, Token, Auth) {
        this.translate = translate;
        this.router = router;
        this.httpcall = httpcall;
        this.Token = Token;
        this.Auth = Auth;
        this.ngxLoadingAnimationTypes = ngx_loading__WEBPACK_IMPORTED_MODULE_7__["ngxLoadingAnimationTypes"];
        this.primaryColour = PrimaryRed;
        this.secondaryColour = SecondaryBlue;
        this.config = { animationType: ngx_loading__WEBPACK_IMPORTED_MODULE_7__["ngxLoadingAnimationTypes"].none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
        this.form = {
            email: null,
            password: null
        };
        this.error = null;
        this.loading = false;
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        var browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }
    // getConfig(): SnotifyToastConfig {
    //   this.snotifyService.setDefaults({
    //     global: {
    //       newOnTop: this.newTop,
    //       maxAtPosition: this.blockMax,
    //       maxOnScreen: this.dockMax,
    //       filterDuplicates: this.filterDuplicates
    //     }
    //   });
    //   return {
    //     bodyMaxLength: this.bodyMaxLength,
    //     titleMaxLength: this.titleMaxLength,
    //     backdrop: this.backdrop,
    //     position: this.position,
    //     timeout: this.timeout,
    //     showProgressBar: this.progressBar,
    //     closeOnClick: this.closeClick,
    //     pauseOnHover: this.pauseHover
    //   };
    // }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.onLoggedin = function () {
        // localStorage.setItem('isLoggedin', 'true');
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        // console.log(this.form);
        this.loading = true;
        this.httpcall.login(this.form).subscribe(function (data) { return _this.handleResponse(data); }, function (error) { return _this.handleError(error); });
    };
    LoginComponent.prototype.handleResponse = function (data) {
        this.Token.handle(data.access_token, data.user);
        this.Auth.changeAuthStatus(true);
        // this.snotifyService.success(this.body, this.title, this.getConfig());
        localStorage.setItem('isLoggedin', 'true');
        this.loading = true;
        this.router.navigateByUrl('/dashboard');
    };
    LoginComponent.prototype.handleError = function (error) {
        this.error = error.error.error;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ngxLoading'),
        __metadata("design:type", ngx_loading__WEBPACK_IMPORTED_MODULE_7__["NgxLoadingComponent"])
    ], LoginComponent.prototype, "ngxLoadingComponent", void 0);
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
            animations: [Object(_router_animations__WEBPACK_IMPORTED_MODULE_3__["routerTransition"])()]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_services_httpcall_service__WEBPACK_IMPORTED_MODULE_6__["HttpcallService"],
            _shared_services_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/login/login-routing.module.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/fesm5/ngx-loading.js");
/* harmony import */ var ng_snotify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-snotify */ "./node_modules/ng-snotify/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_4__["LoginRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_6__["NgxLoadingModule"].forRoot({}),
                ng_snotify__WEBPACK_IMPORTED_MODULE_7__["SnotifyModule"]
            ],
            providers: [
                { provide: 'SnotifyToastConfig', useValue: ng_snotify__WEBPACK_IMPORTED_MODULE_7__["ToastDefaults"] },
                ng_snotify__WEBPACK_IMPORTED_MODULE_7__["SnotifyService"]
            ],
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map