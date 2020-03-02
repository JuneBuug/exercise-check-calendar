<template>

  <div>
    <Dot v-for="i in num" v-bind:color="colorPalette[i-1]" v-bind:key=i.value></Dot>
  </div>
   
</template>


<script>
import Dot from './Dot.vue'

export default {
    name: 'DotGroup',
    components: { Dot },
    props: {
          num: {
          type: Number, 
          default: 1,
          required: false
      }
    },
    data() {
      return {
         colorPalette: [
        "#6783FC",
        "#86E3CE",
        "#D0E6A5",
        "#FFDD94",
        "#FA897B",
        "#CCABD8",
        "#be8abf",
        "#ea9abb",
        "#fea5ad",
        "#f8c3af"
      ],
      }
    },
    created() {
    },
    methods: {
    }
}
</script>