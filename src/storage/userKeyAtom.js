import {
  atom
} from 'recoil'

const userKey = atom({
  key: 'userKey',
  default: null,
});

export default userKey;
