<template>
  <div class="about">

   <div class="columns is-multiline" stlye="margin-left: 2%; margin-right:2%;" v-for="i in 5">
      <div class="column" v-for="j in 7">
          <div class="box light-shadow">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered">
                    <strong>DAY {{(i-1)* 7 + j}} </strong>
                    <br>
                    <button v-if="(i-1)* 7 + j == today" 
                    class="button is-info is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="turnChecked()">
                      <span v-if="!checked">인증🔥</span>
                      <span v-if="checked">인증완료</span>
                    </button>
                    <button v-else-if="(i-1)* 7 + j > today" 
                    class="button is-success is-light is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="showModal()">👀</button>
                    <button v-else class="button is-light is-outlined is-rounded full-width">만료</button>
                  </p>
                </div>
              </div>
            </article>
        </div>
      </div>    
  </div>


<div class="modal" :class="{'is-active': showModalFlag}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p>잘했어! 반짝이는 땀이 정말 아름다워!</p>
           <button @click="hideModal()" class="button is-white is-outline">
            ✅
            </button>       
          </section>
      </div>
    </div>
  </section>
  </div>
</template>


<script>

export default {
  name: 'Cal',
  data() {
    return {
      columns: 35,
      days: 0,
      today: new Date().getDate(),
      checked: false,
      showModalFlag: false
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
    },
    turnChecked() {
      this.checked = !this.checked
    },
    showModal() {
      this.showModalFlag = true;
    },
    hideModal() {
      this.showModalFlag = false;
    }
  }
}
</script>


<style>
.full-width {
  width: 100%;
}

.light-shadow {
   box-shadow: 0 5px 14px rgba(10, 10, 10, 0.05), 5px 5px 5px 5px rgba(216, 215, 215, 0.05);
   -webkit-box-shadow:0 5px 14px rgba(10, 10, 10, 0.05), 5px 5px 5px 5px rgba(216, 215, 215, 0.05)
}
</style>