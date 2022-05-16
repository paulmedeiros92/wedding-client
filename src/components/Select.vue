<template>
  <md-field :class="{ 'md-invalid': errors.length > 0 }">
    <md-select :value="value.value" @md-selected="onInput">
      <md-option v-for="option of options" :key="option" :value="option">{{
        option
      }}</md-option>
    </md-select>
    <span v-for="(error, index) of errors" :key="index" class="md-error">{{
      error
    }}</span>
  </md-field>
</template>

<script>
export default {
  name: "Select",
  props: {
    value: {
      type: Object,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    fallback: {
      type: String,
      default: "No Selection",
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
  watch: {
    invalid() {
      this.$emit("input", { value: this.value.value, invalid: this.invalid });
    },
  },
  computed: {
    errors() {
      if (this.dirty && this.required) {
        if (this.invalid) {
          return ["Please select an option."];
        }
      }
      return [];
    },
    invalid() {
      return this.required && this.value.value === this.fallback;
    },
  },
  mounted() {
    if (!this.value) {
      this.cachedValue = this.fallback;
    }
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
