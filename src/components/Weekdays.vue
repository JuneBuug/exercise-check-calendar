<template>
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
</template>


<script>

export default {
    name: 'Weekdays',
    props: {
      
    },
    data() {
      return {
         weekdays: ["월", "화", "수", "목", "금", "토", "일"],
      }
    },
    created() {
    },
    methods: {
    }
}
</script>