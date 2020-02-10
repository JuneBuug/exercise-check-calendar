<template>
  <div class="about">
    <Hero desc="근육은 단련받은 은혜를 잊지않습니다."></Hero>

    <!-- <input type="number" class="input" v-model="kcal" /> -->

    <Weekdays v-if="!isMobile()"></Weekdays>

    <div class="columns is-multiline" style="margin-left: 2%; margin-right:2%;" v-for="i in 5">
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

                  <h2
                    class="has-text-centered"
                    v-for="re in record"
                    v-if="dateArray[(i-1)* 7 + j - 1 ] == re.data.date"
                    > {{ re.data.kcal }} kcal </h2>
                  <DotGroup
                    v-for="re in record"
                    v-if="dateArray[(i-1)* 7 + j - 1 ] == re.data.date"
                    v-bind:num="re.data.numberOfDots"
                  ></DotGroup>

                  <button
                    v-if="dateArray[(i-1)* 7 + j - 1 ] == today && !checked"
                    class="button is-success is-outlined is-rounded full-width has-text-weight-semibold"
                    @click="showModal()"
                  >
                    <span>인증🔥</span>
                  </button>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <Modal ref="success"></Modal>

    <div class="modal" :class="{'is-active': showModalFlag}">
      <div class="modal-background" @click="hideModal()"></div>
      <div class="modal-card">
        <section class="modal-card-body">

          <div class="field">
            <div class="control">
              <div class="select is-primary is-fullwidth">
                <select v-model="kcal">
                  <option disabled>소모한 칼로리 선택</option>
                  <option v-for="n in fives()">{{n}}</option>
                </select>
              </div>
            </div>
          </div>
          
          <br />
        
          <button
            class="button is-success is-outlined is-rounded full-width"
            @click="turnChecked()"
          >
            <span>인증🔥</span>
          </button>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment-timezone";
import Dot from "../components/Dot";
import Hero from "../components/Hero";
import Weekdays from "../components/Weekdays";
import Modal from "../components/Modal";
import DotGroup from "../components/DotGroup";

export default {
  name: "Cal",
  props: {
    username: {
      type: String
    }
  },
  components: { Dot, Hero, Weekdays, DotGroup, Modal },
  data() {
    return {
      columns: 35,
      today: moment().format("YYYY-MM-DD"),
      checked: false,
      kcal: 0,
      elapsedTimeInSec: 0,
      showModalFlag: false,
      startDate: {},
      endDate: {},
      dateArray: [],
      weekdaysShort: ["일", "월", "화", "수", "목", "금", "토"],
      colorPalette: [
        "#6783FC",
        "#86E3CE",
        "#D0E6A5",
        "#FFDD94",
        "#FA897B",
        "#CCABD8"
      ],
      record: []
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

    this.getRecordByName();
  },
  watch: {
    $route(to, from) {
      this.getRecordByName();
    }
  },
  methods: {
    getDateRange() {
      console.log(this.startDate.isBefore(this.endDate));
      while (this.startDate.isSameOrBefore(this.endDate)) {
        this.dateArray.push(this.startDate.format("YYYY-MM-DD"));
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
          date: moment(new Date()).format("YYYY-MM-DD"),
          kcal: this.kcal,
          numberOfDots: Math.floor(this.kcal / 25),
          elapsedTimeInSec: this.elapsedTimeInSec
        })
        .then(res => {
           // vm.$refs.success.showModal();
          this.hideModal();
          this.getRecordByName();
          console.log(res);
        });
    },
    updateRecord() {
      this.$http
        .post("/.netlify/functions/records-update", {
          name: this.nickname,
          date: moment(new Date()).format("YYYY-MM-DD"),
          kcal: this.kcal,
          numberOfDots: Math.floor(this.kcal / 25),
          elapsedTimeInSec: this.elapsedTimeInSec
        })
        .then(res => {
          console.log(res);
        });
    },
    getRecordByName() {
      const username = this.$route.params.nickname;

      this.$http
        .post("/.netlify/functions/records-read-by-name", { name: username })
        .then(res => {
          this.record = res.data;

          for (var index in this.record) {
            if (this.record[index].data.date === this.today) {
              this.checked = true;
            }
          }

          console.log(res.data);
        });
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    showModal() {
      this.showModalFlag = true;
    },
    hideModal() {
      this.showModalFlag = false;
    },
    fives(){
      var numbers = []

      for (var i=1; i<= 150; i ++ ){
          numbers.push(i)
      }
      return numbers
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

.mb-2 {
  margin-bottom: 2%;
}
</style>