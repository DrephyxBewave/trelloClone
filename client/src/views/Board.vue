<template>
  <v-container
    fill-height
    align-start
    align-content-start
    fluid
    pa-2
    :style="'background-image: url('+board.background+'); background-size:cover;'"
    @click.stop="isCreating = false"
  >
    <v-row
      align="start"
      justify="start"
    >
      <v-col
        xs12
        cols="12"
      >
        <v-form
          v-model="valid"
          @submit.prevent
          @keydown.prevent.enter
        >
          <v-text-field
            v-model="board.name"
            dark
            class="headline mb-0"
            solo-inverted
            :rules="[notEmptyRules]"
            label="Name"
            required
            :loading="loadingBoard"
            color="orange"
            @change="myPatch()"
          />
        </v-form>
      </v-col>
    </v-row>
    <v-row
      align="start"
      justify="start"
    >
      <v-col
        v-for="list in lists"
        :key="list._id"
        cols="2"
        >
        <list-card
          :list="list"
        />
      </v-col>
      <v-col cols="2">
        <list-create
          :is-creating="isCreating"
          :board="board"
          @activateCreateMode="isCreating = true"
          @deActivateCreateMode="isCreating = false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { notEmptyRules } from '../utils/rules';
import ListCreate from '../components/ListCreate.vue';
import ListCard from '../components/ListCard.vue';

export default {
  name: 'board',

  components: {
    ListCreate,

    ListCard,
  },

  data: () => ({
    valid: false,

    isCreating: false,

    createListHover: false,

    board: {},

    notEmptyRules,
  }),

  computed: {
    ...mapState('boards', { loadingBoard: 'isGetPending', boardsError: 'errorOnGet' }),

    ...mapGetters('lists', { findListsInStore: 'find' }),

    ...mapGetters('lists', { getListInStore: 'get' }),

    lists() {
      return this.findListsInStore({
        query: {
          boardId: this.$route.params.id,
        },
      }).data;
    },
  },

  mounted() {
    this.loadBoard();

    this.findLists({
      query: {
        boardId: this.$route.params.id,
      },
    });
  },
  methods: {
    ...mapActions('boards', { getBoard: 'get' }),

    ...mapActions('lists', { findLists: 'find' }),

    loadBoard() {
      this.getBoard(this.$route.params.id).then(response => {
        this.board = response.data || response;
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
