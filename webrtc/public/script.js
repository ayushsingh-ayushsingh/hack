const socket = io("/");
const myPeer = new Peer(); // Uses PeerJS cloud server

const myVideo = document.createElement("video");
myVideo.muted = true;

const videoGrid = document.getElementById("video-grid");
const peers = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    // Answer incoming calls
    myPeer.on("call", call => {
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", userVideoStream => {
            addVideoStream(video, userVideoStream);
        });

        call.on("close", () => {
            video.remove();
        });

        peers[call.peer] = call;
    });

    // When a new user connects, call them
    socket.on("user-connected", userId => {
        connectToNewUser(userId, stream);
    });
});

// When a user disconnects
socket.on("user-disconnected", userId => {
    if (peers[userId]) {
        peers[userId].close();
        delete peers[userId];
    }
});

// When connected to PeerJS server, notify Socket.io server
myPeer.on("open", id => {
    socket.emit("join-room", ROOM_ID, id);
});

// Call a new user
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement("video");

    call.on("stream", userVideoStream => {
        addVideoStream(video, userVideoStream);
    });

    call.on("close", () => {
        video.remove();
    });

    peers[userId] = call;
}

// Add video to the DOM
function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
}
