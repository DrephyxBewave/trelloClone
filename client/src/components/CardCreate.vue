<template>
  <v-card
    v-if="!cardCreateMode"
    flat
    ripple
    :color="cardHover ? 'grey lighten-1' : 'grey lighten-2'"
    :style="'text-decoration: ' +
            (cardHover ? 'underline' : 'none') +
            '; cursor: pointer; color: ' +
            (cardHover ? 'black' : 'grey') +
            ';'"
    @click.stop="cardCreateMode=true"
    @mouseenter="cardHover = true"
    @mouseleave="cardHover = false"
  >
    <v-container class="pa-2">
      <v-row>
        <v-col>
          <span>Add a card...</span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card
    v-else
    flat
    color="grey lighten-2"
    @click.stop
  >
    <v-container class="pb-1">
      <v-row>
        <v-col>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="createCard()"
          >
            <v-text-field
              v-model="card.name"
              class="caption"
              :rules="[notEmptyRules]"
              required
              autofocus
              solo
              color="secondary"
              append-icon="save"
              @click:append="createCard()"
            />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '../utils/rules';

export default {
  name: 'card-create',
  props: ['list'],
  data: () => ({
    cardCreateMode: false,
    cardHover: false,
    valid: false,
    card: {
      name: '',
    },
    notEmptyRules,
  }),
  computed: {
    ...mapState('cards', { creatingCard: 'isCreatePending' }),
  },
  methods: {
    createCard() {
      if (this.valid) {
        const { Card } = this.$FeathersVuex.api;
        const card = new Card(this.card);
        // eslint-disable-next-line
        card.listId = this.list._id;
        card.save().then(() => {
          this.$refs.form.reset();
          this.cardCreateMode = false;
        });
      }
    },
  },
};
</script>
