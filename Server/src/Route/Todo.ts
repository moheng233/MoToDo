import { FastifyPluginAsync } from "fastify";
import { ToDo } from "../Entity/ToDo";


export const TodoPlugin: FastifyPluginAsync = async function(f,o) {
    f.get("/getTodoList",
    async (req,rep) => {
        let ToDoRep = f.DateBase.getRepository(ToDo);
        let ToDoList = await ToDoRep.find({
            del: false
        });

        return {
            code: "0000",
            data: ToDoList
        }
    })

    f.post("/newTodo",
    async (req,rep) => {
        let data: {msg: string} = <any>req.body;
        let ToDoRep = f.DateBase.getRepository(ToDo);

        let todo = new ToDo();
        todo.msg = data.msg;
        let saved = await ToDoRep.save(todo);

        return {
            code: "0000",
            data: saved
        }
    })

    f.post("/editTodo",
    async (req,rep) => {
        let data: {msg?: string, id: string, del?: string} = <any>req.body;
        let ToDoRep = f.DateBase.getRepository(ToDo);

        if(data.id == ""){
            return {
                code: "0002",
                msg: "id not set"
            }
        }

        let todo = await ToDoRep.findOne({
            id: data.id
        })

        if(todo != undefined){
            if(data.msg != undefined){
                todo.msg = data.msg;
            }
            if(data.del != undefined){
                todo.msg = data.del;
            }

            let saved = await ToDoRep.save(todo);

            return {
                code: "0000",
                data: saved
            }
        } else {
            return {
                code: "0001",
                msg: "Todo NotFind"
            }
        }
    })
}