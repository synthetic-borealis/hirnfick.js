const hirnfick = require('../index');
const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const helloWorldCode = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

describe('Transpilers tests', () => {
  describe('transpileToCpp tests (dynamic memory)', () => {
    const outputCode = hirnfick.transpileToCpp(helloWorldCode, true);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.cpp';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C++ code', () => {
      return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C++ code', () => {
      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

        exec(commandToRun)
          .then(({stdout, stderr}) => {
            if (stdout.trim() === 'Hello World!') {
              done();
            } else {
              done(new Error('Incorrect output'));
            }
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });

  describe('transpileToCpp tests (fixed memory)', () => {
    const outputCode = hirnfick.transpileToCpp(helloWorldCode, false);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.cpp';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C++ code', () => {
      return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C++ code', () => {
      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

        exec(commandToRun)
          .then(({stdout, stderr}) => {
            if (stdout.trim() === 'Hello World!') {
              done();
            } else {
              done(new Error('Incorrect output'));
            }
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });
});
