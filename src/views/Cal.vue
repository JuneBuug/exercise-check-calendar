<template>
  <div class="about">
    {{ $route.params.nickname }}
    <!-- 요일 컴포넌트 시작 -->
    <div class="columns is-multiline" stlye="margin-left: 2%; margin-right:2%;">
      <div class="column" v-for="j in 7">
        <div class="box no-shadow">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p class="has-text-centered">
                  <strong>{{ weekdaysShort[j-1] }}</strong>
                  <br />
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <!-- 요일 컴포넌트 종료 -->

    <div class="columns is-multiline" stlye="margin-left: 2%; margin-right:2%;" v-for="i in 5">
      <div class="column" v-for="j in 7">
        <div class="box light-shadow">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p class="has-text-centered">
                  <span>DAY {{(i-1)* 7 + j}}</span>
                  <br />

                  

                  <button
                    v-if="(i-1)* 7 + j == today || (i-1) * 7 + j + 1 == today "
                    class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="turnChecked()"
                  >
                    <span v-if="!checked">인증🔥</span>
                    <span v-if="checked">인증완료</span>
                  </button>
                
                  <Dot  v-else-if="(i-1)* 7 + j > today" color="#6783FC" @click="showModal()"></Dot>
                  <Dot v-else color=#86E3CE></Dot>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="modal" :class="{'is-active': showModalFlag}">
      <div class="modal-background" @click="hideModal()"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p role="button" @click="hideModal()">잘했어! 반짝이는 땀이 정말 아름다워!</p>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment-timezone";
import Dot from "../components/Dot";

export default {
  name: "Cal",
  components: { Dot },
  data() {
    return {
      columns: 35,
      days: 0,
      today: new Date().getDate(),
      checked: false,
      showModalFlag: false,
      kcal: 0,
      elapsedTimeInSec: 0,
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
      colorPalette: ["#6783FC", "#86E3CE", "#D0E6A5","#FFDD94", "#FA897B", "#CCABD8" ]
    };
  },
  props: { nickname: String },
  created() {
    console.log("이번달의 days: " + this.getDaysInThisMonth());
    this.days = this.getDaysInThisMonth();
    moment.updateLocale("Asia/Seoul", {
      weekdays: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ],
      weekdaysShort: this.weekdaysShort
    });

    var m = moment();

    console.log(m.format("YYYY-MM-DD HH:mm:ss ddd"));
  },
  methods: {
    getDaysInThisMonth() {
      var today = new Date();
      var year = today.getYear();
      var month = today.getMonth();

      return new Date(year, month, 0).getDate();
    },
    turnChecked() {
      this.checked = !this.checked;
      this.createRecord();
    },
    showModal() {
      this.showModalFlag = true;
    },
    hideModal() {
      this.showModalFlag = false;
    },
    createRecord() {
      this.$http
        .post("/.netlify/functions/records-create", {
          name: this.nickname,
          completed: this.checked,
          date: moment(new Date()).format("YYYY-MM-DD"),
          cal: this.kcal,
          elapsedTimeInSec: this.elapsedTimeInSec
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>


<style>
.full-width {
  width: 100%;
}

.light-shadow {
  box-shadow: 0 5px 14px rgba(10, 10, 10, 0.05),
    5px 5px 5px 5px rgba(216, 215, 215, 0.05);
  -webkit-box-shadow: 0 5px 14px rgba(10, 10, 10, 0.05),
    5px 5px 5px 5px rgba(216, 215, 215, 0.05);
}
</style>