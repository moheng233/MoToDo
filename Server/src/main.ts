import fastify from 'fastify'
import { createConnection, Connection } from 'typeorm';
import { resolve } from 'path';
import { TodoPlugin } from './Route/Todo';

declare module 'fastify' {
    interface FastifyInstance {
        DateBase: Connection
    }
}

export class Main {
    static GetObject = new Main();
    DateBase!: Connection;
    Fastify = fastify({
        logger: true
    });

    constructor(){
        this.initDateBase()
            .then(async (datebase) => {
                console.log('DateBase Login Ok!');

                this.DateBase = datebase;

                await this.DateBase.synchronize();

                this.Fastify.decorate('DateBase', this.DateBase);

                this.Fastify.register(TodoPlugin);

                this.Fastify.listen(3000,'0.0.0.0',(err,address) => {
                    if (err){
                        this.Fastify.log.error(err);
        
                        process.exit(1);
                    }
        
                    console.log(`服务器启动在${address}`);
                    console.log(this.Fastify.printRoutes());
                })
            });  
    }

    async initDateBase(){
        this.Fastify.log.info(`DirName ${__dirname}`);
        this.Fastify.log.info(`DirName ${resolve(__dirname, "Entity/*.js")}`);

        let DateBase = await createConnection({
            type: "sqlite",
            database: resolve(__dirname,"../database.sqlite"),
            entities: [
                resolve(__dirname, "Entity/*.js")
            ]
        })

        return DateBase;
    }
}