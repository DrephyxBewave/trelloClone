<template>
  <v-card :color="backColor">
    <v-container>
      <v-layout justify-space-between row>
        <v-flex
          xs12
          pl-1
        >
          <header :style="'background-color: '+ backColor">
            <span
              class="auto-invert"
            >{{list.name}}</span>
          </header>
        </v-flex>
        <v-flex>
          <v-menu
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            :style="'background-color: '+ backColor"
          >
            <v-icon
              slot="activator"
              class="auto-invert"
            >more_horiz</v-icon>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <v-avatar>
                      <v-gravatar email="habib.tremblay@gmail.com"/>
                    </v-avatar>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>Owner</v-list-tile-title>
                    <!-- eslint-disable-next-line -->
                    <v-list-tile-sub-title>{{ list.updatedAt }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-card :color="backColor">
                  <v-menu
                    :close-on-content-click="false"
                    offset-x
                    offset-y
                    pa-0
                  >
                    <v-btn block flat slot="activator">
                      <span
                        class="auto-invert"
                        :style="'background-color: '+ backColor"
                      >Background Color</span>
                      <v-icon right>format_color_fill</v-icon>
                    </v-btn>
                  </v-menu>
                </v-card>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  color="error"
                >
                  <v-icon dark right>remove_circle</v-icon>Delete Card
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container pa-0>
      <v-layout column v-if="loadingCard">
        <v-flex pb-4>
          <v-layout column align-center>
            <v-progress-circular indeterminate color="primary"/>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout column v-if="!loadingCard">
        <v-flex v-for="card in cards" :key="card._id" ml-2 mr-2 pb-0 pt-1>
          <v-card
            draggable
          >
            <v-flex
              pa-2
              class="subheadings"
            >{{card.content}}</v-flex>

            <v-flex pa-1 class="caption">{{card.content}}</v-flex>
          </v-card>
        </v-flex>
        <v-flex ml-0 mr-0 pb-0>
          <card-create
            :list="list"
            v-on:deactivateCreateMode="$emit('deactivateCreateMode')"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'list-card',
  props: ['list', 'dragOrigin', 'dragTarget'],
  components: {
  },
  data: () => ({
    //
    pickedColor: '',
  }),
  mounted() {
  },

  computed: {
  },
  methods: {
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
