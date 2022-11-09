import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const ydoc = new Y.Doc();
let xmlRoot = null;

const websocketProvider = new WebsocketProvider('ws://localhost:9999', 'xml-demo', ydoc);

websocketProvider.on('status',event => {
    console.log('[ws] ' + event.status);
    if (event.status === 'connected') {
        xmlRoot = ydoc.get('root', Y.XmlElement);
    }
})

websocketProvider.on('sync',state => {
    console.log('[ws] sync');
    if (xmlRoot === null) {
        console.log('xml not initialized');
    } else {
        console.log('xml after sync:');
        console.log(xmlRoot.toString());
        console.log('attributes of ' + xmlRoot.firstChild.nodeName + ' from api:');
        console.log(xmlRoot.firstChild.getAttributes());
    }
})
