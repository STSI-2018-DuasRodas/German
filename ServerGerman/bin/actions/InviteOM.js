"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var action_1 = require("../kernel/action");
var route_types_1 = require("../kernel/route-types");
var vputils_1 = require("../utils/vputils");
var kernel_utils_1 = require("../kernel/kernel-utils");
var mysql_factory_1 = require("../mysql/mysql_factory");
var jwt_1 = require("../utils/jwt");
var InviteOMAction = /** @class */ (function (_super) {
    __extends(InviteOMAction, _super);
    function InviteOMAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InviteOMAction.prototype.validateData = function () {
        new kernel_utils_1.KernelUtils().createExceptionApiError('1001', 'Informe o ID do Manutentor do Convidado e ID  da Ordem de manutenção', this.req.body.idUser == '' || this.req.body.idUser == undefined || this.req.body.idOm == '' || this.req.body.idOm == undefined || this.req.body.idAdm == '' || this.req.body.idAdm == undefined);
    };
    InviteOMAction.prototype.insertSQL = function () {
        return 'insert into TBUSUARIO_WITH_TBOM (TBUSUARIO_WITH_TBOM.IDMANUT, TBUSUARIO_WITH_TBOM.IDOM) values (\'' + this.req.body.idUser + '\',\'' + this.req.body.idOm + '\');';
    };
    InviteOMAction.prototype.historico = function (nomeADM, manutNome) {
        var desc = 'Manuntentor ' + nomeADM + ' convidou o manutentor ' + manutNome + ' para a OM';
        return 'insert into TBHISTORICO (TBHISTORICO.IDUSER, TBHISTORICO.IDOM, TBHISTORICO.DESC, TBHISTORICO.DTALTER) values (\'' + this.req.body.idAdm + '\',\'' + this.req.body.idOm + '\',\'' + desc + '\', now());';
    };
    InviteOMAction.prototype.generateSQL = function () {
        return 'select * from TBUSUARIO_WITH_TBOM where TBUSUARIO_WITH_TBOM.IDMANUT = \'' + this.req.body.idUser + '\' AND TBUSUARIO_WITH_TBOM.IDOM = \'' + this.req.body.idOm + '\';';
    };
    InviteOMAction.prototype.ADMonOM = function () {
        return 'select * from TBUSUARIO_WITH_TBOM where TBUSUARIO_WITH_TBOM.IDMANUT = \'' + this.req.body.idAdm + '\' AND TBUSUARIO_WITH_TBOM.IDOM = \'' + this.req.body.idOm + '\';';
    };
    InviteOMAction.prototype.validateADM = function () {
        return 'select CARGO,NOME from TBUSUARIO where TBUSUARIO.ID = \'' + this.req.body.idAdm + '\' AND STATUS = 1;';
    };
    InviteOMAction.prototype.validateManut = function () {
        return 'select CARGO,NOME from TBUSUARIO where TBUSUARIO.ID = \'' + this.req.body.idUser + '\' AND STATUS = 1;';
    };
    InviteOMAction.prototype.Post = function () {
        var _this = this;
        var jwtss = new jwt_1.jwts();
        var retorno = jwtss.verifyJWT(this.req, this.resp);
        if (retorno.val == false) {
            return retorno.res;
        }
        else {
            this.validateData();
            new mysql_factory_1.MySQLFactory().getConnection().select(this.validateADM()).subscribe(function (adm) {
                if (adm[0].CARGO == 1) {
                    new mysql_factory_1.MySQLFactory().getConnection().select(_this.validateManut()).subscribe(function (manut) {
                        if (manut[0].CARGO == 1) {
                            new mysql_factory_1.MySQLFactory().getConnection().select(_this.ADMonOM()).subscribe(function (admon) {
                                if (admon.length || admon.length > 0) {
                                    new mysql_factory_1.MySQLFactory().getConnection().select(_this.generateSQL()).subscribe(function (data) {
                                        if (data.length || data.length > 0) {
                                            _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Vínculo já existe'));
                                            return;
                                        }
                                        else {
                                            new mysql_factory_1.MySQLFactory().getConnection().select(_this.insertSQL()).subscribe(function (data1) {
                                                new mysql_factory_1.MySQLFactory().getConnection().select(_this.historico(adm[0].NOME, manut[0].NOME)).subscribe(function (data2) {
                                                });
                                            });
                                        }
                                        _this.sendAnswer({
                                            token: new vputils_1.VPUtils().generateGUID().toUpperCase()
                                        });
                                    }, function (error) {
                                        _this.sendError(error);
                                    });
                                }
                                else {
                                    _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Manutentor ADM não está na OM '));
                                }
                            });
                        }
                        else {
                            _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Usuário sem permissão para receber a OM'));
                        }
                    });
                }
                else {
                    _this.sendError(new kernel_utils_1.KernelUtils().createErrorApiObject(401, '1001', 'Usuário sem permissão para convidar'));
                }
            });
        }
    };
    InviteOMAction.prototype.defineVisibility = function () {
        this.actionEscope = route_types_1.ActionType.atPublic;
    };
    __decorate([
        decorators_1.Post('/InviteOMUser'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], InviteOMAction.prototype, "Post", null);
    return InviteOMAction;
}(action_1.Action));
exports.InviteOMAction = InviteOMAction;
