<template>
  <v-container
    fill-height
    align-start
    align-content-start
    fluid
    pa-2
    :style="'background-image: url('+board.background+'); background-size:cover;'"
    @click.stop="isCreating = false">
  >
    <v-row align="start" justify="start">
      <v-col xs12 cols="12">
        <v-form v-model="valid" @submit.prevent @keydown.prevent.enter>
          <v-text-field
            dark
            class="headline mb-0"
            solo-inverted
            v-model="board.name"
            :rules="[notEmptyRules]"
            label="Name"
            required
            @change="myPatch()"
            :loading="loadingBoard"
            color="orange"
          >
          </v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row align="start" justify="start" >
      <v-col cols="2">
        <list-create :isCreating="isCreating"
        :board="board"
        v-on:activateCreateMode="isCreating = true"></list-create>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '../utils/rules';
import ListCreate from '../components/ListCreate.vue';

export default {
  name: 'board',
  components: {
    ListCreate,
  },
  data: () => ({
    valid: false,
    isCreating: false,
    createListHover: false,
    board: {},
    list: {},
    notEmptyRules,
  }),
  mounted() {
    this.loadBoard();
    // this.resetBlindActivities();
  },
  watch: {
    board() {
      // this.debouncedLoadActivities();
    },
  },
  computed: {
    ...mapState('boards', { loadingBoard: 'isGetPending', boardsError: 'errorOnGet' }),
    ...mapState('lists', { listsError: 'errorOnFind' }),
    ...mapState('activities', { creatingActivities: 'isCreatePending' }),
  },
  methods: {
    ...mapActions(['setActiveListCreateCard', 'addBlindActivities', 'resetBlindActivities']),
    ...mapActions('boards', { getBoard: 'get' }),
    ...mapActions('activities', { findActivities: 'find' }),
    loadBoard() {
      this.getBoard(this.$route.params.id).then((response) => {
        this.board = response.data || response;
      });
    },
    loadActivities() {
      this.findActivities({
        query: {
          boardId: this.$route.params.id,
          $sort: {
            updatedAt: -1,
          },
        },
      });
    },
    async myPatch() {
      // eslint-disable-next-line
      if (this.board._id) {
        await this.board.patch();
      }
    },
  },
};
</script>
