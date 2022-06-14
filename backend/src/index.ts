import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());
app.use('/', require('./routes/policy'));

export { app };

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀');
});

export const server = app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
