<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="login"
          >
            Login
          </v-btn>

        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [
      (v) => !!v || 'username is required',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'password is required',
    ],
  }),

  methods: {
    login() {
      const isValid = this.$refs.form.validate();
      console.log(isValid);
    },
  },
};
</script>
