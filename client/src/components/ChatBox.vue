<template>
  <div class="chatbox">
    <div class="chat-nav p-d-flex p-shadow-3 p-jc-between p-p-2">
      <span class="display-name">{{ partnerDisplayName }}</span>
      <Button
        icon="fas fa-video"
        label="Video Conference"
        @click="startConference"
      ></Button>
    </div>
    <div class="chat-screen p-p-2">
      <div
        :class="message.senderId !== userId ? 'isBlue' : 'isGrey'"
        class="message"
        v-for="message in messages"
        :key="message.index"
      >
        <div class="p-d-flex">
          <div class="p-mt-3">
            <Avatar
              :label="message.username.charAt(0)"
              class="avatar"
              size="large"
            />
          </div>
          <div class="p-d-flex p-flex-column">
            <div class="p-d-flex">
              <p class="username">{{ message.username }}</p>
              <p class="time">{{ message.time }}</p>
            </div>
            <div class="p-d-flex">
              <p class="msg p-ml-2" id="msg">
                {{ message.msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-area p-d-flex p-ai-start p-p-2">
      <InputText
        class="text-field p-mb-2"
        type="text"
        v-on:keyup.enter="sendMsg"
        v-model="input"
      />
      <button class="emoji-button" @click="chooseEmoji">&#128516;</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import moment from "moment";
import db from "@/firebase/firebaseConfig";
import { EmojiButton } from "@joeattardi/emoji-button";
const usersCollection = db.collection("usersInSpace");

export default {
  name: "Chatbox",
  //current user needs other user's id which is "userId"
  props: ["userId", "roomId"],
  data() {
    return {
      messages: [],
      input: "",
      displayName: "",
      partnerDisplayName: "",
      currentUserId: "",
      dmAndRmSwitch: "",
    };
  },
  watch: {
    //listen to prop changes
    userId() {
      this.dmAndRmSwitch = "dm";
      this.fetchDMs();
      this.setPartnerDisplayName();
    },
    roomId() {
      this.dmAndRmSwitch = "rm";
      this.fetchRoomMessages();
    },
  },
  methods: {
    createDMCollection() {
      const idDM = [this.currentUserId, this.userId].sort().join("_"); //sort is important
      return db.collection("dms").doc(idDM).collection("messages");
    },
    createRoomMessagesCollection() {
      return db.collection("rooms").doc(this.roomId).collection("messages");
    },
    fetchRoomMessages() {},
    fetchDMs() {
      return this.createDMCollection(this.userId)
        .orderBy("time")
        .onSnapshot((querySnapshot) => {
          let messagesDoc = [];
          querySnapshot.forEach((doc) => {
            messagesDoc.push(doc.data());
          });
          this.messages = messagesDoc;
        });
    },
    sendMsg() {
      let message = {
        senderId: this.currentUserId,
        username: this.displayName,
        msg: this.input,
        time: moment().utcOffset("+0100").format("HH:mm"),
      };
      this.messages.push(message);
      this.createDMCollection().add(message);
      this.input = "";
      this.fetchDMs();
    },
    chooseEmoji() {
      const emojiButton = document.querySelector(".emoji-button");

      //chat elements
      const picker = new EmojiButton({
        autoHide: false,
      });

      picker.on("emoji", (selection) => {
        this.input += selection.emoji;
      });
      picker.togglePicker(emojiButton);
    },
    startConference() {
      this.$router.push("/");
    },
    setPartnerDisplayName() {
      usersCollection
        .doc(this.userId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            const data = doc.data();
            console.log(data);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.displayName = user.displayName;
        this.currentUserId = user.uid;
        console.log(this.displayName);
      } else {
        this.currentUser = null;
      }
    });
  },
  updated() {
    //fetch messages in here
  },
  mounted() {
    // console.log(this.displayName);
    // if (this.dmAndRmSwitch === "dm") {
    // } else if (this.dmAndRmSwitch === "rm") {
    // } else {
    //   console.log("Select room or message");
    // }
    // console.log(this.roomId);
    // console.log(this.roomId);
    //set time and date
    //console.log(moment().utcOffset("+0100").format("YYYY-MM-DD HH:mm"));
  },
};
</script>

<style scoped>
.chat-nav {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 1;
  height: 8vh;
}

.display-name {
  padding: 12px;
}

.chatbox {
  height: 92vh;
  width: 85vw;
  background-color: white;
  flex-direction: column;
}
.chat-screen {
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* .input-area {
  position: relative;
} */

.text-field {
  width: 96%;
}

.emoji-button {
  /* position: absolute; */
  /* left: 88.5%; */
  font-size: 1.9rem;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.send-button {
  margin-left: 10px;
}

.isBlue .avatar {
  background-color: #2196f3;
  color: #ffffff;
}

.msg {
  /* padding: 10px; */
  position: absolute;
  margin-top: -10px;
  overflow-wrap: break-word;
  text-align: left;
}

.username {
  font-weight: bold;
  margin-left: 5px;
}

.time {
  margin-left: 5px;
  margin-top: 19px;
  font-size: 0.8em;
}
</style>