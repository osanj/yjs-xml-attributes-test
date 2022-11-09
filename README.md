# Cropped XML Attributes in yjs?

See [y-crdt#207](https://github.com/y-crdt/y-crdt/issues/207) for the related issue. 

This is a project to reproduce a bug in yjs. When using a ypy based websocket server.
Attributes of XML elements are broken in this setup, only the _last_ character gets reaches the frontend.
In case I misunderstood something, please let me know.

There is a lot of boilerplate code to reproduce the issue, the most important places are the following:

* [server](server/server.py) sets a default document, which looks like:
  ```xml
  <UNDEFINED>
    <item attr1="a" attr2="bc" attr3="def"></item>
  </UNDEFINED>
  ```
* [client](client/index.js) receives the document, however it looks like:
  ```xml
  <undefined>
    <item attr1="a" attr2="c" attr3="f"></item>
  </undefined>
  ```

Follow the steps below to reproduce locally:


### Setup Backend

* `cd server`
* create a virtual environment for Python 3.10
* install requirements with `pip install -r requirements.txt`
* start the server with `python3 server.py`


### Setup Client

* `cd client`
* install the dependencies with `npm install`
* bundle the client code with `npx webpack`
* open `dist/index.html` in browser, open the dev tools (F12) and check console logs


### Details on Test Setup

This issue was found on the following system:
* Ubuntu 18.04.6 LTS
* Python 3.10.8
* Node v16.17.0
