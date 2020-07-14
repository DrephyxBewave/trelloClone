<template>
  <v-container
    pt-0
    :class="{'grid-list-xl': $vuetify.breakpoint.xsOnly,
    'grid-list-md': $vuetify.breakpoint.smAndUp }"
    fluid
  >
    <v-layout align-start justify-start row wrap>
      <v-flex v-for="list in lists" :key="list._id" xs12 sm3 md2 xl1>
        <list-card />
      </v-flex>
      <v-flex xs12 sm3 md2 xl1>
        <list-create />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { notEmptyRules } from '../utils/rules';
import ListCard from './ListCard.vue';

export default {
  name: 'list-list',
  props: ['board'],
  components: {
    ListCard,
  },
  data: () => ({
    list: {},
    notEmptyRules,
  }),
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  },
};
</script>
