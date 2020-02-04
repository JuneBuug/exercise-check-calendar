<template>
  <div class="about">
  <div class="columns is-multiline">
      <div class="column" v-for="day in days">
            <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{day}}</strong>
                  <br>
                  <button class="button is-info is-light">인증</button>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    
  </div>
  </div>
</template>


<script>

export default {

  data() {
    return {
      days: 0
    }
  },
  created() {
    console.log("이번달의 days: " + this.getDaysInThisMonth())
    this.days = this.getDaysInThisMonth()
  },

  methods: {

    getDaysInThisMonth(){
      var today = new Date();
      var year = today.getYear();
      var month = today.getMonth();

      return new Date(year, month, 0).getDate()
    }
  }
}
</script>