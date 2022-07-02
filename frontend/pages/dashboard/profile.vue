<template>
  <v-card flat>
    <v-toolbar color="primary" dark extended flat> </v-toolbar>

    <v-card class="mx-auto" max-width="80vw" style="margin-top: -64px">
      <v-toolbar flat>
        <v-toolbar-title class="grey--text">
          {{ $t("profile_page") }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn icon>
          <v-icon>fas fa-edit</v-icon>
        </v-btn> -->
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="8">
            <v-card flat>
              <v-card-title>
                <v-row justify="center">
                  <v-avatar size="128">
                    <v-img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-img>
                    <v-btn
                      icon
                      absolute
                      style="bottom: 0; right: 0; z-index: 9999"
                    >
                      <v-icon> fas fa-camera </v-icon>
                    </v-btn>
                  </v-avatar>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row justify="center">
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="text-center">
                        <div class="font-weight-bold">{{ user.name }}</div>
                        <v-list-item-subtitle>
                          {{ user.email }}
                        </v-list-item-subtitle>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>
                        {{ $t("info") }}
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="user.name"
                              flat
                              :label="$t('name')"
                              outlined
                              dense
                              prepend-inner-icon="fas fa-user"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="user.email"
                              flat
                              outlined
                              dense
                              disabled
                              prepend-inner-icon="fas fa-envelope"
                              :label="$t('email')"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="user.phone"
                              flat
                              outlined
                              dense
                              prepend-inner-icon="fas fa-mobile"
                              :label="$t('mobile')"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="user.address"
                              flat
                              outlined
                              dense
                              prepend-inner-icon="fas fa-map"
                              :label="$t('address')"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-btn block color="primary" @click="$save(user,'user')">
                              {{ $t("save") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- <v-list two-line dense rounded>
                  <v-list-item-group
                    color="grey"
                  >
                    <v-list-item v-for="i in 4" outlined>
                      <v-list-item-icon>
                        <v-icon> fas fa-book </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          Lorem ipsum dolor sit amet.
                          <v-list-item-subtitle>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Aspernatur, eligendi.
                          </v-list-item-subtitle>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list> -->
              </v-card-text>
            </v-card>
          </v-col>
          <!-- <v-col cols="8">
            <v-card>
              <v-card-title> Info </v-card-title>
              <v-card-text>
                <v-row v-for="i in 5" class="mt-0">
                  <v-col cols="12">
                    <v-card flat outlined>
                      <v-card-title> Name </v-card-title>
                      <v-card-text> Ahmed Rafie </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card>
              <v-card-title> Security </v-card-title>
              <v-card-text>
                <v-row v-for="i in 5" class="mt-0">
                  <v-col cols="12">
                    <v-card flat outlined>
                      <v-card-title> Name </v-card-title>
                      <v-card-text> Ahmed Rafie </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col> -->
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      filter: false,
      params: {
        type: "accounting",
        sub_type: "account_statement_report",
      },
      user: {},
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.report.all,
      headers: (state) => state.report.headers,
      user_data: (state) => state.auth.user,
    }),
  },
  watch: {
    user_data(v) {
      this.user = JSON.parse(JSON.stringify(this.user_data));
    },
  },
  mounted() {
    if (this.user_data) {
      this.user = JSON.parse(JSON.stringify(this.user_data));
    }
  },
};
</script>

<style>
</style>