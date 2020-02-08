<template>
  <div class="modal" :class="{'is-active': showModalFlag}">
    <div class="modal-background" @click="hideModal()"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <p role="button" @click="hideModal()">잘했어! 반짝이는 땀이 정말 아름다워!</p>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "Modal",
  props: {
    showModalFlag: {
      type: Boolean,
      default: false
    },
    comment: {
      type: String
    }
  },
  data() {
    return {
      showModal() {
        this.showModalFlag = true;
      },
      hideModal() {
        this.showModalFlag = false;
      }
    };
  }
};
</script>