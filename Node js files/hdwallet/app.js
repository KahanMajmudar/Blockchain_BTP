import express, { json, urlencoded, static } from 'express';
const app = express();
import helmet from 'helmet';
import wallet from './routes/wallet_routes';



app.use(json());
app.use(urlencoded({ extended: true }));
app.use(static('public'));
app.use(helmet());
app.use('/api/wallet', wallet)

app.listen(3000, () => {

    console.log('Listening on port 3000');

});