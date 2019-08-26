const help = `
USAGE:
        node get-log <Key Name>
`
const { resolve } = require('path')
const grpc = require('grpc')
const caller = require('grpc-caller')
const { tsToDate } = require('./utils')

const PROTO_PATH = process.env.PROTO_PATH || './Lumberman/lumberman.proto'
const SERVER_ADDR = process.env.SERVER_ADDR || '127.0.0.1:9090'
const SERVICE_NAME = process.env.SERVICE_NAME || 'Logger'

const key = process.argv[2]
if(!key){
  console.log(help)
  process.exit(1)
}

const client = caller(
  SERVER_ADDR,
  resolve(__dirname, PROTO_PATH),
  SERVICE_NAME
)

const init = async () => {
  try{

    const { timestamp, data } = await client.GetLog({ key })
    console.log({
      timestamp: tsToDate(timestamp),
      data
    })

  }catch(err){
    console.log(err)
  }
}

init()
