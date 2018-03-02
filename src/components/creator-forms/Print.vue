<template>
    <div class="container step">
      <div id="print-head" class="d-flex align-center mt-0">
        <img id="icon" src="../../assets/print/file.svg">
        <h5 class="text-center">Выберите шаблон для вашего резюме</h5>
        <h6 class="text-center mb-5">Количество шаблонов будет увеличиваться каждый месяц</h6>
      </div>
      <div id="template-wrapper" class="container-fluid pr-0">
          <div class="row">
              <div v-for="(templ, key, index) in templates" :key="key" :class="['col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 text-center px-md-0 px-sm-0 px-0 mb-xl-2 mb-lg-4 mb-md-4 mb-sm-2 mb-2', index < quantity-1 || index % 4 !== 0 ? 'pr-xl-1 pr-lg-4 pr-md-2 pr-sm-2 pr-2' : 'pr-xl-0 pr-md-0 pr-sm-0']">
                <div @click="PrintText(index)" class="template list-item p-4">
                  <div :class="templ.noColor ? 'types noColor' : 'types'">
                    <simple-svg v-if="!templ.noColor" v-for="(color, skey) in templ.colors" :key="skey" :stroke="'none'" :fill="color" :filepath="require('@/assets/print/circle_color.svg')"  :width="'15px'" :height="'15px'"/>
                    <simple-svg v-if="templ.noColor" :stroke="'none'" :filepath="require('@/assets/print/text_circle.svg')"  :width="'25px'" :height="'25px'"/>
                  </div>
                  <span class="font" :style="'font:'+templ.font">Aa</span>
                </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
    import pdfMake from 'pdfmake/build/pdfmake.js'
    import pdfFonts from 'pdfmake/build/vfs_fonts.js'
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    export default {
      data: function () {
        return {
          quantity: 0,
          chosenTemplate: '',
          printUrl: '',
          workTypeValue: '',
          workStatusValue: '',
          salaryTypeValue: '',
          workTermValue: '',
          sexValue: ''
        }
      },
      methods: {
        PrintText: function (index) {
          let mainDivider = () => {
            return {
              image: 'line',
              width: 1070,
              height: 1
            }
          }
          let textPDFStyles = {
            header: {
              fontSize: 28,
              bold: true
            },
            header2: {
              fontSize: 18,
              bold: true
            },
            sub_header: {
              fontSize: 12,
              bold: true,
              characterSpacing: 1.8
            },
            min_head: {
              fontSize: 10,
              italics: true,
              color: '#4a4a4a',
              margin: [0, 0, 0, 7]
            },
            value: {
              fontSize: 11,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 7]
            },
            value_1: {
              fontSize: 12,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 7]
            },
            paragraph: {
              fontSize: 11,
              color: '#4a4a4a',
              lineHeight: 1.5
            },
            sub_paragraph: {
              lineHeight: 1.1,
              color: '#4a4a4a',
              fontSize: 10
            }
          }
          let headInfo = {
            alignment: 'justify',
            columns: [
              {
                width: '85%',
                stack: [
                  {text: this.infoBlocks.basic.fio, style: 'header', margin: [0, 0, 0, 7]},
                  {text: this.infoBlocks.basic.goal.toUpperCase(), style: 'sub_header', margin: [0, 0, 0, 40]},
                  {
                    columns: [
                      {
                        width: '22%',
                        stack: [
                          {text: 'Тип занятости', style: 'min_head'},
                          {text: this.workTypeValue, style: 'value'}
                        ]
                      },
                      {
                        width: '30%',
                        stack: [
                          {text: 'Сфера деятельности', style: 'min_head'},
                          {text: this.infoBlocks.preferences.area, style: 'value'}
                        ]
                      },
                      [
                        {text: 'Текущий статус', style: 'min_head'},
                        {text: this.workStatusValue, style: 'value'}
                      ],
                      [
                        {text: 'Пол', style: 'min_head'},
                        {text: this.sexValue, style: 'value'}
                      ]
                    ],
                    columnGap: 20,
                    margin: [0, 0, 0, 20]
                  },
                  {
                    text: this.infoBlocks.additional.aboutMe.val,
                    style: 'paragraph'
                  }
                ]
              },
              {
                width: '20%',
                stack: [
                  {text: this.infoBlocks.basic.home_address.street + ', ' + this.infoBlocks.basic.home_address.index + ', ' + this.infoBlocks.basic.home_address.city + ', ' + this.infoBlocks.basic.home_address.state + ', ' + this.infoBlocks.basic.home_address.country, style: 'value', margin: [0, 0, 0, 30]},
                  {text: 'Контактный телефон', style: 'min_head'},
                  {text: this.infoBlocks.basic.phone1.code + this.infoBlocks.basic.phone1.number, style: 'value', margin: [0, 0, 0, 15]},
                  {text: !this.infoBlocks.basic.phone2.not_required ? 'Доп. телефон' : '', style: 'min_head'},
                  {text: !this.infoBlocks.basic.phone2.not_required ? this.infoBlocks.basic.phone2.value.code + this.infoBlocks.basic.phone2.value.number : '', style: 'value', margin: [0, 0, 0, 15]},
                  {text: 'Портфолио', style: 'min_head'},
                  {text: this.infoBlocks.basic.portfolio_link, style: 'value'}
                ]
              }
            ],
            columnGap: 25,
            margin: [0, 0, 0, 20]
          }
          // Описание блока Смен
          let q = 1
          const weekDay = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
          let shifts = []
          shifts[0] = {
            width: '21%',
            stack: [
              {
                text: [
                  {text: this.infoBlocks.preferences.hours, style: 'value'},
                  {text: ' ч ' + this.workTermValue, style: 'min_head'}
                ],
                margin: [0, 0, 0, 5]
              },
              {
                text: [
                  {text: 'от ', style: 'min_head'},
                  {text: this.infoBlocks.preferences.salary, style: 'value'},
                  {text: ' / ' + this.salaryTypeValue, style: 'min_head'}
                ]
              }
            ]
          }
          for (let key in this.infoBlocks.basic.shifts) {
            let range = '-'
            if (this.infoBlocks.basic.shifts[key].day || this.infoBlocks.basic.shifts[key].evening || this.infoBlocks.basic.shifts[key].night) {
              range = this.infoBlocks.basic.shifts[key].day ? '8 - ' : this.infoBlocks.basic.shifts[key].evening ? '17 - ' : '23 - '
              range += this.infoBlocks.basic.shifts[key].night ? '8:00' : this.infoBlocks.basic.shifts[key].evening ? '22:00' : '16:00'
            }
            shifts[q] = {
              width: '12%',
              alignment: 'center',
              stack: [
                {text: weekDay[q - 1], style: 'min_head'},
                {text: range, style: 'value', alignment: 'center'}
              ]
            }
            q++
          }
          // Описание блока Навыки
          let enterCount = 1
          let row = 0
          let skills = []
          let columns = []
          for (let key in this.infoBlocks.skills.proffesional) {
            columns[enterCount - 1] = {
              width: 110.07,
              alignment: 'center',
              stack: [
                {text: this.infoBlocks.skills.proffesional[key].level + '.0', style: 'value'},
                {text: this.infoBlocks.skills.proffesional[key].value, style: 'min_head', alignment: 'left'}
              ]
            }
            if (enterCount % 4 === 0) {
              columns = []
              enterCount = 0
              skills[row]['margin'] = [0, 0, 0, 10]
              row++
            }
            skills[row] = {
              columns,
              columnGap: 25,
              margin: [0, 0, 0, 20]
            }
            enterCount++
          }
          // Описание блока Рекомендации
          enterCount = 1
          row = 0
          let refs = []
          columns = []
          if (this.infoBlocks.additional.references.reference0.fullName) {
            for (let key in this.infoBlocks.additional.references) {
              columns[enterCount - 1] = {
                width: 110.07,
                stack: [
                  {text: this.infoBlocks.additional.references[key].canCall ? 'Можно связаться' : 'Недоступен', style: 'min_head', margin: [0, 0, 0, 15]},
                  {text: this.infoBlocks.additional.references[key].fullName, style: 'value'},
                  {text: this.infoBlocks.additional.references[key].email ? this.infoBlocks.additional.references[key].email : '', style: 'min_head'},
                  {text: this.infoBlocks.additional.references[key].phone.number ? this.infoBlocks.additional.references[key].phone.code + this.infoBlocks.additional.references[key].phone.number : '', style: 'min_head'}
                ]
              }
              if (enterCount % 4 === 0) {
                columns = []
                enterCount = 0
                refs[row]['margin'] = [0, 0, 0, 10]
                row++
              }
              refs[row] = {
                columns,
                columnGap: 25,
                margin: [0, 0, 0, 20]
              }
              enterCount++
            }
          }
          // Описание блока Образование
          enterCount = 1
          row = 0
          let schools = []
          let period
          columns = []
          for (let key in this.infoBlocks.education.schools) {
            period = this.infoBlocks.education.schools[key].beginYear
            period += this.infoBlocks.education.schools[key].inProgress ? '-Сейчас' : ('-' + this.infoBlocks.education.schools[key].endYear.val)
            columns[enterCount - 1] = {
              width: 154.93823999999998,
              stack: [
                {text: this.infoBlocks.education.schools[key].name, style: 'value_1', margin: [0, 0, 0, 10]},
                {
                  image: 'line',
                  width: 300,
                  height: 1,
                  margin: [0, 0, 0, 10]
                },
                {
                  columns: [
                    {
                      width: '55%',
                      stack: [
                        {text: 'Года обучения', style: 'min_head'},
                        {text: period, style: 'value'}
                      ]
                    },
                    [
                      {text: 'Степень', style: 'min_head'},
                      {text: this.infoBlocks.education.schools[key].degreeType, style: 'value'}
                    ]
                  ],
                  margin: [0, 0, 0, 10]
                },
                {text: 'Специальность', style: 'min_head'},
                {text: this.infoBlocks.education.schools[key].major, style: 'value'}
              ]
            }
            if (enterCount % 3 === 0) {
              columns = []
              enterCount = 0
              schools[row]['margin'] = [0, 0, 0, 10]
              schools[row]['pageBreak'] = 'after'
              row++
            }
            schools[row] = {
              columns,
              columnGap: 25,
              margin: [0, 0, 0, 20]
            }
            enterCount++
          }
          // Описание блока Опыт Работы
          enterCount = 1
          row = 0
          let works = []
          period = ''
          let jobType
          columns = []
          for (let key in this.infoBlocks.experience.works) {
            period = this.infoBlocks.experience.works[key].begin
            period += this.infoBlocks.experience.works[key].inProgress ? '-Сейчас' : ('-' + this.infoBlocks.experience.works[key].end.val)
            switch (this.infoBlocks.experience.works[key].workType) {
              case 0: jobType = 'Полная'
                break
              case 1: jobType = 'Частичная'
                break
              case 2: jobType = 'Интернатура'
                break
              case 3: jobType = 'Удаленная работа'
                break
              default: jobType = 'Не указан'
            }
            columns[enterCount - 1] = {
              width: 245.14,
              stack: [
                {text: this.infoBlocks.experience.works[key].company, style: 'min_head', margin: [0, 0, 0, 5]},
                {text: this.infoBlocks.experience.works[key].title, style: 'value_1', margin: [0, 0, 0, 10]},
                {
                  image: 'line',
                  width: 245.14,
                  height: 1,
                  margin: [0, 0, 0, 10]
                },
                {text: 'Адрес', style: 'min_head'},
                {text: this.infoBlocks.experience.works[key].address, style: 'value_1', margin: [0, 0, 0, 15]},
                {
                  columns: [
                    {
                      width: '55%',
                      stack: [
                        {text: 'Период работы', style: 'min_head'},
                        {text: period, style: 'value'}
                      ]
                    },
                    [
                      {text: 'Занятость', style: 'min_head'},
                      {text: jobType, style: 'value'}
                    ]
                  ],
                  margin: [0, 0, 0, 10]
                },
                {text: 'Описание', style: 'min_head'},
                {
                  text: this.infoBlocks.experience.works[key].duties,
                  style: 'sub_paragraph',
                  margin: [0, 0, 0, 15]
                },
                {text: 'Професиональные достижения', style: 'min_head'},
                {
                  text: this.infoBlocks.experience.works[key].achievements.val ? this.infoBlocks.experience.works[key].achievements.val : 'Не указаны',
                  style: 'sub_paragraph'
                }
              ]
            }
            if (enterCount % 2 === 0) {
              columns = []
              enterCount = 0
              works[row]['margin'] = [0, 0, 0, 10]
              if (Object.keys(this.infoBlocks.experience.works).length > 2) { works[row]['pageBreak'] = 'after' }
              row++
            }
            works[row] = {
              columns,
              columnGap: 25,
              margin: [0, 0, 0, 20]
            }
            enterCount++
          }
          // Описание блока Достижения
          enterCount = 0
          let achievements = []
          for (let key in this.infoBlocks.skills.achievements) {
            achievements[enterCount] = {
              text: this.infoBlocks.skills.achievements[key],
              style: 'sub_paragraph',
              margin: [0, 0, 0, 10]
            }
            enterCount++
          }
          // Описание блока Сертификаты и Лицензии
          enterCount = 0
          let certificates = []
          for (let key in this.infoBlocks.additional.docs) {
            certificates[enterCount] = [
              {text: 'Присутсвует сертификат/лицензия', style: 'min_head', margin: [0, 0, 0, 5]},
              {
                text: this.infoBlocks.additional.docs[key].name,
                style: 'sub_paragraph',
                margin: [0, 0, 0, 15]
              }
            ]
            enterCount++
          }
          let docDef = {
            content: [
              headInfo,
              mainDivider(),
              {
                columns: shifts,
                margin: [0, 20]
              },
              mainDivider(),
              {
                text: 'Перечень навыков и умений',
                style: 'header2',
                margin: [0, 20, 0, 20]
              },
              skills,
              mainDivider(),
              {
                text: !this.infoBlocks.additional.references.reference0.not_required ? 'Рекомендации' : '',
                style: 'header2',
                margin: !this.infoBlocks.additional.references.reference0.not_required ? [0, 20, 0, 20] : [0, 0, 0, 0]
              },
              refs,
              {
                text: 'Образование',
                style: 'header2',
                margin: [0, 20, 0, 20],
                pageBreak: this.infoBlocks.additional.references.reference0.fullName ? 'before' : ''
              },
              schools,
              mainDivider(),
              {text: 'Опыт работы', style: 'header2', margin: [0, 20, 0, 20]},
              works,
              mainDivider(),
              {text: 'Прочие достижения', style: 'header2', margin: [0, 20, 0, 20]},
              achievements,
              mainDivider(),
              {text: this.infoBlocks.additional.docs.doc0 ? 'Сертификаты и лицензии' : '', style: 'header2', margin: [0, 20, 0, 20]},
              certificates
            ],
            styles: textPDFStyles,
            images: {
              line: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAASAgMAAAA21M+qAAAACVBMVEUAAADR09P///+gCxOmAAAAAnRSTlMAgJsrThgAAAABYktHRAJmC3xkAAAAJUlEQVQYGe3BIQEAAAgDsJtHpH8VKmBw2wIAwI8OV+lwFQAAXiy5TcaZ/3lpqgAAAABJRU5ErkJggg=='
            }
          }
          pdfMake.createPdf(docDef).print()
        }
      },
      computed: {
        templates: function () {
          this.quantity = Object.keys(this.$store.state.builder.print_templates).length
          return this.$store.state.builder.print_templates
        },
        infoBlocks: function () {
          let p = this.$store.state.resume

          let workType = p.basic.work_type
          if (workType[0]) { this.workTypeValue = 'Полная' }
          if (workType[1]) { this.workTypeValue = 'Частичная' }
          if (workType[2]) { this.workTypeValue = 'Интернатура' }
          if (workType[3]) { this.workTypeValue = 'Удаленная работа' }
          let workStatus = p.preferences.work_status
          if (workStatus[0]) { this.workStatusValue = 'Трудоустроен, в поиске доп. заработка' }
          if (workStatus[1]) { this.workStatusValue = 'В поиске основного рабочего места' }
          if (workStatus[2]) { this.workStatusValue = 'Учащийся' }
          let slaryType = p.preferences.salary_type
          if (slaryType[0]) { this.salaryTypeValue = 'в час' }
          if (slaryType[1]) { this.salaryTypeValue = 'за проект' }
          let workTerm = p.preferences.work_term
          if (workTerm[0]) { this.workTermValue = 'в неделю' }
          if (workTerm[1]) { this.workTermValue = 'в месяц' }
          if (workTerm[2]) { this.workTermValue = 'за квартал' }
          let sexVal = p.basic.sex
          if (sexVal.men || sexVal.woman) {
            this.sexValue = sexVal.men ? 'Мужчина' : 'Женщина'
          } else {
            this.sexValue = 'Не указан'
          }
          return p
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
    #print-head{
        flex-direction: column;
    }
    .template{
        height: 150px;
        position: relative;
        flex-direction: column;
        background: white;
        font-size: 48pt;
        transition: 0.2s;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
    }
    .types{
        position: absolute;
        display: flex;
        top: -40px;
        left: 60%;
        height: 15px;
        .simple-svg-wrapper{
            height: 15px;
            top:0px;
            margin-right: 3px;
        }
    }
    .noColor{
        top: -35px;
        left: 80%
    }
    .template:hover{
        transform: scale(1.1);
        z-index: 1;
        box-shadow: 0px 7px 10px 0px rgba(0, 0, 0, 0.05);
    }
</style>