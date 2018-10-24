<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import fontawesome from '@fortawesome/fontawesome'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'

import faTachometerAlt from '@fortawesome/fontawesome-free-solid/faTachometerAlt'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle'

fontawesome.library.add(faUser, faGithub, faTachometerAlt, faSearch, faCheck, faExclamationTriangle)

export default {
  name: 'App'
}
</script>

<style lang="sass" src="bulma"></style>
<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Montserrat');
</style>
<style>
body{font-family: 'Montserrat', 'montserrat', 'Source Sans', 'Helvetica Neue', Helvetica, 'Arial Black', Arial, sans-serif;}

.navbar-brand .logo{
  border-radius: .3em;
  padding: 0 .5em 0 .3em;
  margin: .2em 0;
  font-weight: 600;
  font-family: Montserrat;
  letter-spacing: -.02em;
}

.navbar-brand .logo,
.navbar-brand .logo * {
  transition-duration: 0.7s, 0.2s;
  transition-property: color, background-color;
  transition-delay: 0s, 0.2s;
  transition-timing-function: ease;
}
.navbar-brand .logo:hover,
.navbar-brand .logo:hover * {
  transition-duration: 0, .2s;
  transition-property: color, background-color;
  transition-delay: 0, 0;
  transition-timing-function: ease;
}
.navbar-brand .logo:hover,
.navbar-brand .logo:hover * {color: white!important}
</style>
