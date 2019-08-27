const help = `Put n logs using single bidirectional rpc stream PutLogStream

USAGE:
        node put-logs-stream <Prefix> (NumLogs:1000)
`
const { resolve } = require('path')
const caller = require('grpc-caller')
const { tsToDate } = require('./utils')

const PROTO_PATH = process.env.PROTO_PATH || './Lumberman/lumberman.proto'
const SERVER_ADDR = process.env.SERVER_ADDR || '127.0.0.1:9090'
const SERVICE_NAME = process.env.SERVICE_NAME || 'Logger'

const prefix = process.argv[2]
const logsToPost = process.argv[3] || 1000
if(!prefix){
  console.log(help)
  process.exit(1)
}

const client = caller(
  SERVER_ADDR,
  resolve(__dirname, PROTO_PATH),
  SERVICE_NAME
)

const stream = client.PutLogStream()

stream.on('data', d => console.log(d))

stream.on('error', err => console.log(err.toString()))

stream.on('end', () => process.exit(0))

for (let i = 0; i < logsToPost; ++i) {
  stream.write({
    prefix,
    data: Math.random().toString(36).substring(2, 15)
  })
}

stream.end()
