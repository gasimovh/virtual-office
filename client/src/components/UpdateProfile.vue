<template>
  <div class="backdrop">
    <div class="edit-profile-container p-flex-column">
      <div class="header p-d-flex p-shadow-3">
        <h2 class="p-ml-3">Edit your profile</h2>
      </div>
      <div class="p-fluid p-mt-3 p-mx-3 p-p-2">
        <div class="p-field">
          <label for="fullName">Full Name</label>
          <InputText id="fullName" type="text" />
        </div>
        <div class="p-field">
          <label for="displayName">Display Name</label>
          <InputText id="displayName" type="text" v-model="displayName" />
          <small id="display-name-help"
            >You could add a nickname or first name</small
          >
        </div>
      </div>
      <div class="p-d-flex p-jc-end p-p-3">
        <Button
          class="p-mr-3"
          icon="fas fa-save"
          label="Save"
          @click="updateProfile"
        />
        <Toast />
        <Button
          label="Cancel"
          class="p-button-outlined"
          @click="closeUpdateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseConfig";
const usersCollection = db.collection("usersInSpace");

export default {
  data() {
    return {
      currentUserId: null,
      displayName: "",
      users: [],
    };
  },
  methods: {
    closeUpdateProfile() {
      this.$emit("closeUpdateProfile");
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
    updateProfile() {
      if (!this.displayName) {
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: "Please fill required field",
          life: 3000,
        });
      }
      if (this.displayName) {
        var user = firebase.auth().currentUser;

        user
          .updateProfile({
            displayName: this.displayName,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });

        usersCollection.doc(this.currentUserId).update({
          displayName: this.displayName,
        });
      }
    },
  },
  created() {},
  mounted() {
    var currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.currentUserId = currentUser.uid;
    }
    // console.log(this.getAllUsersInSpace());
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

.header {
  color: white;
  background: #269bb5;
}

.edit-profile-container {
  margin: 100px auto;
  color: black;
  /* padding: 10px; */
  width: 500px;
  background: white;
  border-radius: 3px;
  position: relative;
}
</style>