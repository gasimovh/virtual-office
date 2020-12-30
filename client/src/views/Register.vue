<template>
  <div class="login">
    <Toast />
    <!-- LOGO SVG -->
    <svg
      class="logo"
      width="108"
      height="123"
      viewBox="0 0 308 323"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="logo">
        <path
          id="hexagon-3-cyan"
          opacity="0.5"
          d="M107.5 108L200.598 161.75V269.25L107.5 323L14.4023 269.25V161.75L107.5 108Z"
          fill="#31E8E8"
        />
        <path
          id="hexagon-2-green"
          opacity="0.5"
          d="M107.5 0L200.598 53.75V161.25L107.5 215L14.4023 161.25V53.75L107.5 0Z"
          fill="#31E89F"
        />
        <path
          id="hexagon-1-blue"
          opacity="0.5"
          d="M200.5 54L293.598 107.75V215.25L200.5 269L107.402 215.25V107.75L200.5 54Z"
          fill="#31C6E8"
        />
        <path
          id="text"
          d="M61.72 143H47.16C46.4507 143 45.8533 142.869 45.368 142.608C44.92 142.347 44.5653 141.861 44.304 141.152L38.816 127.432C38.48 126.611 38.2 125.901 37.976 125.304C37.752 124.669 37.5653 124.072 37.416 123.512C37.2667 122.952 37.1547 122.373 37.08 121.776C37.0427 121.141 37.024 120.376 37.024 119.48V104.696C37.024 103.987 37.1733 103.483 37.472 103.184C37.808 102.848 38.3307 102.68 39.04 102.68H47.944C48.6533 102.68 49.1947 102.848 49.568 103.184C49.9413 103.483 50.128 103.987 50.128 104.696V120.152C50.128 120.525 50.1653 120.899 50.24 121.272C50.3147 121.645 50.4267 122.037 50.576 122.448L53.208 130.288C53.32 130.661 53.4507 130.923 53.6 131.072C53.7493 131.184 53.9733 131.24 54.272 131.24H54.888C55.1867 131.24 55.4107 131.184 55.56 131.072C55.7093 130.923 55.84 130.661 55.952 130.288L58.584 122.392C58.7333 121.981 58.8453 121.589 58.92 121.216C58.9947 120.843 59.032 120.469 59.032 120.096V104.696C59.032 103.987 59.1813 103.483 59.48 103.184C59.816 102.848 60.3387 102.68 61.048 102.68H69.84C70.5493 102.68 71.0533 102.848 71.352 103.184C71.688 103.483 71.856 103.987 71.856 104.696V119.48C71.856 120.376 71.8187 121.141 71.744 121.776C71.7067 122.373 71.6133 122.952 71.464 123.512C71.3147 124.072 71.128 124.669 70.904 125.304C70.68 125.901 70.4 126.611 70.064 127.432L64.576 141.152C64.3147 141.861 63.9413 142.347 63.456 142.608C63.008 142.869 62.4293 143 61.72 143ZM79.8903 143C79.1809 143 78.6583 142.851 78.3223 142.552C78.0236 142.216 77.8743 141.693 77.8743 140.984V134.32C77.8743 133.611 78.0236 133.107 78.3223 132.808C78.6583 132.472 79.1809 132.304 79.8903 132.304H85.4343V113.488H79.8903C79.1809 113.488 78.6583 113.339 78.3223 113.04C78.0236 112.704 77.8743 112.181 77.8743 111.472V104.696C77.8743 103.987 78.0236 103.483 78.3223 103.184C78.6583 102.848 79.1809 102.68 79.8903 102.68H103.746C104.456 102.68 104.96 102.848 105.258 103.184C105.594 103.483 105.762 103.987 105.762 104.696V111.472C105.762 112.181 105.594 112.704 105.258 113.04C104.96 113.339 104.456 113.488 103.746 113.488H98.3143V132.304H103.746C104.456 132.304 104.96 132.472 105.258 132.808C105.594 133.107 105.762 133.611 105.762 134.32V140.984C105.762 141.693 105.594 142.216 105.258 142.552C104.96 142.851 104.456 143 103.746 143H79.8903ZM146.837 132.416C146.837 134.133 146.575 135.701 146.053 137.12C145.567 138.501 144.671 139.696 143.365 140.704C142.095 141.675 140.322 142.44 138.045 143C135.805 143.56 132.949 143.84 129.477 143.84C126.005 143.84 123.13 143.56 120.853 143C118.575 142.44 116.783 141.675 115.477 140.704C114.207 139.696 113.311 138.501 112.789 137.12C112.303 135.701 112.061 134.133 112.061 132.416V113.32C112.061 111.603 112.303 110.053 112.789 108.672C113.311 107.253 114.207 106.04 115.477 105.032C116.783 104.024 118.575 103.24 120.853 102.68C123.13 102.12 126.005 101.84 129.477 101.84C132.949 101.84 135.805 102.12 138.045 102.68C140.322 103.24 142.095 104.024 143.365 105.032C144.671 106.04 145.567 107.253 146.053 108.672C146.575 110.053 146.837 111.603 146.837 113.32V132.416ZM124.773 130.4C124.773 131.147 125.053 131.781 125.613 132.304C126.173 132.789 127.461 133.032 129.477 133.032C131.493 133.032 132.781 132.789 133.341 132.304C133.901 131.781 134.181 131.147 134.181 130.4V115.336C134.181 114.627 133.901 114.029 133.341 113.544C132.781 113.021 131.493 112.76 129.477 112.76C127.461 112.76 126.173 113.021 125.613 113.544C125.053 114.029 124.773 114.627 124.773 115.336V130.4ZM180.79 143H167.126C162.459 143 158.987 142.067 156.71 140.2C154.47 138.333 153.35 135.459 153.35 131.576V114.16C153.35 110.277 154.47 107.403 156.71 105.536C158.987 103.632 162.459 102.68 167.126 102.68H180.79C181.499 102.68 182.003 102.848 182.302 103.184C182.638 103.483 182.806 103.987 182.806 104.696V111.472C182.806 112.181 182.638 112.704 182.302 113.04C182.003 113.339 181.499 113.488 180.79 113.488H169.534C168.376 113.488 167.518 113.731 166.958 114.216C166.398 114.664 166.118 115.355 166.118 116.288V129.616C166.118 130.549 166.398 131.24 166.958 131.688C167.518 132.099 168.376 132.304 169.534 132.304H180.79C181.499 132.304 182.003 132.472 182.302 132.808C182.638 133.107 182.806 133.611 182.806 134.32V140.984C182.806 141.693 182.638 142.216 182.302 142.552C182.003 142.851 181.499 143 180.79 143Z"
          fill="#1D4252"
        />
      </g>
    </svg>
    <!-- Register CARD -->
    <div class="login-card p-shadow-2">
      <div class="p-fluid">
        <!-- <div class="p-field p-pt-4">
          <span class="p-float-label">
            <InputText
              id="name"
              type="text"
              v-model="name"
              @focus="atFocusInput"
            />
            <label for="name">Name</label>
          </span>
          <small v-if="isErrorName" id="errorMessage" class="p-invalid">{{
            errorMessageName
          }}</small>
        </div> -->
        <div class="p-field p-pt-4">
          <span class="p-float-label">
            <InputText
              id="email"
              type="email"
              v-model="email"
              @focus="atFocusInput"
            />
            <label for="email">Email</label>
          </span>
          <small v-if="isErrorEmail" id="errorMessage" class="p-invalid">{{
            errorMessageEmail
          }}</small>
        </div>
        <div class="p-field p-pt-3">
          <span class="p-float-label">
            <InputText
              id="password"
              type="password"
              v-model="password"
              @focus="atFocusInput"
            />
            <label for="password">Password</label>
          </span>
          <small v-if="isErrorPassword" id="errorMessage" class="p-invalid">{{
            errorMessagePassword
          }}</small>
        </div>
        <div class="p-field">
          <Button type="button" label="Register" @click="register" />
        </div>
        <div class="p-field p-pb-4">
          <router-link to="/login">Have an account?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseConfig";

export default {
  name: "Login",
  data() {
    return {
      // isErrorName: false,
      // errorMessageName: "",
      isErrorEmail: false,
      errorMessageEmail: "",
      isErrorPassword: false,
      errorMessagePassword: "",
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    // handleNameError(name) {
    //   if (!name) {
    //     this.isErrorName = true;
    //     this.errorMessageName = "Please eneter your name";
    //   }
    // },
    atFocusInput() {
      //removes the error message when focused
      this.isErrorEmail = false;
      this.isErrorPassword = false;
      this.isErrorName = false;
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          //name error
          // this.handleNameError(this.name);

          //add user to the space collection: this helps me get all users and display it in current user Chatsidebar
          let userInfo = {
            id: user.user.uid,
            displayName: user.user.displayName,
            fullName: "",
            email: user.user.email,
          };
          console.log(userInfo);
          db.collection("usersInSpace").doc(userInfo.id).set(userInfo);

          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "You have successfuly registered!",
            life: 3000,
          });

          this.$router.push("/space");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            this.isErrorPassword = true;
            this.errorMessagePassword = "The password is too weak.";
          } else if (errorCode === "auth/invalid-email") {
            this.isErrorEmail = true;
            this.errorMessageEmail = "Invalid email address.";
          } else if (errorCode === "auth/email-already-in-use") {
            this.isErrorEmail = true;
            this.errorMessageEmail = "This email address already exists.";
          } else {
            console.log(errorCode + errorMessage);
            this.$toast.add({
              severity: "error",
              summary: errorCode,
              detail: errorMessage,
              life: 3000,
            });
          }
        });
    },
  },
  mounted() {},
};
</script>

<style>
.login {
  height: 100vh;
  background-color: #f2f2f2;
}
.login-card {
  background-color: white;
  width: 400px;
  border-radius: 10px;
  margin-top: 50px;
  display: inline-block;
  padding: 32px 48px 0px 48px;
  border: 1px solid #eee;
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#errorMessage {
  /* margin-right: 150px; */
  margin-top: 3px;
}

.logo {
  margin-top: 30px;
}

/* LOGO ANIMATION */

#hexagon-3-cyan,
#hexagon-2-green,
#hexagon-1-blue {
  animation: hexa 1s ease;
  transform-origin: center;
  transform-box: fill-box;
}

@keyframes hexa {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(180deg);
  }
}

#text {
  animation: text 1s ease;
  transform-origin: center;
  transform-box: fill-box;
}

@keyframes text {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(-360deg);
  }
}
</style>