<template>
  <div id="app">
   <Nav></Nav>
  
    <input type="email" v-model="email"></input>
    <input type="password" v-model="password"></input>

    <button class="button" @click="signup()">가입</button>
    <button class="button" @click="login()">로그인</button>
    <!-- <button @click="getAll()">클릭</button>
    <li v-for="todo in todos">{{todo.data.title}} <span>{{todo.data.completed}}</span> </li> -->
    <router-view/>
  </div>
</template>


<script>
import Nav from './components/Nav.vue'

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
