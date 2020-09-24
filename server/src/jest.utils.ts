import { GenericContainer } from "testcontainers"
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "./app.module";

async function startMongo() {
    const container = await new GenericContainer('mongo')
        .withName('mongo_pepe_test')
        .withExposedPorts(27017)
        .start()
    process.env.DB_HOST = container.getContainerIpAddress();
    process.env.DB_PORT = container.getMappedPort(27017).toString();
    return container;
}

export async function setup() {
    process.env.KUBERNETES_SERVICE_HOST = 'localhost';
    const mongo = await startMongo();
    process.env.DB_NAME = "test_pepe";

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    global.currentApp = moduleFixture.createNestApplication();
    global.testMongo = mongo;
    await global.currentApp.listen(3001);
    process.env.APP_URL = await global.currentApp.getUrl();
}

export async function teardown() {
    if (!global.currentApp)
        return;

    await global.currentApp.close();
    global.currentApp = null;
    await global.testMongo.stop();
}