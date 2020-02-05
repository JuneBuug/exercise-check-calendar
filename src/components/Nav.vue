<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <img src="../assets/ringfit.png" width="118" height="28"/>
    </a>

    <a role="button" 
    class="navbar-burger burger" 
    :class="{'is-active': activeFlag}" 
    aria-label="menu" 
    aria-expanded="false" data-target="navbarBasicExample"
    @click="activateHamburger()" >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

  </div>

  <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active': activeFlag}">
    <div class="navbar-start">
      <router-link  class="navbar-item" to="/">Home</router-link> 
      <router-link  class="navbar-item" to="/cal">Calendar</router-link>
    
    </div>


  </div>
</nav>

</template>


<script>

export default {
    name: 'Nav',
    data() {
      return {
        activeFlag: false, 
      }
    },
    created() {
    },
    methods: {
      activateHamburger() {
        this.activeFlag = !this.activeFlag
      }
    }
}
</script>