import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/diagnosis/', diagnosesRouter);
app.use('/api/patients/', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_, response) => {
  response.send('pong');
});


app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});


