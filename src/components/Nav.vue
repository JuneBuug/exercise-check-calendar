<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      체크 TEST 
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link  class="navbar-item" to="/">Home</router-link> 
      <router-link  class="navbar-item" to="/about">About</router-link>
    
    </div>


  </div>
</nav>

</template>


<script>

export default {
    name: 'Nav'
}
</script>