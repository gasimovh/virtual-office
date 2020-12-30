<template>
  <div class="chat">
    <div class="chat-container">
      <div class="chat-screen">
        <div
          v-bind:class="{ messageBox: available }"
          v-for="message in messages"
          v-bind:key="message.index"
        >
          <p class="username">{{ message.username }}:</p>
          <p class="text" id="message">
            {{ message.msg }}
          </p>
          <!--<span class="time">{{ message.time }}</span>-->
        </div>
      </div>
      <div class="input-area">
        <input type="text" v-on:keyup.enter="sendMsg" v-model="input" />
        <button class="emoji-button" v-on:click="chooseEmoji">&#128516;</button>
        <button class="send-button" v-on:click="sendMsg">Send</button>
      </div>
    </div>
  </div>
</template>


<script>
import { EmojiButton } from "@joeattardi/emoji-button";

export default {
  name: "Chat",
  props: ["messages"],
  data() {
    return {
      input: "",
      available: false,
    };
  },
  methods: {
    sendMsg() {
      //const input = document.querySelector("input");
      if (this.input) {
        const chatScreen = document.querySelector(".chat-screen");
        //create message object. TO-DO: create a user class
        /*var _id = Math.random(100);
        var message = {
          id: _id,
          username: "Dan",
          text: this.input,
          time: "11.11.2020",
        };*/
        //push object to messages array
        //this.messages.push(message);

        //emit message to "Home"
        this.$emit("sendMessage", this.input);

        //make the background grey with dynamic css class "available"
        this.available = true;
        //clear input
        this.input = "";
        //scroll down
        chatScreen.scrollTop = chatScreen.scrollHeight;
      }
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
  },
  created() {},
  mounted() {},
};
</script>



<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

/* Chat Box */
.chat-container {
  display: flex;
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /* bottom: 80px;
	right: 120px; */
  height: 600px;
  width: 800px;
  background-color: white;
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
}

.chat-screen {
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;
}

.messageBox {
  background-color: dodgerblue;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
}

.messageBox .text,
.username {
  color: rgb(213, 210, 210);
  padding: 0.5rem;
  /* border-radius: 25px; */
  margin-left: 0.5rem;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4); */
}

.messageBox .text {
  word-break: break-all;
  color: white;
}

.messageBox .time {
  color: rgb(213, 210, 210);
  position: absolute;
  right: 5px;
  top: 5px;
}

.input-area {
  position: relative;
  display: flex;
  justify-content: center;
}

input[type="text"] {
  width: 100%;
  border: 1px solid dodgerblue;
  font-size: 1rem;
  border-radius: 1px;
  height: 2.5rem;
}

.emoji-button {
  position: absolute;
  font-size: 1.9rem;
  background: transparent;
  right: 60px;
  top: 2px;
  border: none;
  outline: none;
  cursor: pointer;
}

.send-button {
  padding: 0.5rem 0.5rem;
  margin-left: 0.5rem;
  background-color: green;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: none;
  outline: none;
  cursor: pointer;
}

.available {
  background-color: grey;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
}

.available .text,
.username {
  color: white;
  padding: 0.5rem;
  /* border-radius: 25px; */
  margin-left: 0.5rem;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4); */
}

.message-box .text {
  word-break: break-all;
}

.message-box .time {
  color: white;
  position: absolute;
  right: 5px;
  top: 5px;
}
/* Chat Box ends */

/*
#canvas {
	border: 1px solid #000000;
}*/
</style>
