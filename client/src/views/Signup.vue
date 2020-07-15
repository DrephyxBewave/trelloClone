<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center
      >
        <v-form
          v-if="!loading"
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="signup"
          @keydown.prevent.enter
        >
          <v-text-field
            v-model="user.displayName"
            :rules="[notEmptyRules]"
            label="Display name"
            required
            :disabled="loading"
          />
          <v-text-field
            v-model="user.username"
            :rules="[notEmptyRules]"
            label="Username"
            required
            :disabled="loading"
          />
          <v-text-field
            v-model="user.email"
            :rules="[notEmptyRules,validEmail]"
            label="email"
            type="email"
            required
            :disabled="loading"
          />

          <v-text-field
            v-model="user.password"
            :rules="[notEmptyRules]"
            label="Password"
            type="password"
            required
            :disabled="loading"
          />

          <v-text-field
            v-model="user.confirmPassword"
            :rules="[notEmptyRules, confirmPasswordRules]"
            label="Confirm password"
            type="password"
            required
            :disabled="loading"
          />

          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="mr-4"
            type="submit"
            @click="signup"
          >
            SignUp
          </v-btn>
        </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="success"
        />
      </v-layout>
    </v-slide-y-transition>
    <error-pop
      v-model="dialog"
      err-title="Authentication Error"
      :err-text="signUpErr"
    />
  </v-container>
</template>

<style scoped>
</style>

<script>
import { mapState } from 'vuex';
import ErrorPop from '../components/ErrorPop.vue';
import { notEmptyRules, validEmail } from '../utils/rules';

export default {
  name: 'Signup',

  components: {
    ErrorPop,
  },

  data: vm => ({
    valid: false,

    dialog: false,

    signUpErr: '',

    user: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      displayName: '',
    },

    notEmptyRules,

    validEmail,

    confirmPasswordRules: value => value === vm.user.password || 'Password must match',
  }),

  computed: {
    ...mapState('users', { loading: 'isCreatingPending' }),
  },

  methods: {
    signup() {
      if (this.valid) {
        const { User } = this.$FeathersVuex.api;
        const user = new User(this.user);
        user.save()
          .then(() => {
            this.$router.push('/login');
          })
          .catch(err => {
            this.signUpErr = err.message;
            this.dialog = true;
          });
      }
    },
  },
};
</script>
