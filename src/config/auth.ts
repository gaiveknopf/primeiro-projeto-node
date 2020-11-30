import { predicateAwareClassFactory } from 'tsyringe';

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
