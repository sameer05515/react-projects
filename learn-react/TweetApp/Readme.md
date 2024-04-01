# Docker compose commands used in this project

## Docker compose to rebuild
```
docker-compose build
```

## Docker compose to rebuild forcefully
```
docker-compose build --no-cache
```

## Docker compose up
```
docker-compose up
```

## Docker compose check logs

To all Services
```
docker-compose logs
```

For backend service
```
docker-compose logs backend
```

## Troubleshooting

### For connection error
```
tweetapp-frontend-1  | webpack compiled with 1 warning
tweetapp-backend-1   | /app/node_modules/mongoose/lib/connection.js:809
tweetapp-backend-1   |     err = new ServerSelectionError();
tweetapp-backend-1   |           ^
tweetapp-backend-1   |
tweetapp-backend-1   | MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
tweetapp-backend-1   |     at _handleConnectionErrors (/app/node_modules/mongoose/lib/connection.js:809:11)
tweetapp-backend-1   |     at NativeConnection.openUri (/app/node_modules/mongoose/lib/connection.js:784:11) {
tweetapp-backend-1   |   reason: TopologyDescription {
tweetapp-backend-1   |     type: 'Unknown',
tweetapp-backend-1   |     servers: Map(1) {
tweetapp-backend-1   |       '127.0.0.1:27017' => ServerDescription {
tweetapp-backend-1   |         address: '127.0.0.1:27017',
tweetapp-backend-1   |         type: 'Unknown',
tweetapp-backend-1   |         hosts: [],
tweetapp-backend-1   |         passives: [],
tweetapp-backend-1   |         arbiters: [],
tweetapp-backend-1   |         tags: {},
tweetapp-backend-1   |         minWireVersion: 0,
tweetapp-backend-1   |         maxWireVersion: 0,
tweetapp-backend-1   |         roundTripTime: -1,
tweetapp-backend-1   |         lastUpdateTime: 1895017,
tweetapp-backend-1   |         lastWriteDate: 0,
tweetapp-backend-1   |         error: MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
tweetapp-backend-1   |             at connectionFailureError (/app/node_modules/mongodb/lib/cmap/connect.js:367:20)
tweetapp-backend-1   |             at Socket.<anonymous> (/app/node_modules/mongodb/lib/cmap/connect.js:290:22)
tweetapp-backend-1   |             at Object.onceWrapper (node:events:633:26)
tweetapp-backend-1   |             at Socket.emit (node:events:518:28)
tweetapp-backend-1   |             at emitErrorNT (node:internal/streams/destroy:169:8)
tweetapp-backend-1   |             at emitErrorCloseNT (node:internal/streams/destroy:128:3)
tweetapp-backend-1   |             at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
tweetapp-backend-1   |           cause: Error: connect ECONNREFUSED 127.0.0.1:27017
tweetapp-backend-1   |               at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1605:16) {
tweetapp-backend-1   |             errno: -111,
tweetapp-backend-1   |             code: 'ECONNREFUSED',
tweetapp-backend-1   |             syscall: 'connect',
tweetapp-backend-1   |             address: '127.0.0.1',
tweetapp-backend-1   |             port: 27017
tweetapp-backend-1   |           },
tweetapp-backend-1   |           [Symbol(errorLabels)]: Set(1) { 'ResetPool' }
tweetapp-backend-1   |         },
tweetapp-backend-1   |         topologyVersion: null,
tweetapp-backend-1   |         setName: null,
tweetapp-backend-1   |         setVersion: null,
tweetapp-backend-1   |         electionId: null,
tweetapp-backend-1   |         logicalSessionTimeoutMinutes: null,
tweetapp-backend-1   |         primary: null,
tweetapp-backend-1   |         me: null,
tweetapp-backend-1   |         '$clusterTime': null
tweetapp-backend-1   |       }
tweetapp-backend-1   |     },
tweetapp-backend-1   |     stale: false,
tweetapp-backend-1   |     compatible: true,
tweetapp-backend-1   |     heartbeatFrequencyMS: 10000,
tweetapp-backend-1   |     localThresholdMS: 15,
tweetapp-backend-1   |     setName: null,
tweetapp-backend-1   |     maxElectionId: null,
tweetapp-backend-1   |     maxSetVersion: null,
tweetapp-backend-1   |     commonWireVersion: 0,
tweetapp-backend-1   |     logicalSessionTimeoutMinutes: null
tweetapp-backend-1   |   },
tweetapp-backend-1   |   code: undefined
tweetapp-backend-1   | }
tweetapp-backend-1   |
tweetapp-backend-1   | Node.js v20.12.2
tweetapp-backend-1   | [nodemon] app crashed - waiting for file changes before starting..
```

if you're using Docker Desktop for Windows, you can use the special hostname host.docker.internal to refer to the host machine from within Docker containers. This hostname resolves to the host machine's IP address.

Here's how you can use it in your Docker Compose file:

```
services:
  backend:
    environment:
      - MONGODB_URI=mongodb://host.docker.internal:27017/your_database_name

```

