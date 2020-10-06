import * as request from 'supertest';
import {setup, teardown} from "../jest.utils";
import * as jwt from 'jsonwebtoken';

beforeAll(setup, 60000)

afterAll(teardown, 10000)

describe('Auth Controller', () => {

    describe('Register', () => {
        it('Should send 201 with User', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/register')
                .send({"username": "admin", "password": "pass"})
                .expect(201);

            expect(response.body.id).not.toBeNull();
            expect(response.body.username).toBe("admin");
        });

        it('Should send 400 with message', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/register')
                .send({"username": "admin"})
                .expect(400);

            expect(response.body.message).toBe("Missing parameter.");
        });

        it('Should send 409 with message', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/register')
                .send({"username": "admin", "password": "pass"})
                .expect(409);

            expect(response.body.message).toBe("User already exists.");
        });
    });

    describe('Login', () => {
        it('Should send 200 with accessToken and refreshToken', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .send({"username": "admin", "password": "pass"})
                .expect(200)

            expect(response.body.accessToken).not.toBeNull();
        });

        it('Should send a 400 code with message', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .expect(400);

            expect(response.body.message).toBe("Missing parameter");
        });

        it('Should send 401 code with message', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .send({"username": "charlito", "password": "bonjour"})
                .expect(401);

            expect(response.body.message).toBe("User does not exist");
        });

        it('Should send 401 code with message', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .send({"username": "admin", "password": "kilos"})
                .expect(401);

            expect(response.body.message).toBe("Invalid credentials");
        });
    });

    describe('Refresh token', () => {

        let token = null;
        let refreshToken = null;
        let id = null;

        beforeAll(async () => {
            const body = await request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .send({"username": "admin", "password": "pass"})
                .then(response => {
                   return response.body;
                });

            token = body.accessToken;
            refreshToken = body.refreshToken;

            id = await request(global.currentApp.getHttpServer())
                .get('/user/me')
                .set({'Authorization': `Bearer ${token}`})
                .then(response => {
                    return response.body.id;
                });
        });

        it('Should send a 200 code with a new token', async () => {
            const response = await request(global.currentApp.getHttpServer())
                .get(`/auth/refreshToken?token=${refreshToken}`)
                .expect(200);

            expect(response.body.accessToken).not.toBeNull();

            const user = await request(global.currentApp.getHttpServer())
                .get('/user/me')
                .set({'Authorization': `Bearer ${token}`})
                .expect(200);

            expect(user.body.id).toBe(id);
        });

        it ('Should send a 400 code with a message', async () => {
            const invalidToken = jwt.sign({id: id}, 'toto');

            const response = await request(global.currentApp.getHttpServer())
                .get(`/auth/refreshToken?token=${invalidToken}`)
                .expect(400);

            expect(response.body.message).toBe("Invalid token")
        });        
    });
});
