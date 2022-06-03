<template>
  <div class="gifts">
    <h2 class="gifts__header title animation" ref="title">Gifts</h2>
    <div class="gifts__wrapper">
      <a
        class="gifts__option animation animation--left"
        ref="paypal"
        href="https://www.paypal.com/donate/?business=RHJNC2ULN6ZVC&no_recurring=1&item_name=Tori+and+Paul%27s+wedding%2C+honeymoon%2C+future+fund%21&currency_code=USD"
        target="_blank"
        rel="noopener"
      >
        <div class="gifts__image paypal"></div>
        <div class="gifts__title">Honeymoon</div>
      </a>
      <img
        class="gifts__succulent animation"
        ref="succulent"
        src="@/assets/succulent.png"
      />
      <a
        class="gifts__option animation animation--right"
        ref="zola"
        href="http://www.zola.com/registry/victoriaandpauloctober8"
        target="_blank"
        rel="noopener"
      >
        <div class="gifts__image registry"></div>
        <div class="gifts__title">Registry</div>
      </a>
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
    this.observer.observe(this.$refs.title);
    this.observer.observe(this.$refs.paypal);
    this.observer.observe(this.$refs.succulent);
    this.observer.observe(this.$refs.zola);
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.gifts {
  background-image: url("../assets/gallery.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 60px 20px;

  &__header {
    margin-top: 0;
  }

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: space-evenly;
  }

  &__image {
    height: 18vw;
    width: 18vw;
    background-size: 14vw;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 6px #999;

    &:hover {
      box-shadow: 0 0 10px #333;
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
    width: 18vw;
  }

  &__center {
    text-align: center;
  }

  &__succulent {
    width: 18vw;
  }
}
</style>
