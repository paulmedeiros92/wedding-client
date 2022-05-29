<template>
  <div class="story">
    <h3 class="story__title">Our Story</h3>
    <div class="story__content-end"></div>
    <div class="story__content">
      <StoryEvent
        v-for="event of events"
        :key="event.image"
        :title="event.title"
        :date="event.date"
        :text="event.text"
        :icon="event.icon"
        :image="event.image"
      />
    </div>
    <div class="story__content-end"></div>
  </div>
</template>

<script>
import StoryEvent from "@/components/Story/StoryEvent.vue";

export default {
  name: "Story",
  components: {
    StoryEvent,
  },
  data() {
    return {
      events: [
        {
          title: "High School",
          date: "August 30, 2010",
          text: "I was looking forward to a year of analyzing literature and meeting new people when through happenstance I was put into a senior course with people I didn’t even know! On that fateful first day as I’m sitting in the back with my nose buried in a book, this guy with a faux hawk, gray skinny jeans, and a lime green studded belt walks into the classroom.",
          icon: "school",
          image: "story0.webp",
        },
        {
          title: "Secret Crush Commences",
          date: "September 2, 2010",
          text: "He was a senior though and I didn’t know him. I was way too shy to say anything so I settled for admiring him from afar. Not once did I talk to him. The entire year. THEN…",
          icon: "lock",
          image: "story1.webp",
        },
        {
          title: "First Day of College",
          date: "August 22, 2011",
          text: "Once again on my first day of English (college) I walk in and LO AND BEHOLD, THERE HE IS! The senior from high school! I decided to say something to him at the end of class, so I walked up to him and said, “Hey, we had Banto’s class together! How are you?” He responded with a quick “hello” and a handshake, and I didn’t see him for a while after.",
          icon: "edit",
          image: "story2.webp",
        },
        {
          title: "Japanese",
          date: "August 22, 2011",
          text: "Luckily we had a few serendipitous run-ins with each other on campus with us finally ending up in the same Japanese class! So of course I said hello again at the end of class and went in for another handshake (at this point, I hadn’t considered our relationship hug-worthy). At the same time Paul came in for a hug resulting in an accidental finger stabbing to the stomach. *wince* Fortunately, over the course of that Japanese class, our friendship began to flourish.",
          icon: "local_florist",
          image: "story3.webp",
        },
        {
          title: "First Date",
          date: "August 22, 2011",
          text: "One day, we went exploring off trail at Red Rock Canyon and we came across a herd of bighorn sheep grazing. We knew we were in the right place because we had a fantastic view of the mountains even though we never made it to Turtlehead Peak. That was the place where Paul asked me to be his girlfriend for the first time. I promptly said no as to not ruin our budding friendship, and we walked down the mountain in silence…",
          icon: "filter_hdr",
          image: "story4.webp",
        },
        {
          title: "Yes!",
          date: "August 22, 2011",
          text: "One night we decided to go outside and jump on the trampoline, talk, and look at the night sky. That’s when he leans in to kiss me and ask me to be his girlfriend and where I finally accept!",
          icon: "star",
          image: "story5.webp",
        },
        {
          title: "Nine Years Later",
          date: "August 22, 2011",
          text: "Last year Paul took me on a trip to HARRY POTTER WORLD (!!!) for my 28th birthday. That night (July 3rd, 2021) he asked me out on the balcony of our Air BnB to watch the fireworks with him. It was a little chilly so I really wanted to go back indoors. But then he started stammering about how much fun he’s been having and our life together. When finally he popped the question! It was so sudden and my initial reaction was, “Wait, what did you say?” before the big “YES!!!”",
          icon: "favorite",
          image: "story6.webp",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.story {
  padding: 100px 0;
  background-color: white;

  &__title {
    font-family: "Alex Brush", sans-serif;
    font-size: 50px;
    line-height: 60px;
    font-weight: 400;
    text-align: center;
    margin: 0 auto 50px auto;
  }

  &__content {
    position: relative;
    padding: 70px 0;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: calc(50% - 2px);
      height: 100%;
      width: 4px;
      background: #eee;
      transition-duration: 0.5s;

      @media (max-width: 850px) {
        left: 0;
        opacity: 0;
      }
    }

    &-end {
      height: 18px;
      width: 18px;
      border: 4px solid #eee;
      border-radius: 10px;
      background-color: var(--primary-color);
      margin: 0 auto;

      @media (max-width: 850px) {
        margin-left: 0;
        opacity: 0;
      }
    }
  }

  &__divider {
    height: 100%;
    width: 0;
    border: solid;
  }
}
</style>
