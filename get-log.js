const help = `
USAGE:
        node get-log <Key Name>
`
const { readFileSync } = require('fs')
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

let credentials
  credentials = grpc.credentials.createInsecure()

const client = caller(
  SERVER_ADDR,
  resolve(__dirname, PROTO_PATH),
  SERVICE_NAME,
  credentials
)

const init = async () => {
  try{

    let { timestamp, data } = await client.GetLog({ key })
    console.log({
      timestamp: tsToDate(timestamp),
      data
    })

  }catch(err){
    console.log(err)
  }
}

init()
