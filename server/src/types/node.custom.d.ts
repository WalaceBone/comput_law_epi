import {INestApplication} from "@nestjs/common";
import {StartedTestContainer} from "testcontainers";

declare global {
    namespace NodeJS {
        interface Global {
            currentApp?: INestApplication,
            testMongo?: StartedTestContainer
        }
    }
}