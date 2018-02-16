import mongoose from 'mongoose';
import constants from './constants';

// remove warning with promises
mongoose.Promise = global.Promise;

// connect database with the url provided
try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection.once('open', () => {
  console.log('MongoDB running')
}).on('error', (e) => {
  throw e;
})