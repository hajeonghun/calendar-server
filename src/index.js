//======================= init() =======================//
require('dotenv').config()
const {
    PORT:port,
} = process.env

const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router() 

const bodyParser = require('koa-bodyparser')

const rest = require('./rest')

const cors = require('@koa/cors')

//======================= looooogic() =======================//

router.get('/', rest.list)
router.get('/:id', rest.read)
router.post('/', rest.write)
router.delete('/:id', rest.remove)
router.patch('/:id', rest.update)


app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
    console.log('listening to port '+port)
})



