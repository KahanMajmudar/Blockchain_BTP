import express, { json, urlencoded } from 'express';
const app = express();
import helmet from 'helmet';

import token from './routes/token_routes';
import ico from './routes/ico_routes';
import account from './routes/account_routes';

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/token', token)
app.use('/api/ico', ico)
app.use('/api/account', account)


app.listen(3000, () => console.log('Listening on port 3000...'));

