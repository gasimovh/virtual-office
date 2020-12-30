<template>
  <div class="container">
    <div class="controls p-d-flex">
      <div v-if="!renderWelcome" class="screen-share p-mr-2">
        <Button
          icon="fas fa-desktop"
          class="p-button-rounded p-button-secondary"
          @click="shareScreen()"
        />
      </div>
      <div class="video-toggle p-mr-2">
        <Button
          ref="videoIcon"
          icon="fas fa-video"
          class="p-button-rounded p-button-secondary"
          @click="toggleVideo()"
        />
      </div>
      <div class="audio-toggle p-mr-2">
        <Button
          icon="fas fa-microphone"
          class="p-button-rounded p-button-secondary"
          @click="toggleAudio()"
        />
      </div>
    </div>
    <div class="welcome-container" v-if="renderWelcome">
      <div class="guide p-shadow-4">
        <h1>Who are you having meeting with?</h1>
        <h4>Ask your team member to go Video Conference</h4>
        <h4>
          Send your username and wait their call or have their username to call.
        </h4>
        <InputText
          class="input-id"
          type="text"
          v-on:keyup.enter="callPeer(partnerId)"
          v-model="partnerId"
        />
        <Button label="Call" @click="callPeer(partnerId)"></Button>
        <h4>Your username id: {{ yourId }}</h4>
        <div class="someone-calling p-d-inline-flex p-shadow-4" v-if="caller">
          <p>A user {{ caller }} calling you!</p>
          <div class="call-buttons p-d-flex p-jc-between p-mt-6">
            <Button @click="acceptCall" label="Accept"></Button>
            <Button class="p-ml-3" @click="rejectCall" label="Reject"></Button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="user-video-card">
        <video
          class="user-video p-shadow-8"
          autoplay
          playsinline
          muted
          ref="userVideo"
        ></video>
      </div>
      <div class="partner-video-card">
        <video
          class="partner-video"
          autoplay
          playsinline
          ref="partnerVideo"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Peer from "simple-peer";
export default {
  name: "Meeting",
  data() {
    return {
      socket: io("http://localhost:8000", {
        withCredentials: true,
      }),
      yourId: "",
      users: [],
      stream: null,
      receivingCall: null,
      caller: "",
      callerSignal: null,
      callAccepted: null,
      myPeer: null,
      partnerId: null,
      renderWelcome: true,
      videoIsMute: false,
      audioIsMute: false,
    };
  },
  methods: {
    callPeer(id) {
      if (id !== "" && id !== this.yourId && this.users.includes(id)) {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          config: {
            iceServers: [
              {
                urls: "stun:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683",
              },
              {
                urls: "turn:numb.viagenie.ca",
                username: "sultan1640@gmail.com",
                credential: "98376683",
              },
            ],
          },
          stream: this.stream,
        });

        this.myPeer = peer;

        peer.on("signal", (data) => {
          this.socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: this.yourId,
          });
        });

        peer.on("stream", (stream) => {
          if (this.$refs.partnerVideo) {
            this.$refs.partnerVideo.srcObject = stream;
            this.renderWelcome = false;
          }
        });

        this.socket.on("callAccepted", (signal) => {
          this.callAccepted = true;
          peer.signal(signal);
        });

        peer.on("error", (err) => {
          console.log(err);
          //ERR_DATA_CHANNEL => user disconnected
        });
        // this.peers[id] = peer;
      }
    },
    acceptCall() {
      this.callAccepted = true;
      this.renderWelcome = false;
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.stream,
      });

      this.myPeer = peer;

      peer.on("signal", (data) => {
        this.socket.emit("acceptCall", { signal: data, to: this.caller });
      });

      peer.on("stream", (stream) => {
        this.$refs.partnerVideo.srcObject = stream;
      });

      peer.signal(this.callerSignal);

      peer.on("error", (err) => {
        console.log(err);
        // ERR_DATA_CHANNEL => user disconnected
      });
    },
    rejectCall() {
      this.caller = null;
    },
    shareScreen() {
      navigator.mediaDevices
        .getDisplayMedia({ cursor: true })
        .then((screenStream) => {
          this.myPeer.replaceTrack(
            this.stream.getVideoTracks()[0],
            screenStream.getVideoTracks()[0],
            this.stream
          );
          this.$refs.userVideo.srcObject = screenStream;
          screenStream.getTracks()[0].onended = () => {
            this.myPeer.replaceTrack(
              screenStream.getVideoTracks()[0],
              this.stream.getVideoTracks()[0],
              this.stream
            );
            this.$refs.userVideo.srcObject = this.stream;
          };
        });
    },
    toggleAudio() {
      if (this.stream) {
        this.audioIsMute = !this.audioIsMute;
        this.stream.getAudioTracks()[0].enabled = this.audioIsMute;
      }
    },

    toggleVideo() {
      if (this.stream) {
        this.videoIsMute = !this.videoIsMute;
        this.stream.getVideoTracks()[0].enabled = this.videoIsMute;
      }
    },
    turnOffStream() {
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    },
  },
  updated() {
    this.socket.on("user-disconnected", (id) => {
      // this.peers[id].destroy();
      console.log(id);
      this.$refs.partnerVideo.srcObject = null;
      this.renderWelcome = true;
    });
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.stream = stream;
        if (this.$refs.userVideo) {
          this.$refs.userVideo.srcObject = stream;
        }
      });

    this.socket.on("yourID", (id) => {
      this.yourId = id;
    });
    this.socket.on("allUsers", (users) => {
      this.users = users;
    });

    this.socket.on("hey", (data) => {
      this.receivingCall = true;
      this.caller = data.from;
      this.callerSignal = data.signal;
    });
  },
  unmounted() {
    this.turnOffStream();
  },
};
</script>

<style scoped>
#video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
}

.controls {
  margin-left: 640px;
}

.guide {
  margin-top: 180px;
  margin-left: 270px;
  border-radius: 10px;
  padding: 50px;
  width: 900px;
}

.input-id {
  margin-right: 10px;
  width: 500px;
}

.someone-calling {
  border-radius: 10px;
  padding: 20px;
}

.user-video-card {
  max-width: 9rem;
  max-height: 9rem;
  height: auto;
  width: auto;
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
}

.user-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.partner-video-card {
  width: 100%;
  height: 100%;
}

.partner-video {
  width: 100%;
  height: 100%;
}
</style>

















<!--
<template>
  <div class="home">
    <div class="chat-container">
      <cmpnt-chatbox :userId="otherUserId" :roomId="roomId" />
      <div class="room-list">
        <Button type="button" label="Create Room" @click="showAddRoomModal" />
        <div v-for="room in rooms" :key="room.id">
          <span class="roomName" @click="enterRoom(room.id)">
            {{ room.name }}
          </span>
        </div>
      </div>
      <cmpnt-chatsidebar @userId="sendUserIdToChild" />
      <div v-if="showAddRoom">
        <cmpnt-addroom @closeModal="closeAddRoomModal" :users="users" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from "../components/ChatBox.vue";
import ChatSidebar from "../components/ChatSidebar.vue";
import AddRoom from "../components/AddRoom.vue";

import firebase from "firebase";
import db from "@/firebase/firebaseConfig";

const usersCollection = db.collection("usersInSpace");
const rooms = db.collection("rooms");

export default {
  name: "Home",
  components: {
    "cmpnt-chatbox": ChatBox,
    "cmpnt-chatsidebar": ChatSidebar,
    "cmpnt-addroom": AddRoom,
  },
  data() {
    return {
      otherUserId: "", //this is id of other users
      rooms: [],
      showAddRoom: false,
      users: [],
      currentUserId: "",
      roomId: "",
    };
  },
  methods: {
    showAddRoomModal() {
      this.showAddRoom = !this.showAddRoom;
      this.getAllUsersInSpace();
    },
    closeAddRoomModal() {
      this.showAddRoom = !this.showAddRoom;
      this.fetchRooms();
    },
    sendUserIdToChild(id) {
      this.otherUserId = id;
    },
    enterRoom(roomId) {
      this.roomId = roomId;
      // console.log(this.roomId);
    },
    async fetchRooms() {
      try {
        const { docs } = await rooms.get();

        this.rooms = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    },
    async getAllUsersInSpace() {
      try {
        const { docs } = await usersCollection.get();

        this.users = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();

          return { id, ...data };
        });
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    },
  },
  created() {
    this.fetchRooms();
  },
  updated() {},
  mounted() {
    this.fetchRooms();
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.currentUserId = currentUser.uid;
    }
  },
};
</script>

<style scoped>
.room-list {
  display: flex;
  position: absolute;
  top: 350px;
  height: 400px;
  width: 100px;
  background-color: yellowgreen;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
}
</style>
-->

<!-- FOR CHAT 
<template>
  <div class="home">
    <div class="container">
      <h1>Chatroom</h1>
      <p class="username">Username: {{ username }}</p>
      <p class="online">Online: {{ users.length }}</p>
    </div>
    <component-chat v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
  </div>
</template>

<script>
import io from "socket.io-client";
import Chat from "../components/Chat.vue";
// import Map from "../components/Map.vue";

export default {
  name: "Home",
  components: {
    'component-chat': Chat,
  },
  data: function () {
    return {
      username: "",
      socket: io("http://localhost:3000", {
        withCredentials: true,
      }),
      messages: [],
      users: [],
    };
  },
  methods: {
    joinServer: function () {
      this.socket.on("loggedIn", (data) => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit("newuser", this.username);
      });

      this.listen();
    },
    listen: function () {
      this.socket.on("userOnline", (user) => {
        this.users.push(user);
      });
      this.socket.on("userLeft", (user) => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on("msg", (message) => {
        this.messages.push(message);
      });
    },
    sendMessage: function (message) {
      this.socket.emit("msg", message);
    },
  },
  created: function () {},
  mounted: function () {
    this.username = prompt("What is your username?", "Anonymous");

    if (!this.username) {
      this.username = "Anonymous";
    }

    this.joinServer();
  },
};
</script>
-->