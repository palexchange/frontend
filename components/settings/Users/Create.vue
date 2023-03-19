<template>
  <v-card>
    <v-toolbar color="primary" dark
      ><v-spacer></v-spacer>
      {{ $t(`${dialog_item ? "edit" : "add"} user`) }}
      <v-spacer></v-spacer
    ></v-toolbar>
    <div>
      <v-form v-model="validated">
        <v-card-text class="pa-6">
          <v-row dense>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                required
                text="user name"
                v-model="form.name"
                holder="user name"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="4" xs="12">
              <InputField
                required
                v-model="form.email"
                text="email"
                holder="email"
              ></InputField>
            </v-col>
            <v-col v-if="!dialog_item" cols="12" sm="4" xs="12">
              <InputField
                required
                v-model="form.password"
                text="password"
                holder="password"
              ></InputField>
            </v-col>
            <v-col v-if="!dialog_item" cols="12" sm="4" xs="12">
              <InputField
                required
                v-model="form.password_confirmation"
                text="confirm password"
                holder="confirm password"
              ></InputField>
            </v-col>
            <v-col cols="12" sm="6" xs="12">
              <v-radio-group label="الصلاحية" dense row v-model="form.role">
                <v-radio
                  v-for="n in 2"
                  :key="n"
                  :label="`${n == 1 ? $t('admin') : $t('user')}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-card flat>
                <v-card-subtitle>
                  {{ $t("assign account to the user") }}
                  <v-btn @click="expand = !expand" icon>
                    <v-icon small> fas fa-eye</v-icon>
                  </v-btn>
                </v-card-subtitle>

                <v-card-text>
                  <v-expand-transition>
                    <v-card flat v-show="expand">
                      <AccountAutocomplete
                        @select_all="(v) => selectAll(v)"
                        multiple
                        deletable-chips
                        allow-overflow
                        chips
                        select_all
                        :params="{ per_page: 1000, type_id: 3 }"
                        return-object
                        :filter="filter"
                        v-model="user_account"
                        item_value="acount_id"
                        text="account"
                        holder="account"
                      >
                      </AccountAutocomplete>
                      <table class="text-center user_account-table">
                        <tr>
                          <th>الحساب</th>
                          <th>
                            <v-row dense no-gutters class="align-center">
                              <v-col> الحالة</v-col>
                              <v-col>
                                <v-switch
                                  dense
                                  @change="(v) => change_all_states(v)"
                                  :true-value="1"
                                  :false-value="0"
                                  flat
                                  hide-details
                                  ripple
                                  v-model="all_status"
                                >
                                </v-switch>
                              </v-col>
                            </v-row>
                          </th>
                          <th>تاريخ الإنشاء</th>
                        </tr>
                        <tr :key="i" v-for="(account, i) in user_account">
                          <td>{{ account.name }}</td>
                          <td>
                            <v-switch
                              dense
                              :true-value="1"
                              :false-value="0"
                              flat
                              hide-details
                              ripple
                              v-model="account.status"
                            >
                            </v-switch>
                          </td>
                          <td>{{ account.created_at }}</td>
                        </tr>
                      </table>
                    </v-card>
                  </v-expand-transition>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center">
              <v-btn
                :disabled="!validated"
                @click="save"
                color="primary"
                height="45"
              >
                {{ $t("save") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      expand: false,
      validated: false,
      all_status: false,

      user_account: [],
      form: {
        type: 0,
        role: 2,
      },
    };
  },
  methods: {
    change_all_states(status) {
      console.log("test +asd +Asd A+S d+A da=s ", status);
      this.all_status = status;
      this.user_account.forEach((v) => {
        v.status = status;
      });
    },
    save() {
      this.$save({ ...this.form, no_reload: true }, "user").then((data) => {
        if (this.expand && this.user_account[0] && data) {
          let items = this.user_account.map((v) => {
            let item = {
              account_id: v.account_id,
              currency_id: v.currency_id,
              id: v.id,
              user_id: data.id,
              name: v.name,
              status: v.status == 1 ? 1 : 0,
            };
            return item;
          });
          this.$save({ items, silent: true }, "user_account");
        }
        this.$store.dispatch("closeDialog");
      });
    },
    filter() {
      return (v) => {
        v.currency_id > 0;
      };
    },
    selectAll(v) {
      this.user_account = v;
    },
  },
  computed: {
    ...mapState({
      dialog_item: (state) => state.state_dialog.item,
      user_accounts: (state) => state.user_account.all,
    }),
  },
  mounted() {
    if (this.dialog_item) {
      this.form = JSON.parse(JSON.stringify(this.dialog_item));
      this.$store.dispatch("user_account/index", {
        user_id: this.dialog_item.id,
      });
    }
  },
  watch: {
    user_accounts(val) {
      if (val[0]) {
        this.user_account = JSON.parse(JSON.stringify(val));
        this.expand = true;
      }
    },
    user_account(val, old) {
      if (old.length > val.length) {
        let difference = old.filter(
          (obj1) => !val.some((obj2) => obj1.id == obj2.id)
        );
        let obj = difference[0] || {};
        if (obj.id) {
          this.$store.dispatch("user_account/delete", {
            item: obj,
            no_reload: true,
          });
        }
      }
      if (val) {
        val = val.map((v) => {
          if (!v.user_id && v.id) {
            v.account_id = v.id;
            delete v.id;
          }
          return v;
        });
      }
    },
  },
};
</script>

<style>
.user_account-table .v-input__slot {
  justify-content: center;
}
.user_account-table {
  width: 100%;
}
.user_account-table,
.user_account-table td,
.user_account-table th {
  padding: 2px;
  border: black solid 1px;
  border-collapse: collapse;
}
.user_account-table th {
  padding: 5px;
}
.user_account-table .v-input--selection-controls {
  margin-top: 0px;
  padding-top: 4px;
}
.user_account-table tr:nth-child(even) {
  background: rgb(230, 230, 230);
}
</style>