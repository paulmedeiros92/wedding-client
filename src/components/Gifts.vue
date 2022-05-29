<template>
  <div class="gifts">
    <h2 class="title">Gifts</h2>
    <div class="gifts__wrapper">
      <div class="gifts__option">
        <div class="gifts__image registry"></div>
        <div class="gifts__title">Registry</div>
      </div>
      <div class="gifts__option">
        <div class="gifts__image paypal"></div>
        <div class="gifts__title">Honeymoon</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";

export default {
  name: "Gifts",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.names);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.gifts {
  &__wrapper {
    position: relative;
    padding-bottom: 100px;
    display: flex;
    justify-content: space-evenly;
  }

  &__image {
    height: 25vw;
    width: 25vw;
    background-size: 20vw;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 1px 1px 6px black;
    cursor: pointer;

    // TODO: I need to look this up when I get home
    &:focus :active {
      box-shadow: none;
    }

    &.registry {
      background-image: url("../assets/gifts/zola.png");
    }

    &.paypal {
      background-image: url("../assets/gifts/donate.png");
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    color: #1a1a1a;
    text-align: center;
    padding: 20px 0;
    @media (max-width: 600px) {
      display: none;
    }
  }

  &__option {
    width: 25vw;
  }

  &__center {
    text-align: center;
  }
}
</style>
