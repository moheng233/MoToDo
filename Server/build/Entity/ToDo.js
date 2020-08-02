"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
const typeorm_1 = require("typeorm");
let ToDo = class ToDo {
    constructor() {
        this.msg = "";
        this.del = false;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid')
], ToDo.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text')
], ToDo.prototype, "msg", void 0);
__decorate([
    typeorm_1.Column('boolean')
], ToDo.prototype, "del", void 0);
ToDo = __decorate([
    typeorm_1.Entity()
], ToDo);
exports.ToDo = ToDo;
//# sourceMappingURL=ToDo.js.map