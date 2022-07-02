<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title>Register Form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form ref="form" @submit.prevent="register()">
        <v-text-field
          v-model="user.name"
          name="username"
          label="Username"
          type="text"
          placeholder="username"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-user"
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          name="email"
          label="Email"
          type="text"
          placeholder="email"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-envelope"
        ></v-text-field>
        <v-text-field
          v-model="user.phone"
          name="phone"
          label="Phone"
          type="text"
          placeholder="phone"
          rounded
          filled
          dense
          required
          prepend-inner-icon="fas fa-mobile"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          name="password"
          label="Password"
          type="password"
          placeholder="password"
          rounded
          filled
          dense
          required
          @click:append="show1 = !show1"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          hint="At least 8 characters"
          counter
          prepend-inner-icon="fas fa-lock"
        ></v-text-field>

        <v-text-field
          v-model="user.confirm_password"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="cocnfirm password"
          rounded
          filled
          dense
          required
          @click:append="show2 = !show2"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          hint="At least 8 characters"
          counter
          prepend-inner-icon="fas fa-lock"
        ></v-text-field>
        <div class="red--text">{{ errorMessage }}</div>
        <v-btn block type="submit" class="mt-4" color="primary" value="register"
          >Register</v-btn
        >
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  layout: "guest",
  middleware:'auth',
  auth:'guest',
  data() {
    return {
      user: {},
      errorMessage: "",
      show1: false,
      show2: false,
    };
  },
  methods: {
    register() {
      if (this.password == this.confirmPassword) {
        this.isRegister = false;
        this.errorMessage = "";
        this.$save(this.user,'user');
        this.$refs.form.reset();
      } else {
        this.errorMessage = "password did not match";
      }
    },
  },
};
</script>