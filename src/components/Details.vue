<template>
  <div class="details">
    <div class="details__date animation" ref="date">
      Saturday, October 8th, 2022
    </div>
    <a
      class="animation"
      target="_blank"
      href="https://www.google.com/maps/place/Northampton+House+-+Weddings+and+Events/@40.3834213,-111.8055761,17z/data=!3m1!4b1!4m5!3m4!1s0x874d810ca93ee429:0xc35afe0c1947a8f2!8m2!3d40.3833936!4d-111.8031206"
      ref="link"
    >
      <p class="details__location" ref="location">
        Northampton House<br />198 W 300 N.<br />American Fork, UT
      </p>
    </a>
    <div class="details__timers animation" ref="timers">
      <Timer :number="ttw.days" label="Days" />
      <Timer :number="ttw.hours" label="Hours" />
      <Timer :number="ttw.minutes" label="Minutes" />
    </div>
    <img
      class="details__flower animation"
      ref="flower"
      src="@/assets/green-flower.png"
    />
  </div>
</template>

<script>
import * as observer from "@/services/observer-service.js";
import Timer from "@/components/Timer.vue";

const MILLI_DAY = 86400000;
const MILLI_HOUR = 3600000;
const MILLI_MIN = 60000;

export default {
  name: "Details",
  components: {
    Timer,
  },
  data() {
    return {
      date: new Date("2022-10-08T17:00:00-06:00"),
      offset: 0,
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.date);
    this.observer.observe(this.$refs.link);
    this.observer.observe(this.$refs.location);
    this.observer.observe(this.$refs.timers);
    this.observer.observe(this.$refs.flower);
  },
  computed: {
    ttw() {
      const days = Math.floor(this.offset / MILLI_DAY);
      let remainder = this.offset - days * MILLI_DAY;
      const hours = Math.floor(remainder / MILLI_HOUR);
      remainder -= hours * MILLI_HOUR;
      const minutes = Math.floor(remainder / MILLI_MIN);
      const time = { days, hours, minutes };
      return time;
    },
  },
  watch: {
    offset: {
      handler() {
        setTimeout(() => (this.offset = this.date - new Date()), 1000);
      },
      immediate: true,
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.details {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0 200px 0;
  background-color: #f7f7f7;
}

.details__date {
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
  margin: 0 20px;
  text-align: center;
}

.details__location {
  text-align: center;
  color: #292929;
}

.details__timers {
  display: flex;
}

.details__flower {
  position: absolute;
  bottom: -91px;
  height: 182px;
}
</style>
