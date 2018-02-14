<template>
 <transition name="modal">
  <div class="row remove">
    <div @click="Close" class="wrap_block">
      <div class=" col-xl-4 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto text-center">
        <div class="window pt-5 pb-2 mb-4 container">
          <img src="../../assets/images/cancel.svg" class="d-xl-none d-lg-none d-md-none d-sm-none " id="close-btn">
          <h2 class="pb-1 px-2">Вы уверены, что хотите данный элемент?</h2>
          <button class="col-xl-5 col-lg-5 col-md-5 col-sm-11 col-11  button red mr-xl-3 mr-lg-3 mr-md-3 mx-sm-auto mx-auto mb-1 mt-5 text-center" @click="Remove()">Удалить</button>  
          <button id="cancel" class="col-xl-5 col-lg-5 col-md-5 col-sm-11 col-11  button blue mx-auto mb-3 mt-1 text-center" >Отмена</button>   
          <transition name="flowup">
            <p class="errorMessage error col-xl-11  mx-auto text-center px-0 mt-3" v-if="isRemovable">Вы не можете удалить единственный элемент</p>
          </transition>
        </div>
      </div>
    </div> 
  </div>
 </transition> 
</template>
<script>
export default {
  name: 'confirmation',
  data: function () {
    return {
      isRemovable: ''
    }
  },
  props: ['removeItem'],
  methods: {
    Remove () {
      let result
      if (this.removeItem.step === 'education') {
        result = this.$store.dispatch('removeSchool', this.removeItem.property)
      }
      if (this.removeItem.step === 'skills') {
        result = this.$store.dispatch('removeSkill', this.removeItem.property)
      }
      if (this.removeItem.step === 'experience') {
        result = this.$store.dispatch('removeWork', this.removeItem.property)
      }
      result.then(() => {
        this.isRemovable = false
        this.$emit('closeRemoveWindow')
      }).catch(() => {
        this.isRemovable = true
      })
    },
    Close: function (e) {
      if (e.target.className === 'wrap_block' || e.target.id === 'close-btn' || e.target.id === 'cancel') {
        this.$emit('closeRemoveWindow')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.errorMessage{
  border: none !important;
  background: none;
}
.remove {
  position: fixed;
  z-index: 200;
  transition: opacity 0.3s ease;
}
.wrap_block {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(32, 32, 32, 0.97);
  transition: 0.3s ease;
  .window {
    background: white;
    border-radius: 6px;
    border-top: 5px solid $btn_blue_text;
    box-shadow: 0px 3px 10px 2px rgba(49, 49, 49, 0.678);
  }
  p {
    color: grey;
    font-family: $Exo;
    letter-spacing: -0.2px;
    font-weight: 300;
  }
}
h2 {
  font-family: $Exo;
  font-weight: 300;
}
.link-text {
  color: $active;
  cursor: pointer;
}
.link-text:hover {
  opacity: 0.7;
}
</style>