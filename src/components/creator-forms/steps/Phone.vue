<template>
    <div class="phone-style col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 text-right mr-0 pr-0 pl-0 pl-xl-3 pl-lg-3 pl-md-3 pl-sm-0 pl-0" id="phone">
        <input id="phone_code"  :class="['country-code py-3 mr-0 col-3 block_neutral',{'pl-4' : !country}, {error : phone_code_invalid || errorStatus}]" type="tel" placeholder="+ Код" @change="get_country_code()"  v-model="phone_code_local"/><input id="phone_number" :class="['block_neutral col-9 pl-4 py-3', {error: phone_invalid || errorStatus}]" type="tel"  placeholder="Доп. телефон (необязательно)" @change="processPhone()" v-model="phone_number_local"/>
        <label v-if="country" for="phone_code">
            <img class="flag" :src="country" width="25px"/>
        </label>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      country: '',
      phone_code_invalid: false,
      phone_invalid: false,
      phone_code_local: '',
      phone_number_local: '',
      VALID_PHONE_REG: /^((-{0,1}\(\d+\)-)|(\(\d+\))){0,1}\d{3,}(-\d+)*$/
    }
  },
  props: ['phoneData','errorStatus'],
  mounted () {
    if (this.phoneData.phone.code) {
      this.phone_code_local = this.phoneData.phone.code
    }
    if (this.phoneData.phone.number) {
      this.phone_number_local = this.phoneData.phone.number
    }
  },
  methods: {
    get_country_code: function () {
      this.country = ''
      let code = $('#phone_code')
        .val()
        .trim()
      if (code.indexOf('+') >= 0) {
        code = code.substr(1)
      }
      axios
        .get(
          'https://restcountries.eu/rest/v2/callingcode/' +
            code +
            '?fields=flag'
        )
        .then(response => {
          this.phone_code_invalid = false
          this.country = response.data[0].flag
        })
        .catch(e => {
          this.phone_code_invalid = true
        })
    },
    processPhone () {
      if (!this.phone_code_invalid) {
        let phoneCode = $('#phone_code')
          .val()
          .trim()
        let phoneNumber = $('#phone_number')
          .val()
          .trim()
        if (!this.VALID_PHONE_REG.test(phoneNumber)) {
          this.phone_invalid = true
          return
        } else {
          this.phone_invalid = false
        }
        let phone = { code: phoneCode, number: phoneNumber }
        this.$emit('changePhone', { phone: phone, num: this.phoneData.i })
      } else {
        this.phone_code_invalid = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../../assets/styles/global";
@mixin flag_inputs {
  .phone-style {
    label {
      left: 7%;
    }
    input:first-child {
      padding-left: 25px !important;
      color: white;
      transition-delay: 0s;
    }
    input:first-child ~ input {
      transition: 0.2s;
      transition-delay: 0.1s;
    }
    input:first-child:focus {
      z-index: 2;
      width: 25%;
      color: $btn_blue_text;
      transition-delay: 0.1s;
    }
    input:first-child:focus ~ input {
      width: 80%;
      transition-delay: 0s;
      transition: 0.2s;
    }
  }
}
.phone-style {
  position: relative;
  label {
    position: absolute;
    top: 18%;
    left: 6%;
    opacity: 1;
    transition: 0.3s;
  }
  input:first-child {
    position: relative;
  }
  input:first-child {
    width: 25%;
    padding-left: 60px;
    background: white;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  input:first-child:focus {
    z-index: 1;
    padding-left: 20px;
  }
  input:first-child:focus ~ label {
    left: 1%;
  }
  input:nth-child(2) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin-left: -1px;
  }
}
@media (max-width: 990px) and (min-width: 768px) {
  @include flag_inputs;
  #phone input:nth-child(2) ~ label {
    left: 12%;
  }
}
@media (max-width: 767px) {
  .phone-style:last-child {
    label {
      top: 25%;
      left: 4%;
    }
    input:first-child:focus ~ label {
      opacity: 0;
      left: 1%;
      transition: 0s;
    }
  }
}
@media (max-width: 545px) {
  @include flag_inputs;
  .phone-style label {
    display: block;
  }
  #phone input:nth-child(2) ~ label {
    left: 7%;
  }
}
</style>