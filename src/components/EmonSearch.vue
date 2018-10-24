<template>

  <section class="hero is-success is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-grey is-size-5 logo" href="https://openenergymonitor.org">
              <span class="icon is-large has-text-grey"><i class="fas fa-tachometer-alt fa-lg"></i></span> Open<span class="has-text-info">EnergyMonitor</span>.org
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC" @click="hideNavBar = !hideNavBar">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu" :class="{'is-active': !hideNavBar}">
            <div class="navbar-end">
              <router-link :to="{ name: ''}" class="navbar-item" active-class="is-active">Home</router-link>
              <router-link :to="{ name: ''}" class="navbar-item"><span class="icon is-medium"><i class="fas fa-user"></i></span> User</router-link>
              <span class="navbar-item">
                <a class="button is-success is-inverted" href="https://github.com/emoncms/emoncms">
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>Download</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <div v-if="!hideNotification" class="notification has-text-dark">
          <button class="delete" @click="hideNotification = true"></button>
          <strong class="has-text-primary">VueJs emoncms api integration test.<em><u>Concept only.</u></em></strong><br>
          Search emoncms api for feeds, inputs, dashboards, graphs or modules. <br>
          Uses a <a href="https://en.wikipedia.org/wiki/Hash-based_message_authentication_code>">HMAC</a> (using aes-128-cbc) to transmit the authentication credentials.
          Additional emoncms API endpoints would be required to enable this demo to fully be functional.
        </div>
        <h1 class="title">Search</h1>
        <div id="search-control"  class="control has-icons-left has-icons-right is-large" :class="{ 'is-loading': state=='loading'}">
          <input @input="search" class="input is-large is-rounded" placeholder="Search..." v-model="q" autofocus :title="error">
          <span class="icon is-medium is-left" :class="{ 'is-hidden': state=='error'}"><i class="ok fas fa-search"></i></span>
          <span class="icon is-medium is-left" :class="{ 'is-hidden': state!='error'}"><i class="error fas fa-exclamation-triangle"></i></span>
        </div>

        <h2 class="subtitle" v-if="Object.keys(results).length==0">Search our API.</h2>
        <h2 class="subtitle" v-else>Searched for: "{{ q }}". Found {{ Object.keys(results).length }} Inputs.</h2>

        <transition name="bounce">
          <div v-if="Object.keys(results).length > 0">
            <ul>
              <li v-for="(result, key, index) in results" :key="index" class="is-size-4">
                {{index+1}}. {{ key }}
                <ul>
                  <li v-for="(value, key2, index2) in result" :key="index2" class="is-size-6">
                    {{ key2 }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <router-link active-class="is-active" to="/" tag="li"><a href="/">Home</a></router-link>
            <router-link active-class="is-active" to="/feeds" tag="li"><a href="/feeds">Feeds</a></router-link>
            <router-link active-class="is-active" to="/input" tag="li"><a href="/feeds">Inputs</a></router-link>
          </ul>
        </div>
      </nav>
    </div>
  </section>

</template>

<script>
var debounce = require('debounce')
export default {
  data () {
    return {
      q: '',
      error: '',
      results: {},
      state: 'ready',
      hideNotification: false,
      hideNavBar: true
    }
  },
  methods: {
    search: debounce(function (event) {
      let that = this
      this.state = 'loading'
      this.error = ''
      let options = {
        params: {
          search: event.target.value,
          hmac: this.emoncms.HASH,
          encrypted: this.emoncms.encrypt('node=emontx&data={power1:100,power2:200,power3:300}')
        }
      }
      // console.log(options.params)
      this.$http
        .get(process.env.ROOT_API + '/input/get?apikey=' + process.env.API_KEY, options)
        .then(function (response) {
          that.results = response.data
          that.state = 'ready'
        })
        .catch(function (error) {
          that.state = 'error'
          that.error = error.message
        })
    }, 600)
  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
