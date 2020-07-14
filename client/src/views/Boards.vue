<template>
  <v-container fluid pa-0>
    <v-row align="start" justify="center" v-if="loading">
      <v-progress-circular
      :size="70" :width="7" indeterminate color="success">
      </v-progress-circular>
    </v-row>
    <v-row align="start" justify="start" v-if="!loading">
      <v-col>
        <v-container grid-list-md fluid>
          <v-row align="start" justify="start">
            <v-col
              v-for="board in boards"
              :key="board._id"
              cols="3"
            >
            <board-card :board="board" :currentUser="user" />
            </v-col>
            <v-col cols="3">
              <v-card>
                <v-card-title primary-title style="flex-direction: column;">
                  <div class="headline">Create Board
                  </div>
                  <div>
                    <v-form
                      v-if="!createMode"
                      v-model="valid"
                      @submit.prevent="createBoard"
                      @keydown.enter.prevent
                    >
                      <v-text-field
                        v-model="board.name"
                        :rules="[notEmptyRules]"
                        label="Name"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="board.background"
                        :rules="[notEmptyRules]"
                        label="Background"
                        required
                      ></v-text-field>
                      <v-btn
                        type="submit"
                        :loading="creating"
                        :disabled="!valid || creating"
                      >Create</v-btn>
                    </v-form>
                  </div>
                </v-card-title>
                <v-card-actions>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mapState, mapActions, mapGetters, mapMutations,
} from 'vuex';
import BoardCard from '../components/BoardCard.vue';

export default {
  name: 'Boards',
  components: {
    BoardCard,
  },
  data: () => ({
    valid: false,
    createMode: false,
    board: {
      name: '',
      background: 'https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg',
    },
    notEmptyRules: (value) => !!value || 'Cannot be empty',
  }),
  mounted() {
    this.fetchBoardsFromFeathers();
  },
  computed: {
    ...mapState('auth', { user: 'user' }),
    ...mapState('boards', { creating: 'isCreatePending' }),
    ...mapState('boards', { loading: 'isFindPending' }),
    ...mapGetters('boards', { findBoardsInVuex: 'find' }),
    boards() {
      return this.user
        ? this.findBoardsInVuex().data
        : [];
    },
  },
  methods: {
    ...mapMutations('activities', { clearActivities: 'clearAll' }),
    ...mapActions('boards', { fetchBoardsFromFeathers: 'find' }),
    ...mapActions('boards', { removeBoard: 'remove' }),
    createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex.api;
        const board = new Board(this.board);
        board.save();
        // this.$refs.form.reset();
      }
    },
  },
};
</script>
