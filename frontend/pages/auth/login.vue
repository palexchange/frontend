<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title class="text-center"> Login Form </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form ref="form" @submit.prevent="login()">
        <v-text-field
          v-model="user.username"
          name="username"
          label="Username"
          type="text"
          placeholder="username"
          required
          rounded
          filled
          dense
          prepend-inner-icon="fas fa-user"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          name="password"
          label="Password"
          type="password"
          placeholder="password"
          required
          rounded
          filled
          dense
          @click:append="show1 = !show1"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          hint="At least 8 characters"
          counter
          prepend-inner-icon="fas fa-lock"
        ></v-text-field>
        <v-checkbox label="Remember Me" dense></v-checkbox>
        <div class="red--text">{{ errorMessage }}</div>
        <v-btn block type="submit" class="mt-4" color="primary" value="log in"
          >Login</v-btn
        >
      </form>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "Login",
  layout: "guest",
  data() {
    return {
      user: {
        username:'ahmed@ahmed.com',
        password:'123456'
      },
      errorMessage: "",
      show1:false
    };
  },
  methods: {
    login() {
      const { username,password } = this.user;
      this.$auth.loginWith('local',{data:{email:username,password}});
    },
  },
};
</script>