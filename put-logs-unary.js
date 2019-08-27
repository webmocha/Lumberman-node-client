const help = `Put n logs using unary rpc calls to PutLog

USAGE:
        node put-logs-unary <Prefix> (n:1000)
`
const { resolve } = require('path')
const grpc = require('grpc')
const caller = require('grpc-caller')

const PROTO_PATH = process.env.PROTO_PATH || './Lumberman/lumberman.proto'
const SERVER_ADDR = process.env.SERVER_ADDR || '127.0.0.1:9090'
const SERVICE_NAME = process.env.SERVICE_NAME || 'Logger'

const prefix = process.argv[2]
const logsToPost = process.argv[3] || 1000
if(!prefix){
  console.log(help)
  process.exit(1)
}


(async () => {

  const client = caller(
    SERVER_ADDR,
    resolve(__dirname, PROTO_PATH),
    SERVICE_NAME
  )

  for (let i = 0; i < logsToPost; ++i) {
    res = await client.PutLog({
      prefix,
      data: Math.random().toString(36).substring(2, 15)
    })

    console.log(res)
  }

})()
