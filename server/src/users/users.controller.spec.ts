import {UsersService} from "./users.service";
import { async } from "rxjs/internal/scheduler/async";
import {setup, teardown} from "../jest.utils";
import * as request from 'supertest';
import { response } from "express";
import bodyParser = require("body-parser");

beforeAll(setup, 60000)

afterAll(teardown, 10000)

let token = null;

describe('User Controller', () => {

  beforeAll(async () => {
    token = await request(global.currentApp.getHttpServer())
        .post('/auth/register')
        .send({"username": "admin", "password": "myPassword"})
        .then(() => {
            return request(global.currentApp.getHttpServer())
                .post('/auth/login')
                .send({"username": "admin", "password": "myPassword"})
                .then(response => {
                    return response.body.accessToken;
                });
        });
  });

  describe('Get profile', () => {
    it('Should send a 200 code with user', async () => {
        const response = await request(global.currentApp.getHttpServer())
            .get('/user/me')
            .set({'Authorization': `Bearer ${token}`})
            .expect(200);

        expect(response.body.username).toBe("admin");

        expect(response.body.id).not.toBeNull();
    });

    it('Should send a 401 code', async () => {
        request(global.currentApp.getHttpServer())
            .get('/user/me')
            .expect(401);
    });
  });
});
