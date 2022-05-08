<template>
  <div class="rsvp">
    <div class="rsvp__wrapper">
      <div class="rsvp__title">Join Us!</div>
      <div v-if="attendees.length">
        <md-table v-model="attendees" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="First Name" md-sort-by="firstName">
              <md-field>
                <md-input v-model="item.firstName"></md-input>
              </md-field>
            </md-table-cell>
            <md-table-cell md-label="Last Name" md-sort-by="lastName">
              <md-field>
                <md-input v-model="item.lastName"></md-input>
              </md-field>
            </md-table-cell>
            <md-table-cell md-label="Food" md-sort-by="food">
              <md-field>
                <label for="food">Food</label>
                <md-select v-model="item.food" name="food" id="food">
                  <md-option v-for="food of foods" :key="food" :value="food">{{ food }}</md-option>
                </md-select>
              </md-field>
            </md-table-cell>
            <md-table-cell md-label="Notes" md-sort-by="notes">
              <md-field>
                <label>Notes</label>
                <md-textarea v-model="item.notes" md-autogrow></md-textarea>
              </md-field>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <md-button class="md-primary rsvp__button" @click="onRSVP">RSVP</md-button>
        <md-button class="md-primary rsvp__button" @click="onRetry">Try again!</md-button>
      </div>
      <div v-else>
        <md-field>
          <label>First Name</label>
          <md-input v-model="queryData.firstName"></md-input>
        </md-field>
        <md-field>
          <label>Last Name</label>
          <md-input v-model="queryData.lastName" @keyup.enter="onSearch"></md-input>
        </md-field>
        <md-button class="md-primary rsvp__button" @click="onSearch">Find My Invitation</md-button>
      </div>
      <img class="rsvp__flower" src="@/assets/green-flower.png" />
    </div>
  </div>
</template>

<script>
import { getSearchHousehold } from '@/api/api-service';

export default {
  name: "Landscape",
  data() {
    return {
      queryData: {
        firstName: null,
        lastName: null,
      },
      attendees: [],
      foods: ["No Selection", "Chicken", "Lobster", "Vegetarian"],
    };
  },
  methods: {
    async onSearch() {
      try {
        const houseData = await getSearchHousehold(this.queryData)
        this.attendees = houseData.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    onRetry() {
      this.attendees = [];
    },
    onRSVP() {
      console.log("RSVP");
    }
  }
};
</script>

<style lang="scss" scoped>
.rsvp {
  padding: 160px 80px;
  background-image: url('../assets/photos/landscape.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;
}

.rsvp__wrapper {
  position: relative;
  padding: 70px 70px 100px 70px;
  background-color: white;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 10px -3px #d3d3d3;
}

.rsvp__title {
  margin-bottom: 25px;
    font-family: 'Alex Brush', sans-serif;
  color: #1A1A1A;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
}

.rsvp__button {
  color: #282828;
  background-color: white;
  border-radius: 5px;

  &:hover {
    color: white;
    background-color: #70a076;
  }
}

.rsvp__flower {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
