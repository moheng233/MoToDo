/// <reference types="node" />
import { Connection } from 'typeorm';
declare module 'fastify' {
    interface FastifyInstance {
        DateBase: Connection;
    }
}
export declare class Main {
    static GetObject: Main;
    DateBase: Connection;
    Fastify: import("fastify").FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance>;
    constructor();
    initDateBase(): Promise<Connection>;
}
