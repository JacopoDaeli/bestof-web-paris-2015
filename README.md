# bestof-web-paris-2015
Repo containing the code example from my talk for Best of Web 2015 in Paris.


## Prerequisite

Install nw.js via npm globally:
```
sudo npm install -g nw
```

Install nw.js via npm locally:
```
npm install nw
```


## Stream Booth

This code is a workaround for making my demo. For real case, please check [PeerJS](http://peerjs.com).

```
# Run the web NW.JS app
$ nw streambooth

# Then open your browser
# and visit http://localhost:3002

# It can work into a LAN (sometime with a large lag)
```


## Chat Booth (extra)

This code uses WebRTC and [PeerJS](http://peerjs.com) for streaming between two peers audio and video from user devices (microphone and webcam respectively).

```
# Open a terminal and run peerjs-server
$ node pserver.js

# Open a terminal and run node-static
$ node sserver.js

# Open a window in your browser and go to http://localhost:8080/peer1.html
# Open another window in your browser and go to http://localhost:8080/peer2.html
# Authorize peer2 to access to your camera and microphone
# Now visit the peer1 window and do the same here

# Peer1 is now streaming to peer2 and viceversa.
# If you change a bit this code you can use it online between different persons too.
```

For more details visit: [http://peerjs.com](http://peerjs.com).
