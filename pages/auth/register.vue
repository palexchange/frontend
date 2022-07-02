<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>{{ $t("register_form") }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form ref="form" @submit.prevent="register()">
        <v-text-field
          v-model="user.name"
          name="username"
          :label="$t('username')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-user"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          name="email"
          :label="$t('email')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-envelope"
        ></v-text-field>
        <v-text-field
          v-model="user.phone"
          name="phone"
          :label="$t('phone')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-mobile"
        ></v-text-field>
        <v-text-field
          v-model="user.phone2"
          name="phone2"
          :label="$t('phone2')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-mobile"
        ></v-text-field>
        <v-text-field
          v-model="user.organization"
          name="organization"
          :label="$t('organization')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-building"
        ></v-text-field>
        <v-text-field
          v-model="user.address"
          name="address"
          :label="$t('address')"
          type="text"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-mobile"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          name="password"
          :label="$t('password')"
          :type="show1 ? 'text' : 'password'"
          rounded
          filled
          dense
          required
          @click:append="show1 = !show1"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :hint="$t('at_least_8_characters')"
          :rules="[(v) => (v || '').length >= 8 || $t('at_least_8_characters')]"
          prepend-inner-icon="fas fa-lock"
          validate-on-blur
        ></v-text-field>

        <v-text-field
          v-model="user.confirm_password"
          name="confirmPassword"
          :label="$t('confirm_password')"
          :type="show2 ? 'text' : 'password'"
          rounded
          filled
          dense
          required
          :rules="[
            (v) => (v || '') == user.password || $t('passwords_dont_match'),
          ]"
          validate-on-blur
          @click:append="show2 = !show2"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          hint="At least 8 characters"
          counter
          prepend-inner-icon="fas fa-lock"
        ></v-text-field>
        <div class="red--text">{{ errorMessage }}</div>
        <v-btn
          block
          type="submit"
          class="mt-4"
          color="primary"
          value="register"
          :loading="loading"
          >{{ $t("register") }}</v-btn
        >
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  layout: "guest",
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      user: {},
      errorMessage: "",
      show1: false,
      show2: false,
      loading: false,
    };
  },
  methods: {
    async register() {
      if (this.password == this.confirmPassword) {
        this.isRegister = false;
        this.errorMessage = "";
        this.loading = true;
        await this.$save(this.user, "user");
        this.loading = false;
        this.$refs.form.reset();
        this.$swal({
          title: this.$t("register_successfull"),
          text: this.$t("please_contact_for_activation"),
          icon: "success",
          confirmButtonText: this.$t("ok"),
        }).then((v) => {
          this.$router.push("/");
        });
      } else {
        this.errorMessage = "password did not match";
      }
    },
  },
};
</script>