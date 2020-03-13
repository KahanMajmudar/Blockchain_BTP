import express, { json, urlencoded } from 'express'
import helmet from 'helmet'

const app = express()

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(helmet())

app.listen(3000, () => console.log('Listening on port 3000...'))
