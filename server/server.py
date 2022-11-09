import asyncio
from websockets import serve
from ypy_websocket import WebsocketServer
from ypy_websocket.websocket_server import YRoom


class WebsocketServerWithDefaultDoc(WebsocketServer):

    def get_room(self, path: str) -> YRoom:
        if path not in self.rooms.keys():
            room = YRoom(ready=self.rooms_ready)

            doc = room.ydoc
            xml = doc.get_xml_element("root")
            with doc.begin_transaction() as txn:
                item = xml.push_xml_element(txn, "item")
                item.set_attribute(txn, "attr1", "1")
                item.set_attribute(txn, "attr2", "12")
                item.set_attribute(txn, "attr3", "123")
            print(f"initialized room '{path}' with following xml: {xml}")

            self.rooms[path] = room
        return self.rooms[path]


async def server(host: str = "localhost", port: int = 9999):
    print(f"starting server on {host}:{port} ...")
    websocket_server = WebsocketServerWithDefaultDoc()
    async with serve(websocket_server.serve, host, port):
        await asyncio.Future()  # run forever

asyncio.run(server())
