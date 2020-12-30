import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
// import { auth } from "./firebase/firebaseConfig";
// import "./firebase/firebaseConfig";

import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Avatar from "primevue/avatar";
import Checkbox from "primevue/checkbox";
import Menu from "primevue/menu";

import "primeflex/primeflex.css";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
// import "primeicons/primeicons.css";

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    //PrimeVue ui
    app.use(PrimeVue);
    app.use(ToastService);

    app.component("InputText", InputText);
    app.component("Button", Button);
    app.component("Toast", Toast);
    app.component("Avatar", Avatar);
    app.component("Checkbox", Checkbox);
    app.component("Menu", Menu);

    app.use(router);
    app.mount("#app");
  }
});
