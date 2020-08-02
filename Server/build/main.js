"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const fastify_1 = __importDefault(require("fastify"));
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const Todo_1 = require("./Route/Todo");
class Main {
    constructor() {
        this.Fastify = fastify_1.default({
            logger: true
        });
        this.initDateBase()
            .then((datebase) => __awaiter(this, void 0, void 0, function* () {
            console.log('DateBase Login Ok!');
            this.DateBase = datebase;
            yield this.DateBase.synchronize();
            this.Fastify.decorate('DateBase', this.DateBase);
            this.Fastify.register(Todo_1.TodoPlugin);
            this.Fastify.listen(3000, '0.0.0.0', (err, address) => {
                if (err) {
                    this.Fastify.log.error(err);
                    process.exit(1);
                }
                console.log(`服务器启动在${address}`);
                console.log(this.Fastify.printRoutes());
            });
        }));
    }
    initDateBase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Fastify.log.info(`DirName ${__dirname}`);
            this.Fastify.log.info(`DirName ${path_1.resolve(__dirname, "Entity/*.js")}`);
            let DateBase = yield typeorm_1.createConnection({
                type: "sqlite",
                database: path_1.resolve(__dirname, "../database.sqlite"),
                entities: [
                    path_1.resolve(__dirname, "Entity/*.js")
                ]
            });
            return DateBase;
        });
    }
}
exports.Main = Main;
Main.GetObject = new Main();
//# sourceMappingURL=main.js.map