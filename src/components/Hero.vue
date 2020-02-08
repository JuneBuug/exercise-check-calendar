<template>
    <section class="hero is-primary" style="margin-bottom:4%">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ $route.params.nickname }}</h1>
          <h2 class="subtitle">{{ desc }} </h2>
        </div>
      </div>
    </section>
</template>


<script>

export default {
    name: 'Hero',
    props: {
          desc: {
          type: String, 
          default: '서두르지말고 천천히 일어서!',
          required: false
      }
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
}
</script>