# file-reader

Read all the files in a directory.

```js
import { read } from 'file-reader';

read('some/directory').then(files => {
  files.map(file => {
    // { name: 'file.txt', content: '...' }
    console.log(`file "${file.name}" contains "${file.content}"`);
  });
});
```