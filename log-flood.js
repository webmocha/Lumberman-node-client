const help = `Repeatedly Puts Log for 10 minutes

USAGE:
        node log <Prefix>
`
const { resolve } = require('path')
const grpc = require('grpc')
const caller = require('grpc-caller')

const PROTO_PATH = process.env.PROTO_PATH || './Lumberman/lumberman.proto'
const SERVER_ADDR = process.env.SERVER_ADDR || '127.0.0.1:9090'
const SERVICE_NAME = process.env.SERVICE_NAME || 'Logger'

const prefix = process.argv[2]
if(!prefix){
  console.log(help)
  process.exit(1)
}

const client = caller(
  SERVER_ADDR,
  resolve(__dirname, PROTO_PATH),
  SERVICE_NAME
)

const end = new Date()
end.setMinutes( end.getMinutes() + 10 );

(async () => {
  while(new Date() < end)
    await client.Log({
      prefix,
      data: Math.random().toString(36).substring(2, 15)
    })

  console.log("DONE")
  process.exit(0)
})()