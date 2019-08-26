# Lumberman-node-client

Lumberman client reference implementation for node

## Requirements

```sh
git submodule init
git submodule update
npm install
```

copy `ca.crt`, `client.crt`, `client.key` to `certs/`

## Lumberman LogService

see [lumberman.proto](https://github.com/webmocha/Lumberman/blob/master/lumberman.proto)

## Usage

### Write to Log

```sh
node log <Prefix> <Log Object>
```

examples:

```sh
node log user-search 'cat'
```

```sh
node log user-click '{ "href": "/login" }'
```

```sh
node log player-move '{ "x": 20, "y": -42, "z": 1 }'
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

```javascript
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

```javascript
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

### Stream Logs by prefix

```sh
node stream-logs <Prefix>
```

example:

```sh
node stream-logs user-click
```

output:

```javascript
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
    'cat',
    'user-click',
    'player-move'
  ]
}
```

### List Log keys by prefix

```sh
node list-logs <Prefix>
```

example:

```sh
node list-logs user-click
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
