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
        v-if="!loadingCard"
      >
        <v-col
          v-for="card in cards"
          :key="card._id"
          cols="12"
        >
        {{ card.name }}
        </v-col>
      </v-row>
      <v-row
        align="end"
        justify="start"
      >
        <v-col>
          <card-create :list="list" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import CardCreate from './CardCreate.vue';

export default {
  name: 'list-card',
  components: {
    CardCreate
  },
  props: ['list'],
  data: () => ({
    cardHover: false,
    pickedColor: '',
  }),

  computed: {
    ...mapState('cards', { loadingCard: 'isFindPending' }),
    ...mapGetters('cards', { findCardsInStore: 'find' }),
    cards() {
      const retval = this.findCardsInStore({
        query: {
          listId: this.list._id,
        },
      }).data;
      return retval;
    }
  },
  mounted() {
    this.findCards({
      query: {
        listId: this.list._id,
      },
    });
  },
  methods: {
    ...mapActions('lists', { removeList: 'remove' }),
    ...mapActions('cards', { findCards: 'find' }),
  },
};
</script>
