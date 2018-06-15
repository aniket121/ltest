import stageEnv from './stage';
import prodEnv from './prod';
import common from './common';

const stage = process.env.STAGE || 'stage';
// console.log(`Running build: '${stage}'`);
let env;

switch (stage) {
  case 'prod':
    env = prodEnv;
    break;
  case 'stage':
  default:
    env = stageEnv;
    break;
}

export default {
  ...env,
  ...common
};
