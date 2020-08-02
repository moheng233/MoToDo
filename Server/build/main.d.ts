import { Connection } from 'typeorm';
declare module 'fastify' {
    interface FastifyInstance {
        DateBase: Connection;
    }
}
export declare class Main {
    static GetObject: Main;
    DateBase: Connection;
    Fastify: any;
    constructor();
    initDateBase(): unknown;
}
