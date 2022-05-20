<template>
  <div class="event">
    <div class="event__wrapper">
      <h4 class="event__title">{{ title }}</h4>
      <span class="event__date">{{ date }}</span>
      <p class="event__text">{{ text }}</p>
    </div>
    <div
      class="event__image"
      :style="{
        'background-image': `url(${require('@/assets/story/' + image)})`,
      }"
    ></div>
    <div class="event__icon">
      <md-icon style="color: var(--primary-color)">{{ icon }}</md-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoryEvent",
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.event {
  position: relative;
  width: 100%;
  display: flex;
  padding-left: 8vw;

  @media (min-width: 851px) {
    &:nth-of-type(odd) {
      flex-direction: row-reverse;

      & > .event__wrapper {
        padding: 3vw 3vw 3vw 6vw;
      }
    }
    padding: 0;
  }

  &:hover {
    & > .event__icon {
      transform: rotate(360deg);
    }
  }

  &__wrapper {
    width: 50vw;
    padding: 3vw 5vw 3vw 3vw;
  }

  &__title {
    font-family: "Alex Brush", sans-serif;
    font-size: 40px;
    line-height: 50px;
    font-weight: 400;
    margin: 0 0 15px 0;
  }

  &__date {
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    line-height: 24px;
    font-weight: 400;
    color: var(--primary-color);
    margin-bottom: 20px;
  }

  &__text {
    font-family: "Poppins", sans-serif;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    color: var(--grey-color);
    margin: 0;
  }

  &__image {
    height: 300px;
    max-width: 400px;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: auto;
    transition: height 0.1s ease-in;
    transition-duration: 0.5s;

    &:hover {
      transform: scale(1.03);
    }
  }

  &__icon {
    height: 70px;
    width: 70px;
    background-color: #eee;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: calc(50% - 35px);
    top: calc(50% - 35px);
    transition-duration: 0.5s;

    @media (max-width: 850px) {
      left: -35px;
    }
  }
}
</style>
