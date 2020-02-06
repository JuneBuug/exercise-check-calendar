<template>
  <div id="app">
   <Nav></Nav>
   
    <router-view/>
  </div>
</template>


<script>
import Nav from './components/Nav.vue'
import moment from 'moment-timezone'

export default {

  components: {
    Nav
  },
  data() {
    return {
      todos: [],
    }
  },
  created() {
    console.log("Created App")
  },
  methods: {
    create() {
      this.$http.post('/.netlify/functions/todos-create', {'title': 'My todo', completed: false})
    .then(res => {
        console.log(res)
      })
    },
    getAll() {
      this.$http.get('/.netlify/functions/todos-read-all')
      .then(res => {
        console.log(res)
        this.todos = res.data
        }
      )
    },
    
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
