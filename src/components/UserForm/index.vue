<template>
  <form
    class="bg-white shadow-md rounded h-auto w-full md:w-2/4 py-10 px-6 lg:px-48"
    @input="onChange"
  >
    <Heading text="User form" />
    <Input
      v-for="field in fields"
      :key="field.id"
      :id="field.id"
      :label="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      v-model="firebaseData[field.id]"
      :disabled="state === states.LOADING"
    />
    <p>
      Form completed: {{ firebaseData ? firebaseData.completion : 0 }}%<br />
      State: {{ state }}
    </p>
    <small v-if="state === states.ERROR" class="text-orange-800">{{
      this.errorMessage
    }}</small>
  </form>
</template>

<script>
import Heading from "../Heading";
import Input from "../Input";
import db from "../../firebase";

import UserDataModel from "./UserDataModel";
import { config, STATES } from "./config";

const docRef = db.collection(config.collection).doc(config.doc);

export default {
  name: "UserForm",
  components: {
    Input,
    Heading,
  },

  // Event binding
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },

  // Event unbinding
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },

  methods: {
    // callback of intput value
    // initiate process of update
    onChange: function(e) {
      if (this.firebaseData) {
        this.firebaseData[e.target.name] = e.target.value;
        this.state = this.states.MODIFIED;
        this.debounceUpdate();
      }
    },

    // Displays undaved data message on page unload
    // Checks state of form and displays message if it's modified
    preventNav: function() {
      if (this.state === STATES.SYNCED) return;
      event.preventDefault();
      event.returnValue = "";
    },

    // holds system for config.debounceTime time to avoid continuous cloud update
    debounceUpdate: function() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.state = this.states.MODIFIED;
        this.updateDoc();
      }, config.debounceTime);
    },

    // async function to update changes
    updateDoc: async function() {
      try {
        await docRef.update({ ...this.firebaseData });
      } catch (e) {
        this.errorMessage = JSON.stringify(e);
        this.state = STATES.ERROR;
      }
    },

    // async function to create new document on cloud
    createDoc: async function() {
      const initState = {};
      const keys = Object.keys(this.fields);
      for (let i = 0; i < keys.length; i++) {
        initState[keys[i]] = this.fields[keys[i]].value;
      }
      initState.completion = 0;
      try {
        await docRef.set(initState);
      } catch (e) {
        this.errorMessage = JSON.stringify(e);
        this.state = STATES.ERROR;
      }
    },
  },

  // component's data attributes
  data: function() {
    return {
      states: STATES,
      timer: null,
      completion: 0,
      firebaseData: {},
      state: STATES.LOADING,
      errorMessage: "",
      fields: { ...UserDataModel },
    };
  },

  // an observer
  // checks firebaseData if it's null
  // creates db on cloud with intitial state
  watch: {
    firebaseData: function(v) {
      if (!v) {
        this.createDoc();
      } else {
        this.state = STATES.SYNCED;
      }
    },
  },

  // firestore connector/ observer
  // syncs db changes with UI
  firestore: function() {
    return {
      firebaseData: docRef,
    };
  },
};
</script>
