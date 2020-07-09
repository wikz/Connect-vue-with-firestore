<template>
  <h2 class="mb-4 text-center text-3xl font-semibold">
    {{text}}
  </h2>
</template>

<script>

export default {
  name: "Heading",
  props: {
    text: String,
  },
};
</script>
