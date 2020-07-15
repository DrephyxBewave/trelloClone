<template>
  <v-card
    color="grey darken-2"
    :style="'opacity: ' + (cardHover ? '1' : '0.7') +'; color: white;'"
    @mouseenter="cardHover = true"
    @mouseleave="cardHover = false"
  >
    <v-container>
      <v-row
        justify="start"
        align="start"
      >
        <v-col
          pl-1
        >
          <header>
            <h2>{{ list.name }}</h2>
          </header>
        </v-col>
        <v-col>
          <v-row justify="end">
            <v-btn
              text
              small
              color="red"
              @click.stop="removeList(list._id)"
            >
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-row
        align="end"
        justify="start"
      >
        <v-col> add a card</v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'list-card',
  components: {
  },
  props: ['list'],
  data: () => ({
    cardHover: false,
    pickedColor: '',
  }),

  computed: {
  },
  mounted() {
  },
  methods: {
    ...mapActions('lists', { removeList: 'remove' }),
  },
};
</script>
<style>
.auto-invert {
  height: inherit;
  background: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  filter: invert(1) grayscale(1) contrast(9);
}
.v-menu__activator {
  background: inherit;
}
</style>
