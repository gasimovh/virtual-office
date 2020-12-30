<template>
  <div class="users-list">
    <div class="p-d-flex p-jc-between p-p-2 p-ai-center">
      <div class="p-ml-2">
        <i class="fa fa-angle-down p-pr-1"></i>
        <span>Direct Messages</span>
      </div>
    </div>
    <div class="user p-d-flex p-p-1" v-for="user in users" :key="user.id">
      <span
        class="displayName p-ml-5"
        v-if="user.id !== currentUserId"
        @click="openDMwith(user.id)"
      >
        {{ user.displayName }}
      </span>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseConfig";
const usersCollection = db.collection("usersInSpace");

export default {
  name: "DirectMessages",
  data() {
    return {
      users: [],
      currentUserId: null,
    };
  },
  methods: {
    openDMwith(id) {
      this.$emit("userId", id);
    },
    async getAllUsersInSpace() {
      try {
        const { docs } = await usersCollection.get();

        this.users = docs.map((doc) => {
          const { id } = doc;
          const data = doc.data();
          return { id, ...data };
        });
        // console.log(this.users);
      } catch (error) {
        throw new Error("Something gone wrong!");
      }
    },
  },
  created() {},
  mounted() {
    this.getAllUsersInSpace();
    //get current user
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.currentUserId = currentUser.uid;
    }
  },
};
</script>

<style scoped>
.users-list {
  background-color: #269bb5;
  height: 50vh;
  width: 15vw;
}

.user:hover {
  background: #1a6c7e;
}
</style>