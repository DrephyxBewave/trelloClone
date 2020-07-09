<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Trello clone</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!user">
        <v-btn :to="{ name: 'Signup'}">Signup</v-btn>
        <v-btn :to="{ name: 'Login'}">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="user">
        <v-btn @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    fixed: true,
  }),
  computed: {
    ...mapState('auth', { user: 'payload' }),
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>
