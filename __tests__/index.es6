import * as app from '../lib';
import fs from 'fs';
import path from 'path';
import { will } from 'willy';

const temp = path.join(__dirname, 'temp');

function makeTempFile(name, content) {
  const tempFile = path.join(temp, name);
  fs.writeFileSync(tempFile, content, 'utf8');
}

function removeTempFile(name) {
  const tempFile = path.join(temp, name);
  fs.unlinkSync(tempFile);
}

describe('app', () => {
  let fileName;

  before(() => {
    fs.mkdirSync(temp);
  });

  after(() => {
    fs.rmdirSync(temp);
  });

  beforeEach(() => {
    fileName = 'foo.txt';
    makeTempFile(fileName, 'foo');
  });

  afterEach(() => {
    removeTempFile(fileName);
  });

  it('should find all the files in a dir', (done) => {
    app.readFilesInDir(temp).then(files => {
      will(files.length).be(1);
      done();
    });
  });

  describe('results', () => {
    it('should be an object', (done) => {
      app.readFilesInDir(temp).then(files => {
        will(files[0]).beAn(Object);
      }).then(done, done);
    });

    it('should have file name', (done) => {
      app.readFilesInDir(temp).then(files => {
        will(files[0].name).be(fileName);
      }).then(done, done);
    });

    it('should have file content', (done) => {
      app.readFilesInDir(temp).then(files => {
        will(files[0].content).be('foo');
      }).then(done, done);
    });
  });
});
