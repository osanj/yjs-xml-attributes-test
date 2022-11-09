import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const ydoc = new Y.Doc()

const websocketProvider = new WebsocketProvider('ws://localhost:9999', 'xml-demo', ydoc)

websocketProvider.on('status',event => {
    console.log(event.status)
})
