


<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="id">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
      :name="id"
      :type="type"
      :placeholder="placeholder"
      :id="id"
      :value="value"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  id: "Input",
  props: {
    label: String,
    placeholder: String,
    type: String,
    id: String,
    value: String,
    disabled: Boolean
  },
};
</script>
