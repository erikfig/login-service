export default () => ({
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,
  JWT_SECRET: process.env.JWT_SECRET,
});
