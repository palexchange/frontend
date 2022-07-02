<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="2">
          <v-icon> fas fa-utensils </v-icon>
          <span :class="`m${$vuetify.rtl ? 'r' : 'l'}-5`">
            {{ $t("daily_meals_form") }}
          </span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <v-text-field
            rounded
            filled
            :placeholder="'Search'"
            prepend-inner-icon="fas fa-search"
            v-model="searchVal"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col cols="4">
                    {{ $t("menu") }}
                  </v-col>
                  <v-col cols="8">
                    <DatePicker v-model="date" />
                  </v-col>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-divider></v-divider>
                <v-row
                  v-if="daily_meal_items.length == 0"
                  class="bill-item-empty-row"
                >
                  <v-col cols="12"> {{ $t("add_items_from_list") }} </v-col>
                </v-row>
                <v-row
                  v-for="(item, i) in daily_meal_items"
                  :key="item.item_id"
                  class="bill-item-row"
                >
                  <v-col cols="2">
                    <v-img :src="item.item.image_url" height="50px"></v-img>
                  </v-col>
                  <v-col cols="3" class="bill-item-name"
                    >{{ item.item.name }}
                  </v-col>
                  <v-spacer></v-spacer>

                  <v-col cols="2" v-if="editable">
                    <v-btn fab x-small color="red" dark @click="deleteMeal(item)">
                      
                      <v-icon x-small> fas fa-times </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row v-if="daily_meal_items.length > 0 && editable">
                  <v-col cols="12">
                    <v-btn block color="primary" @click="confirm">
                      <v-icon> fas fa-check </v-icon>
                      {{ $t("confirm") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12">
                <v-card elevation="1">
                  <v-card-title>
                    <v-icon> fas fa-hamburger </v-icon>
                    <span :class="`m${$vuetify.rtl ? 'r' : 'l'}-3`">
                      {{ $t("items") }} : {{ count }}
                    </span>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-for="item in getItems(searchVal)" :key="item.id">
                <v-card rounded>
                  <v-img :src="item.image_url" height="250px" class="item-img">
                    <div
                      class="
                        text-h5
                        white--text
                        pl-4
                        pt-4
                        d-inline-block
                        item-overlay
                      "
                    ></div>
                    <div
                      class="
                        text-h5
                        white--text
                        pl-4
                        pt-4
                        d-inline-block
                        item-data
                      "
                    >
                      {{ item.name }}
                      <br />
                      <!-- <div style="font-size: 1rem">
                        {{ item.price.toFixed(2) }}
                      </div> -->
                    </div>
                  </v-img>

                  <v-card-actions class="justify-center">
                    <v-btn
                      block
                      color="primary"
                      @click="addMeal(item)"
                      :disabled="
                        daily_meal_items.find((i) => i.item_id == item.id) !=
                        null
                      "
                    >
                      <v-icon> fas fa-plus </v-icon>
                      <span class="px-5">
                        {{ $t("add") }}
                      </span>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyMealsForm",
  data() {
    return {
      menu: [],
      daily_meal_items: [],
      searchVal: null,
      count: 0,
      date: null,
      editable: true,
    };
  },
  mounted() {
    this.$store.dispatch("item/index", { per_page: -1 });
  },
  methods: {
    getImage() {
      const min = 550;
      const max = 560;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getItems(searchVal) {
      if (searchVal) {
        let list = this.items.filter((i) => i.name.includes(searchVal));
        this.count = list.length;
        return list;
      }
      this.count = this.items.length;
      return this.items;
    },
    addMeal(item) {
      if (!this.daily_meal_items.find((i) => i.item_id == item.id))
        this.daily_meal_items.push({
          item_id: item.id,
          date: this.date,
          item,
        });
    },
    async confirm() {
      await this.$save(
        {
          bulk: true,
          data: this.daily_meal_items,
        },
        "daily_meal"
      );
    },
    async deleteMeal(item){
      await this.$store.dispatch('daily_meal/delete',item);
    }
  },
  computed: {
    ...mapState({
      items: (state) => state.item.all,
      daily_meals: (state) => state.daily_meal.all,
    }),
  },
  watch: {
    date() {
      this.$store.dispatch("daily_meal/index", {
        date: this.date,
        per_page: -1,
      });
      let now = new Date(Date.now());
      let date_obj = new Date(this.date);
      now.setHours(0, 0, 0, 0);
      date_obj.setHours(0, 0, 0, 0);
      if (now > date_obj) {
        this.editable = false;
      }else{
        this.editable=true;
      }
    },
    daily_meals() {
        this.daily_meal_items = JSON.parse(JSON.stringify(this.daily_meals));
    },
  },
};
</script>
