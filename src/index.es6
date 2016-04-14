import fs from 'fs';
import path from 'path';

function getFilesInDir(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function getFileNameFromPath(filePath) {
  const regex = new RegExp(`[^\\${path.sep}]+$`);
  return filePath.match(regex)[0];
  // return path.parse(filePath).name;
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          name: getFileNameFromPath(filePath),
          content,
        });
      }
    });
  });
}

export function readFilesInDir(dirPath) {
  return new Promise((resolve, reject) => {
    getFilesInDir(dirPath).then(
      files => {
        const promises = files.map(file => {
          return readFile(path.join(dirPath, file));
        });

        Promise.all(promises)
          .then(resolve)
          .catch(reject);
      },
      reject
    );
  });
}
