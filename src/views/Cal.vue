<template>
  <div class="about">

    <Hero desc="근육은 단련받은 은혜를 잊지않습니다."></Hero>

    <input type="number" class="input" v-model="kcal" />

    <button
      class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
      @click="updateRecord()"
    >업데이트</button>
    {{ record.data }}

    <Weekdays></Weekdays>
   
    <div class="columns is-multiline" stlye="margin-left: 2%; margin-right:2%;" v-for="i in 5">
      <div class="column" v-for="j in 7">
        <div class="box light-shadow">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p class="has-text-centered">
                  <span class="has-text-weight-bold">DAY {{(i-1)* 7 + j}}</span>
                  <br />
                  <span class="has-text-weight-light">{{dateArray[(i-1)* 7 + j - 1 ]}}</span>
                  <br />

                  <!--               
                  <Dot v-if="!!record.data.numberOfDots" v-for="num in numberOfDots"></Dot>-->

                  <button
                    v-if="dateArray[(i-1)* 7 + j - 1 ] == today"
                    class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="turnChecked()"
                  >
                    <span v-if="!checked">인증🔥</span>
                    <span v-if="checked">추가인증</span>
                  </button>

                  <Dot
                    v-else-if="dateArray[(i-1)* 7 + j - 1 ] > today"
                    color="#6783FC"
                  ></Dot>
                  <Dot v-else color="#86E3CE"></Dot>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <Modal ref="success" showModalFlag=false></Modal>

  </div>
</template>


<script>
import moment from "moment-timezone";
import Dot from "../components/Dot";
import Hero from "../components/Hero"
import Weekdays from "../components/Weekdays"
import Modal from "../components/Modal"


export default {
  name: "Cal",
  components: { Dot, Hero, Weekdays },
  data() {
    return {
      columns: 35,
      today: moment().format("MM/DD"),
      checked: false,
      kcal: 0,
      startDate: {},
      endDate: {},
      dateArray: [],
      elapsedTimeInSec: 0,
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
      colorPalette: [
        "#6783FC",
        "#86E3CE",
        "#D0E6A5",
        "#FFDD94",
        "#FA897B",
        "#CCABD8"
      ],
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

    this.startDate = moment("2020-01-27");
    this.endDate = moment("2020-01-27").add(34, "days");
    this.getDateRange();

    // this.getRecordByName()
  },
  methods: {
    getDateRange() {
      console.log(this.startDate.isBefore(this.endDate));
      while (this.startDate.isSameOrBefore(this.endDate)) {
        this.dateArray.push(this.startDate.format("MM/DD"));
        this.startDate.add(1, "days");
      }
    },
    turnChecked() {
      this.checked = !this.checked;
      this.createRecord();
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
          vm.$refs.success.showModal();
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
        .then(res => {
          console.log(res);
        });
    },
    getRecordByName() {
      this.$http.get("/.netlify/functions/records-read-by-name").then(res => {
        this.record = res.data;
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