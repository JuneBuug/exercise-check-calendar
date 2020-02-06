<template>
   <svg
      id="cont"
      height="30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <circle id="cir1" cx="15" cy="15" r="10" :fill=color />
    </svg>
</template>


<script>

export default {
    name: 'Dot',
    props: {
          color: {
          type: String, 
          default: 'blue',
          required: false
      }
    },
    data() {
      return {
        members: ['juneyr', 'hypetrain','talonF'],
        activeFlag: false, 
      }
    },
    created() {
    },
    methods: {
      activateHamburger() {
        this.activeFlag = !this.activeFlag
      }
    }
}
</script>