import express from 'express';
import constants from './config/constants';
import middlewareConfig from './config/middleware';
const app = express();

// use middleware
middlewareConfig(app);

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(
      `Server is running on PORT: ${constants.PORT} --- Running on ${process.env.NODE_ENV} --- Make something great!`
    );
  }
});
