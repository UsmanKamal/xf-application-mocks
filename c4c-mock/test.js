#!/usr/bin/env node
'use strict'

const request = require('supertest');
const mock = require("./app.js")

describe('tests odata controllers', function () {
    it('should work', function (done) {
        this.timeout(10000);
        mock.then(function (app) {

            describe('GET AnswerAttachments via API', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/sap/c4c/api/v1/c4codataapi/AnswerAttachments')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200, done)
                });
            });
            describe('GET AnswerAttachments via ODATA', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/sap/c4c/odata/v1/c4codataapi/AnswerAttachments')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200, done)
                });
            });
            describe('GET odata metadata', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/sap/c4c/odata/v1/c4codataapi/$metadata')
                        .expect('Content-Type', 'application/xml; charset=utf-8')
                        .expect(200, done)
                });
            });
            describe('GET console', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/sap/c4c/api/v1/c4codataapi/console/')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'text/html; charset=UTF-8')
                        .expect(200, done)
                });
            });
            describe('GET metadata', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/metadata')
                        .expect('Content-Type', 'text/yaml; charset=UTF-8')
                        .expect(200, done)
                });
            });
            describe('GET app info', function () {
                it('should return 200', function (done) {
                    request(app)
                        .get('/info')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200, done)
                });
            });

            done()
        }).catch(error => done(error));
    });
});
