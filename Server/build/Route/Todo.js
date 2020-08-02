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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoPlugin = void 0;
const ToDo_1 = require("../Entity/ToDo");
exports.TodoPlugin = function (f, o) {
    return __awaiter(this, void 0, void 0, function* () {
        f.get("/getTodoList", (req, rep) => __awaiter(this, void 0, void 0, function* () {
            let ToDoRep = f.DateBase.getRepository(ToDo_1.ToDo);
            let ToDoList = yield ToDoRep.find({
                del: false
            });
            return {
                code: "0000",
                data: ToDoList
            };
        }));
        f.post("/newTodo", (req, rep) => __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let ToDoRep = f.DateBase.getRepository(ToDo_1.ToDo);
            let todo = new ToDo_1.ToDo();
            todo.msg = data.msg;
            let saved = yield ToDoRep.save(todo);
            return {
                code: "0000",
                data: saved
            };
        }));
        f.post("/editTodo", (req, rep) => __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let ToDoRep = f.DateBase.getRepository(ToDo_1.ToDo);
            if (data.id == "") {
                return {
                    code: "0002",
                    msg: "id not set"
                };
            }
            let todo = yield ToDoRep.findOne({
                id: data.id
            });
            if (todo != undefined) {
                if (data.msg != undefined) {
                    todo.msg = data.msg;
                }
                if (data.del != undefined) {
                    todo.msg = data.del;
                }
                let saved = yield ToDoRep.save(todo);
                return {
                    code: "0000",
                    data: saved
                };
            }
            else {
                return {
                    code: "0001",
                    msg: "Todo NotFind"
                };
            }
        }));
    });
};
//# sourceMappingURL=Todo.js.map