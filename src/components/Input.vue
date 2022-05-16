<template>
  <md-field :class="{ 'md-invalid': errors.length > 0 }">
    <label v-if="label">{{ label }}</label>
    <md-input
      :value="value.value"
      @input="onInput"
      @keyup.enter="$emit('keyupEnter')"
    ></md-input>
    <span v-for="(error, index) of errors" :key="index" class="md-error">{{
      error
    }}</span>
  </md-field>
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dirty: false,
    };
  },
  mounted() {
    if (!this.required && this.value.value.length === 0) {
      this.value.invalid = false;
    }
  },
  watch: {
    invalid: {
      handler() {
        this.$emit("input", { value: this.value.value, invalid: this.invalid });
      },
      immediate: true,
    },
  },
  computed: {
    errors() {
      if (this.dirty && this.required) {
        if (this.value.value.length === 0) {
          return ["This field is required."];
        }
      }
      return [];
    },
    invalid() {
      return this.required && this.value.value.length === 0;
    },
  },
  methods: {
    onInput(value) {
      this.dirty = true;
      this.$emit("input", { value, invalid: this.invalid });
    },
  },
};
</script>

<style></style>
