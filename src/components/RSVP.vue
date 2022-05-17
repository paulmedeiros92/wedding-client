<template>
  <div class="rsvp" id="RSVP">
    <div :class="['rsvp__wrapper', { found: attendees }]">
      <div class="rsvp__title animation" ref="title">Join Us!</div>
      <div v-if="attendees">
        <Input
          class="rsvp__email"
          v-model="email"
          label="Primary Contact Email"
          required
        />
        <md-table v-model="rows" md-card>
          <md-table-row slot="md-table-row" slot-scope="{ index }">
            <md-table-cell md-label="First Name" md-sort-by="firstName">
              <Input v-model="forms[index].firstName" required />
            </md-table-cell>
            <md-table-cell md-label="Last Name" md-sort-by="lastName">
              <Input v-model="forms[index].lastName" required />
            </md-table-cell>
            <md-table-cell md-label="Food" md-sort-by="food">
              <Select :options="foods" v-model="forms[index].food" required />
            </md-table-cell>
            <md-table-cell md-label="Notes" md-sort-by="notes">
              <Input v-model="forms[index].notes" />
            </md-table-cell>
            <md-table-cell md-label="Attending?" md-sort-by="isAttending">
              <md-checkbox
                v-model="forms[index].isAttending.value"
              ></md-checkbox>
            </md-table-cell>
            <md-table-cell md-label="Actions">
              <md-button
                v-if="index === forms.length - 1"
                class="md-icon-button md-primary md-raised rsvp__add-attendee"
                @click="onAddAttendee(index)"
                :disabled="
                  Object.values(forms[index]).some((field) => field.invalid)
                "
              >
                <md-icon>add</md-icon>
              </md-button>
              <md-button
                v-else
                class="md-icon-button md-accent md-raised rsvp__add-attendee"
                @click="onDeleteAttendee(index)"
              >
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
          <md-table-empty-state
            md-label="Invitation not found."
            :md-description="`Invitation not found for that first and last name. Please check your spelling or try another name.`"
          >
          </md-table-empty-state>
        </md-table>
        <div class="rsvp__table-footer">
          <md-button
            v-if="attendees.length"
            class="md-primary md-raised"
            @click="onRSVP"
            :disabled="isRsvpDisabled"
            >RSVP</md-button
          >
          <md-button class="md-raised md-primary" @click="onRetry"
            >Search again!</md-button
          >
        </div>
      </div>
      <div v-else class="rsvp__search">
        <Loader v-if="loading" class="rsvp__loader" />
        <template v-else>
          <Input label="First Name" v-model="queryData.firstName" required />
          <Input
            label="Last Name"
            v-model="queryData.lastName"
            @keyupEnter="onSearch"
            required
          />
          <md-button
            class="md-primary md-raised"
            @click="onSearch"
            :disabled="isSearchDisabled"
            >Find My Invitation</md-button
          >
        </template>
      </div>
      <img class="rsvp__flower" src="@/assets/green-flower.png" />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import * as api from "@/api/api-service";
import * as observer from "@/services/observer-service.js";

export default {
  name: "RSVP",
  components: {
    Loader,
    Input,
    Select,
  },
  data() {
    return {
      queryData: {
        firstName: {
          value: "",
          invalid: true,
        },
        lastName: {
          value: "",
          invalid: true,
        },
      },
      attendees: null,
      rows: [],
      forms: [],
      foods: ["No Selection", "Chicken", "Lobster", "Vegetarian"],
      email: { value: null, invalid: true },
      loading: false,
      observer: null,
    };
  },
  mounted() {
    this.observer = observer.init();
    this.observer.observe(this.$refs.title);
  },
  watch: {},
  computed: {
    isSearchDisabled() {
      return Object.values(this.queryData).some((form) => form.invalid);
    },
    isRsvpDisabled() {
      return (
        this.email.invalid ||
        this.forms
          .slice(0, -1)
          .some((form) => Object.values(form).some((field) => field.invalid))
      );
    },
  },
  methods: {
    async onSearch() {
      try {
        this.loading = true;
        const houseData = await api.getSearchHousehold(
          this.queryData.firstName.value,
          this.queryData.lastName.value
        );
        this.attendees = houseData.data.data;
        this.addNewRow();
        this.forms = this.rows.map((attendee) => ({
          firstName: { value: attendee.firstName, invalid: true },
          lastName: { value: attendee.lastName, invalid: true },
          notes: { value: attendee.notes, invalid: true },
          food: { value: attendee.food, invalid: false },
          isAttending: { value: attendee.isAttending, invalid: false },
        }));
        this.email.value = this.attendees[0].email;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    onRetry() {
      this.attendees = null;
    },
    async onRSVP() {
      try {
        this.loading = true;
        // if the new row is valid add it to attendees
        if (
          Object.values(this.forms[this.forms.length - 1]).every(
            (field) => !field.invalid
          )
        ) {
          this.onAddAttendee(this.forms.length - 1);
        }
        await api.postAttendees(this.attendees);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    onAddAttendee(index) {
      // Update the row with form values
      const selectedForm = this.forms[index];
      const selectedRow = this.rows[index];
      console.log(selectedForm);
      Object.keys(selectedForm).forEach(
        (key) => (selectedRow[key] = selectedForm[key].value)
      );
      this.attendees = this.rows;
      this.addNewForm();
      this.addNewRow();
    },
    addNewRow() {
      this.rows = [
        ...this.attendees,
        {
          ...this.attendees[0],
          firstName: "",
          lastName: "",
          notes: "",
          food: "No Selection",
          hashWord: null,
          isAttending: false,
        },
      ];
    },
    addNewForm() {
      this.forms = [
        ...this.forms,
        {
          firstName: { value: "", invalid: true },
          lastName: { value: "", invalid: true },
          notes: { value: "", invalid: true },
          food: { value: "No Selection", invalid: false },
          isAttending: { value: false, invalid: false },
        },
      ];
    },
    async onDeleteAttendee(index) {
      try {
        this.loading = true;
        const selectedRow = this.rows[index];
        if (selectedRow.hashWord) {
          await api.markForDeletion(selectedRow.hashWord);
        }
        this.forms.splice(index, 1);
        this.rows.splice(index, 1);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.rsvp {
  padding: 160px 80px;
  background-image: url("../assets/photos/landscape.jpg");
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
  max-width: 800px;
  min-height: 450px;
  transition: max-width 0.2s ease-in;

  &.found {
    max-width: 100%;
  }
}

.rsvp__title {
  margin-bottom: 25px;
  font-family: "Alex Brush", sans-serif;
  color: #1a1a1a;
  font-weight: 400;
  font-size: 50px;
  line-height: 60px;
}

.rsvp__email {
  width: 250px;
}

.rsvp__table-footer {
  display: flex;
  justify-content: right;
}

.rsvp__loader {
  margin: auto;
}

.rsvp__search {
  max-width: 600px;
  margin: auto;
}

.rsvp__flower {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
