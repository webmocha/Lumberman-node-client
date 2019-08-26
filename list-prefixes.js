const help = `
USAGE:
        node list-prefixes
`
const { readFileSync } = require('fs')
const { resolve } = require('path')
const grpc = require('grpc')
const caller = require('grpc-caller')

const PROTO_PATH = process.env.PROTO_PATH || './Lumberman/lumberman.proto'
const SERVER_ADDR = process.env.SERVER_ADDR || '127.0.0.1:9090'
const SERVICE_NAME = process.env.SERVICE_NAME || 'Logger'

if(process.argv.length > 2){
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

    const res = await client.ListPrefixes()

    console.log(res)

  }catch(err){
    console.log(err)
  }
}

init()
