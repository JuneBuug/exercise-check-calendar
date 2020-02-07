<template>
  <div class="about">


  <section class="hero is-primary" style="margin-bottom:4%">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
      {{ $route.params.nickname }}
      </h1>
      <h2 class="subtitle">
        서두르지말고 천천히 일어서!
      </h2>
    </div>
  </div>
</section>

   
    <!-- 요일 컴포넌트 시작 -->

    <input type=number  class="input" v-model="kcal"></input>

                  <button
                    class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="updateRecord()"
                  >업데이트</button>

    {{ record.data }}
    <div class="columns is-multiline" stlye="margin-left: 2%; margin-right:2%;">
      <div class="column" v-for="j in 7">
        <div class="box no-shadow">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p class="has-text-centered">
                  <strong>{{ weekdays[j-1] }}</strong>
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
                  <span class="has-text-weight-bold">DAY {{(i-1)* 7 + j}} </span>
                  <br/>
                  <span class="has-text-weight-light"> {{dateArray[(i-1)* 7 + j - 1 ]}}</span>
                  <br />

<!--               
                  <Dot v-if="!!record.data.numberOfDots" v-for="num in numberOfDots"></Dot> -->

                  <button
                    v-if="dateArray[(i-1)* 7 + j - 1 ] == today"
                    class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="turnChecked()"
                  >

                    <span v-if="!checked">인증🔥</span>
                    <span v-if="checked">추가인증</span>
                  </button>
                
                  <Dot v-else-if="dateArray[(i-1)* 7 + j - 1 ] > today" color="#6783FC" @click="showModal()"></Dot>
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

      <div class="modal" :class="{'is-active': showInputModalFlag}">
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
      today: moment().format("MM/DD"),
      checked: false,
      showModalFlag: false,
      showInputModalFlag: false,
      kcal: 0,
      startDate: {},
      endDate: {},
      dateArray: [],
      elapsedTimeInSec: 0,
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
      weekdays: ["월", "화", "수", "목", "금", "토", "일"],
      colorPalette: ["#6783FC", "#86E3CE", "#D0E6A5","#FFDD94", "#FA897B", "#CCABD8" ],
      record: {}
    };
  },
  props: { nickname: String },
  created() {
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

    this.startDate = moment("2020-01-27")
    this.endDate = moment("2020-01-27").add(34, 'days')
    this.getDateRange()
    
    // this.getRecordByName()
  },
  methods: {
    getDateRange() {
      console.log(this.startDate.isBefore(this.endDate))
      while(this.startDate.isSameOrBefore(this.endDate)) {
  
        this.dateArray.push(this.startDate.format("MM/DD"))
        this.startDate.add(1, 'days')
      }
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
          kcal: this.kcal,
          numberOfDots: this.kcal / 50,
          elapsedTimeInSec: this.elapsedTimeInSec
        })
        .then(res => {
          this.showModal();
          console.log(res);
        });
    },
    updateRecord() {
      this.$http
      .post("/.netlify/functions/records-update", {
          name: this.nickname,
          completed: this.checked,
          date: moment(new Date()).format("YYYY-MM-DD"),
          kcal: this.kcal,
          numberOfDots: this.kcal / 50,
          elapsedTimeInSec: this.elapsedTimeInSec
      })
      .then (res => {
        console.log(res);
      })
    },
    getRecordByName() {
      this.$http.get("/.netlify/functions/records-read-by-name")
      .then (res => {
        this.record = res.data
        console.log(res)
      })
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