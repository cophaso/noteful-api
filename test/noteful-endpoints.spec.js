const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeFoldersArray } = require('./folder.fixtures');

describe('Noteful Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  });

  before('clean the table', () => db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE'));

  afterEach('cleanup',() => db.raw('TRUNCATE folders, notes RESTART IDENTITY CASCADE'));

  after('disconnect from db', () => db.destroy());

  describe('GET /api/folders', () => {
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray();

      beforeEach('insert folders', () => {
        return db
          .into('folders')
          .insert(testFolders)
      })

      it('responds with 200 and all of the articles', () => {
        return supertest(app)
          .get('/api/folders')
          .expect(200, testFolders)
      })
    })
    context(`Given no folders`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/folders')
          .expect(200, [])
      })
    })
  })

  describe('POST /api/folders', () => {
    it('creates a new folder, responds with a 201 and a new folder', function() {
      this.retries(3)
      const newFolder = {
        name: 'Potato'
      }
      return supertest(app)
        .post('/api/folders')
        .send(newFolder)
        .expect(201)
        .expect(res => {
          expect(res.body.name).to.eql(newFolder.name)
        })
        .then(postRes => {
          supertest(app)
          .get(`/api/folders/${postRes.body.id}`)
          .expect(postRes.body)
        })
    })
  })

  describe('DELETE /api/folders/:folder_id', () => {
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray()

      beforeEach('insert folders', () => {
        return db
          .into('folders')
          .insert(testFolders)
      })

      it('responds with a 204 and removes the folder', () => {
        const idToRemove = 2;
        const expectedFolders = testFolders.filter(folder => folder.id !== idToRemove)
        return supertest(app)
          .delete(`/api/folders/${idToRemove}`)
          .expect(204)
          .then(res => {
            supertest(app)
              .get('/api/folders')
              .expect(expectedFolders)
        })
      })
    })
  })

  describe(`PATCH /api/articles/:article_id`, () => { 
    context('Given there are folders in the database', () => {
      const testFolders = makeFoldersArray()

      beforeEach('insert folders', () => {
        return db
          .into('folders')
          .insert(testFolders)
      })

      it('responds with a 204 and updates the folder', () => {
        const idToUpdate = 2
        const updateFolder = {
          name: 'Updated name'
        }

        const expectedFolder = {
          ...testFolders[idToUpdate - 1],
          ...updateFolder
        }

        return supertest(app)
          .patch(`/api/folders/${idToUpdate}`)
          .send(updateFolder)
          .expect(204)
          .then(res => {
            supertest(app)
              .get(`/api/folders/${idToUpdate}`)
              .expect(expectedFolder)
        })
      })
    })
  })
})