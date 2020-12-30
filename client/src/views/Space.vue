<template>
  <div class="space p-d-flex">
    <div class="side p-d-flex">
      <div class="chats p-flex-column">
        <div class="room-list">
          <div class="side-nav p-d-flex p-shadow-3">
            <Button
              class="side-nav-button p-m-3 p-button-rounded p-button-outlined"
              icon="fas fa-user"
              style="background: white"
              @click="toggle"
              aria-haspopup="true"
              aria-controls="overlay_menu"
            ></Button>
            <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
            <span class="p-mt-4">Hi, {{ displayName }}!</span>
          </div>
          <div class="p-d-flex p-jc-between p-mt-2 p-p-2 p-ai-center">
            <div class="p-ml-2">
              <i class="fa fa-angle-down p-pr-1"></i>
              <span>Rooms</span>
            </div>
            <Button
              icon="fas fa-plus"
              class="p-button-rounded p-button-outlined"
              style="background: white"
              @click="showAddRoomModal"
            />
          </div>
          <div class="room p-d-flex p-p-1" v-for="room in rooms" :key="room.id">
            <i
              class="fa fa-user-friends p-ml-5 p-mt-1"
              style="font-size: 0.73em"
            ></i>
            <span class="roomName p-ml-2" @click="enterRoom(room.id)">
              {{ room.name }}
            </span>
          </div>
        </div>
        <cmpnt-dms @userId="sendUserIdToChild" />
        <div v-if="showAddRoom">
          <cmpnt-addroom @closeModal="closeAddRoomModal" :users="users" />
        </div>
        <div v-if="showUpdateProfile">
          <cmpnt-updateprofile @closeUpdateProfile="closeUpdateProfileModal" />
        </div>
      </div>
    </div>
    <cmpnt-chatbox :userId="otherUserId" :roomId="roomId" />
  </div>
</template>

<script>
import ChatBox from "../components/ChatBox.vue";
import DirectMessages from "../components/DirectMessages.vue";
import AddRoom from "../components/AddRoom.vue";
import UpdateProfile from "../components/UpdateProfile.vue";

import firebase from "firebase";
import db from "@/firebase/firebaseConfig";

const usersCollection = db.collection("usersInSpace");
// const currentUserRef = db.collection("usersInSpace").doc(this.currentUserId);
const rooms = db.collection("rooms");

export default {
  name: "Space",
  components: {
    "cmpnt-chatbox": ChatBox,
    "cmpnt-dms": DirectMessages,
    "cmpnt-addroom": AddRoom,
    "cmpnt-updateprofile": UpdateProfile,
  },
  data() {
    return {
      otherUserId: "", //this is id of other users
      displayName: null,
      rooms: [],
      showAddRoom: false,
      showUpdateProfile: false,
      users: [],
      currentUserId: "",
      roomId: "",
      items: [
        {
          label: "Options",
          items: [
            {
              label: "Edit profile",
              icon: "fas fa-user-edit",
              command: () => {
                this.showUpdateProfileModal();
              },
            },
            {
              label: "Log out",
              icon: "fas fa-sign-out-alt",
              command: () => {
                firebase.auth().signOut();
                this.$router.push("/login");
              },
            },
          ],
        },
      ],
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
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    showUpdateProfileModal() {
      this.showUpdateProfile = !this.showUpdateProfile;
      // this.getAllUsersInSpace();
    },
    closeUpdateProfileModal() {
      this.showUpdateProfile = !this.showUpdateProfile;
      //fetch the updates
      //....
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
      this.displayName = currentUser.displayName;
    }

    //set displayname
  },
};
</script>

<style scoped>
/* .space {
  
} */
.side {
  color: white;
}

/* .side-bar {
  width: 5vw;
  border: 2px solid orange;
} */

.side-nav {
  height: 8vh;
}

.room:hover {
  background: #1a6c7e;
}

.chats {
  height: 100vh;
  /* overflow-y: hidden; */
}

.room-list {
  width: 15vw;
  background-color: #269bb5;
  /* padding: 0.75rem; */
  /* overflow-y: scroll; */
  height: 50vh;
}
</style>
