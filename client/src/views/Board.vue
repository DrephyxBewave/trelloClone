<template>
  <v-container
    fill-height
    fluid
    pa-0
    :style="'background-image: url('+board.background+'); background-size:cover;'"
  >
    <error-alert v-if="boardsError" :message="boardsError.message"/>
    <v-layout v-else column>
      <v-flex xs12>
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
      </v-flex>
      <v-flex>
        <list-list
          :board="board"
        ></list-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { notEmptyRules } from '../utils/rules';
import ErrorAlert from '../components/ErrorAlert.vue';
import ListList from '../components/ListList.vue';

export default {
  name: 'board',
  components: {
    ErrorAlert,
  },
  data: () => ({
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
    // eslint-disable-next-line
/*     debouncedLoadActivities: _.debounce(function () {
      this.loadActivities();
    }, 100), */
    async myPatch() {
      // eslint-disable-next-line
      if (this.board._id) {
        await this.board.patch();
        // this.debouncedLoadActivities();
      }
    },
  },
};
</script>
