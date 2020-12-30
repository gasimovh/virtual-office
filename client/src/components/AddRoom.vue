<template>
  <div class="backdrop">
    <div class="add-room-modal p-flex-column">
      <div class="header p-d-flex p-shadow-3">
        <h2 class="p-ml-3">Create Room</h2>
      </div>
      <div class="room-info p-d-flex">
        <div>
          <InputText
            class="p-ml-5 p-mt-3"
            id="room-name"
            type="text"
            placeholder="Name your room"
            v-model="roomName"
          />
        </div>
      </div>
      <div class="users p-field-checkbox" v-for="user of users" :key="user.id">
        <Checkbox
          class="p-ml-5"
          :id="user.id"
          name="user"
          :value="user"
          v-model="selectedUsers"
          v-if="user.id !== currentUserId"
        />
        <label v-if="user.id !== currentUserId" :for="user.id">{{
          user.email
        }}</label>
      </div>
      <div class="p-d-flex p-jc-end p-p-3">
        <Button
          class="p-mr-3"
          icon="fas fa-save"
          label="Save"
          @click="createRoom"
        />
        <Toast />
        <Button label="Cancel" class="p-button-outlined" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseConfig";

export default {
  name: "AddRoom",
  props: {
    users: Array,
  },
  data() {
    return {
      selectedUsers: [],
      roomName: "",
      isDisabled: false,
      currentUserId: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    createRoom() {
      //for auto generated room uid
      const newRoomRef = db.collection("rooms").doc();

      //add current user to selectedUser array
      var index = this.users.findIndex(
        (user) => user.id === this.currentUserId
      );
      this.selectedUsers.push(this.users[index]);

      let newRoom = {
        name: this.roomName,
        createdBy: this.currentUserId,
      };

      if (!newRoom.name) {
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: "Please name your room.",
          life: 3000,
        });
      } else if (
        this.selectedUsers === undefined ||
        this.selectedUsers.length == 0
      ) {
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: "Please select users to add to your room.",
          life: 3000,
        });
      } else {
        //add room details
        newRoomRef.set(newRoom);

        //add subcollection of group members
        this.selectedUsers.forEach((user) =>
          newRoomRef.collection("members").doc(user.id).set(user)
        );

        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "You've created your room.",
          life: 1000,
        });
        setTimeout(() => this.closeModal(), 1000);
      }
    },
  },
  computed() {},
  mounted() {
    //get current user
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.currentUserId = currentUser.uid;
    }
  },
};
</script>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.add-room-modal {
  color: black;
  margin: 100px auto;
  width: 500px;
  background: white;
  border-radius: 3px;
  position: relative;
}

.header {
  color: white;
  background: #269bb5;
}

.users {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>