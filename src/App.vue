<template>
  <div id="app">
   <Nav></Nav>
  
    <!-- <button @click="getAll()">클릭</button>
    <li v-for="todo in todos">{{todo.data.title}} <span>{{todo.data.completed}}</span> </li> -->
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
      email: '',
      password: '',
    }
  },
  created() {
    console.log(moment(new Date()))
    console.log("만들어졌따")
    this.getAll()
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
    signup() {
      this.$http.post('/.netlify/functions/users-signup', {'email': this.email, 'password': this.password})
      .then(res => {
         console.log(res)
      })
    },
    login() {
      this.$http.post('/.netlify/functions/users-login', {'email': this.email, 'password': this.password})
      .then(res => {
         console.log(res)
      })
    }
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
