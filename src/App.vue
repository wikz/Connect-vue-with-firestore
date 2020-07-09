<template>
  <div id="app">
    <div class="flex justify-center p-4">
      <UserForm />
    </div>
  </div>
</template>

<script>
import UserForm from "./components/UserForm";

export default {
  name: "App",
  components: {
    UserForm,
  },
};
</script>
