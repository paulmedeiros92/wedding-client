<template>
  <div class="rsvp" id="RSVP">
    <div :class="['rsvp__wrapper', { found: forms.length }]">
      <div class="rsvp__title animation" ref="title">Join Us!</div>
      <div v-if="forms.length">
        <Input
          class="rsvp__email"
          v-model="email"
          label="Primary Contact Email"
          required
        />
        <md-table v-model="forms" md-card>
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
                @click="addForm"
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
    <md-snackbar
      :class="{ error: snackbar.isError }"
      md-position="center"
      :md-duration="3000"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ snackbar.text }}</span>
      <md-button
        v-if="snackbar.isError"
        class="md-dense md-raised md-primary"
        @click="onReport"
        >Email Us!</md-button
      >
    </md-snackbar>
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
      attendees: [],
      rows: [],
      forms: [],
      foods: ["No Selection", "Chicken", "Lobster", "Vegetarian"],
      email: { value: null, invalid: true },
      loading: false,
      observer: null,
      showSnackbar: false,
      snackbar: {
        isError: true,
        text: "testing error",
      },
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
    isLastFormInvalid() {
      return Object.values(this.forms[this.forms.length - 1]).some(
        (field) => field.invalid
      );
    },
  },
  methods: {
    async onSearch() {
      try {
        this.loading = true;
        const response = await api.getSearchHousehold(
          this.queryData.firstName.value,
          this.queryData.lastName.value
        );
        this.attendees = response.data?.data ?? [];
        if (this.attendees.length) {
          this.email.value = this.attendees[0].email;
          this.forms = this.buildForms(this.attendees);
        } else {
          this.snackbar = {
            isError: false,
            text: `Sorry we didn't find anything for ${this.queryData.firstName.value} ${this.queryData.lastName.value}, please try another name`,
          };
          this.showSnackbar = true;
        }
      } catch (error) {
        this.snackbar = {
          isError: true,
          text: error,
        };
        this.showSnackbar = true;
      } finally {
        this.loading = false;
      }
    },
    buildForms(attendees) {
      const forms = attendees.map((attendee) => ({
        firstName: { value: attendee.firstName, invalid: true },
        lastName: { value: attendee.lastName, invalid: true },
        notes: { value: attendee.notes, invalid: true },
        food: { value: attendee.food, invalid: true },
        isAttending: { value: attendee.isAttending, invalid: false },
      }));
      forms.push({
        firstName: { value: "", invalid: true },
        lastName: { value: "", invalid: true },
        notes: { value: "", invalid: true },
        food: { value: "No Selection", invalid: true },
        isAttending: { value: false, invalid: false },
      });
      return forms;
    },
    onRetry() {
      this.forms = [];
      this.queryData.firstName.value = "";
      this.queryData.lastName.value = "";
    },
    formsToAttendees(forms, attendees, email) {
      attendees.forEach((attendee, index) => {
        Object.keys(forms[0]).forEach(
          (key) => (attendee[key] = forms[index][key].value)
        );
        attendee.email = email.value;
      });
      const newAttendees = [];
      forms.map((form, index) => {
        if (Object.values(form).every((field) => !field.invalid)) {
          let attendee;
          if (attendees[index]) {
            attendee = { ...attendees[index] };
          } else {
            attendee = { ...attendees[0] };
          }
          Object.entries(form).forEach(
            ([key, field]) => (attendee[key] = field.value)
          );
          newAttendees.push(attendee);
        }
      });
      return newAttendees;
    },
    async onRSVP() {
      try {
        this.loading = true;
        await api.postAttendees(
          this.formsToAttendees(this.forms, this.attendees, this.email)
        );
        this.snackbar = {
          isError: false,
          text: "Success, we will see you in Utah!",
        };
      } catch (error) {
        this.snackbar = {
          isError: true,
          text: "Uh-oh something went wrong, please try again or contact us",
        };
      } finally {
        this.loading = false;
        this.showSnackbar = true;
        this.onRetry();
      }
    },
    addForm() {
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
        // is attendee already in the database?
        if (this.attendees[index].hashWord) {
          await api.markForDeletion(this.attendees[index].hashWord);
        }
        const name = `${this.forms[index].firstName.value} ${this.forms[index].lastName.value}`;
        this.forms.splice(index, 1);
        this.snackbar = {
          isError: false,
          text: `Success, ${name} was deleted`,
        };
      } catch (error) {
        this.snackbar = {
          isError: true,
          text: "Uh-oh something went wrong, please try again or contact us",
        };
      } finally {
        this.loading = false;
        this.showSnackbar = true;
      }
    },
    onReport() {
      const subject = "Bug Report: Wedding Website";
      const body =
        "Hi I found a bug on your website while (describe action), on my (describe device). Below are some helpful screenshots! (Please attach screenshots)";
      window.open(
        `mailto:v100822m@gmail.com&subject=${subject}&body=${body}`,
        "_self"
      );
    },
  },
  beforeUnmount() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
.rsvp {
  padding: 15vw 8vw;
  background-image: url("../assets/photos/rsvp.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;

  @media (max-width: 1500px) {
    padding: 10vw 1vw;
  }
}

.rsvp__wrapper {
  position: relative;
  padding: 7vw 7vw 10vw 7vw;
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
    padding: 2vw 1vw 5vw 2vw;
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

.md-snackbar.md-position-center {
  background-color: #70a076;

  &.error {
    background-color: #e49497;
  }
}
</style>
