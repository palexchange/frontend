<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-toolbar-title class="text-center"> {{$t('login_form')}} </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <form ref="form" @submit.prevent="login()">
        <v-text-field
          v-model="user.username"
          name="username"
          :label="$t('email')"
          :placeholder="$t('email')"
          type="text"
          required
          rounded
          filled
          dense
          prepend-inner-icon="fas fa-envelope"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          name="password"
          :label="$t('password')"
          :placeholder="$t('password')"
          :type="show1?'text':'password'"
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
        <!-- <v-checkbox label="Remember Me" dense></v-checkbox> -->
        <div class="red--text">{{ errorMessage }}</div>
        <v-btn :loading="loading" block type="submit" class="mt-4" color="primary" value="log in"
          >{{$t('login')}}</v-btn
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
      show1:false,
      loading:false
    };
  },
  methods: {
    async login() {
      this.loading=true;
      const { username,password } = this.user;
      await this.$auth.loginWith('local',{data:{email:username,password}});
      this.loading=false;
    },
  },
};
</script>