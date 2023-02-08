<script lang="ts" setup>
import { ref } from "vue";

const valid = ref(false);

const username = ref("");
const usernameRules = [
  (value: string) => {
    if (value) {
      return true;
    }
    return "Name is required.";
  },
  (value: string) => {
    if (value.length <= 10) {
      return true;
    }
    return "Name must be less than 10 characters.";
  },
];

const email = ref("");
const emailRules = [
  (value: string) => {
    if (value.includes("@")) {
      return true;
    }
    return "Must be a valid email.";
  },
];

function submit() {
  if (!valid.value) {
    return;
  }

  window.fetch("/users/sign_up", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      email: email.value,
    }),
  });
}
</script>

<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            name="username"
            v-model="username"
            :rules="usernameRules"
            :counter="10"
            label="Username"
            required
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            name="email"
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          />
        </v-col>
      </v-row>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-container>
  </v-form>
</template>
