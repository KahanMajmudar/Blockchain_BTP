import { connect } from 'mongoose'
import express, { json, urlencoded } from 'express'
import home from './routes/homepage'
import quiz from './routes/quiz_routes'
import user from './routes/user_routes'
import mail from './routes/mail_routes'
import auth from './routes/auth_routes'
const app = express()
import helmet from 'helmet'

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(helmet())
app.use('/', home)
app.use('/api/quiz', quiz)
app.use('/api/user', user)
app.use('/api/mail', mail)
app.use('/api/auth', auth)


connect('mongodb://localhost/myquiz', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Connection established succesfully!!'))
    .catch(err => console.error('Failed to establish connection', err))

app.listen(3000, () => console.log('Listening on port 3000...'))