<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-flex xs12 sm6 md4 class="text-xs-center">
          <v-icon x-large>assignment_ind</v-icon>
          <v-form
            v-model="valid"
            @submit.prevent="login"
            @keydown.enter.prevent
          >
            <v-text-field
              v-model="user.username"
              :rules="[notEmptyRules]"
              label="Username"
              required
              :disabled="authenticating"
              autofocus
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              :rules="[notEmptyRules]"
              type="password"
              label="Password"
              required
              :disabled="authenticating"
            ></v-text-field>
            <v-btn
              type="submit"
              :loading="authenticating"
              :disabled="!valid || authenticating"
            >Login</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <error-pop
      v-model="dialog"
      errTitle="Authentication Error"
      :errText="authErr"
    />
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '../utils/rules';
import ErrorPop from '../components/ErrorPop.vue';

export default {
  name: 'login',
  components: {
    ErrorPop,
  },
  data: () => ({
    valid: false,
    dialog: false,
    authErr: '',
    user: {
      username: '',
      password: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('auth', { authenticating: 'isAuthenticatePending' }),
  },
  methods: {
    ...mapActions('auth', { feathersLogin: 'authenticate' }),
    login() {
      if (this.valid) {
        // Authenticate with the local email/password strategy
        this.feathersLogin({ username: this.user.username, password: this.user.password, strategy: 'local' })
          .then(() => {
            // Logged in
            this.$router.go('/boards');
          }).catch((e) => {
          // Show login page (potentially with `e.message`)
            console.error('Authentication error', e);
          });
      }
    },
  },
};
</script>
