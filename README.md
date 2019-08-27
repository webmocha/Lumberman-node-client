<p align="center">
  <img src="https://user-images.githubusercontent.com/132562/63731122-1730de80-c823-11e9-833f-3e4c91670a46.png" alt="Lumberman node client" />
</p>

<h1 align="center">Lumberman node client</h1>

<p align="center">
  <strong><a href="https://github.com/webmocha/Lumberman">Lumberman</a> client reference implementation for node</strong>
</p>

## Requirements

```sh
git submodule init
git submodule update
npm install
```

## Lumberman LogService

see [lumberman.proto](https://github.com/webmocha/Lumberman/blob/master/lumberman.proto)

## Usage

### Write to Log

```sh
node log <Prefix> <Log Object>
```

examples:

```sh
node put-log user-search 'cat'
```

```sh
node put-log user-click '{ "href": "/login" }'
```

```sh
node put-log player-move '{ "x": 20, "y": -42, "z": 1 }'
```

### Get Log by key

```sh
node get-log <Key Name>
```

example:

```sh
node get-log 'user-click|2019-08-26T06:19:02.662282619Z'
```

output:

```
{
  timestamp: 2019-08-26T06:19:02.000Z,
  data: '{ "href": "/login" }'
}
```

### Get all Logs by prefix

```sh
node get-logs <Prefix>
```

example:

```sh
node get-logs user-search
```

output:

```
[
  {
    key: 'user-search|2019-08-26T01:30:42.620978567Z',
    timestamp: 2019-08-26T01:30:42.000Z,
    data: 'cat'
  },
  {
    key: 'user-search|2019-08-26T01:31:38.844208133Z',
    timestamp: 2019-08-26T01:31:38.000Z,
    data: 'doggo'
  },
  {
    key: 'user-search|2019-08-26T01:31:42.385940486Z',
    timestamp: 2019-08-26T01:31:42.000Z,
    data: 'birb'
  }
]
```

### Get all Logs as stream by prefix

```sh
node get-logs-stream <Prefix>
```

example:

```sh
node get-logs-stream user-search
```

output:

```
{
  key: 'user-search|2019-08-26T01:30:42.620978567Z',
  timestamp: 2019-08-26T01:30:42.000Z,
  data: 'cat'
}
{
  key: 'user-search|2019-08-26T01:31:38.844208133Z',
  timestamp: 2019-08-26T01:31:38.000Z,
  data: 'doggo'
}
{
  key: 'user-search|2019-08-26T01:31:42.385940486Z',
  timestamp: 2019-08-26T01:31:42.000Z,
  data: 'birb'
}
```

### Stream Logs by prefix

_stream stays open, tailing new log events_

```sh
node tail-log-stream <Prefix>
```

example:

```sh
node tail-log-stream user-click
```

output:

```
{
  key: 'user-click|2019-08-26T06:19:00.062988065Z',
  timestamp: 2019-08-26T06:19:00.000Z,
  data: '{ "href": "/login" }'
}
{
  key: 'user-click|2019-08-26T06:19:02.662282619Z',
  timestamp: 2019-08-26T06:19:02.000Z,
  data: '{ "href": "/forgot-password" }'
}
```

### List Log prefixes

```sh
node list-prefixes
```

example output:

```javascript
{
  prefixes: [
    'user-search',
    'user-click',
    'player-move'
  ]
}
```

### List Log keys by prefix

```sh
node list-keys <Prefix>
```

example:

```sh
node list-keys user-click
```

output:

```javascript
{
  keys: [
    'user-click|2019-08-26T01:30:42.620978567Z',
    'user-click|2019-08-26T01:31:38.844208133Z',
    'user-click|2019-08-26T01:31:42.385940486Z',
    'user-click|2019-08-26T05:25:41.549802845Z',
    'user-click|2019-08-26T05:42:58.65184948Z',
    'user-click|2019-08-26T05:43:15.077297504Z',
    'user-click|2019-08-26T06:04:50.466458446Z',
    'user-click|2019-08-26T06:06:54.682056656Z',
    'user-click|2019-08-26T06:13:31.879048497Z',
    'user-click|2019-08-26T06:15:37.24192515Z',
    'user-click|2019-08-26T06:19:00.062988065Z',
    'user-click|2019-08-26T06:19:02.662282619Z'
  ]
}
```

### Put n logs by calling n unary rpc calls

Default `n: 1000`

```sh
node put-logs-unary <Prefix> (n:1000)
```

example:

```sh
node put-logs-unary 'test-unary' 2500
```

### Put n logs using single bidirectional rpc stream

Default `n: 1000`

```sh
node put-logs-stream <Prefix> (n:1000)
```

example:

```sh
node put-logs-stream 'test-stream' 2500
```
