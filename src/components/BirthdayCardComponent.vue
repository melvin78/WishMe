<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5  mx-auto flex flex-wrap flex-col">
      <div class="flex flex-col text-center w-full mb-10">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome :)</h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Just need your first name and date of birth then click on wish me.</p>
      </div>
      <div class="flex justify-center">
        <div class="flex w-full  justify-center items-end mb-5">
          <div class="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label for="hero-field" class="leading-7 text-sm text-gray-600">First Name</label>
            <input type="text" id="hero-field" name="hero-field"
                   v-model="BirthdayName"
                   class="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <span class="text-sm text-red-600" v-if="emptyBirthdayName"> Enter at least one name</span><br>
            <label for="hero-field" class="leading-7 text-sm text-gray-600">Date of Birth</label>
            <Datepicker autoApply teleportCenter  placeholder="Select Date Of Birth"  :enableTimePicker="false" v-model="date"></Datepicker>
            <span class="text-sm text-red-600" v-if="emptyBirthdayDate">Pick Date of Birth </span><br>
            <span class="text-sm text-red-600" v-if="emptyYear">Pick a year before {{new Date().toLocaleString('default',{year:'numeric'})}}</span><br>
            <button
                @click="SetBirthdayDate"
                class="inline-flex text-white bg-amber-600 border-0 py-2 px-6 focus:outline-none hover:bg-amber-500 rounded text-lg">
              Wish Me
            </button>
          </div>

        </div>
      </div>
      <template v-if="ShowInfos">
        <div class="flex flex-col text-center w-full">
          <p class="lg:w-2/3 mx-auto leading-relaxed font-light text-2xl">CONGRATULATIONS <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
         {{ BirthdayName }}
        </span><span>
        </span> on making <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{
              Number(trips).toLocaleString()
            }}</span>
            trips around the sun. You have been breathing for an estimate
            <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{
                Number(days).toLocaleString()
              }} </span>
            days , that is equivalent to
            <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{
                Number(hours).toLocaleString()
              }}</span>
            hours,
            <span
                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{
                Number(minutes).toLocaleString()
              }}</span>
            minutes
            or
            <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{
                Number(seconds).toLocaleString()
              }}</span>
            seconds.

          </p>
          <br/>
          <span class="mt-2">
          Check below to see events,births and deaths of prominent figures that occurred on your birthday.
        </span>
        </div>
        <div @click="SwitchTabs($event)" class="flex mx-auto flex-wrap mb-5">

          <a id="Events-Tab"
             :class="[currentTab === 'Events-Tab'? 'sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium' +
            'inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t cursor-pointer'
            :'sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font cursor-pointer font-medium inline-flex items-center leading-none  tracking-wider rounded-t']">
            <img src="/src/assets/event.png" class="w-5 h-5 mr-3" alt=""/>
            Events
          </a>
          <a id="Births-Tab"
             :class="[currentTab === 'Births-Tab'? 'sm:px-6 py-3 w-1/2 sm:w-auto justify-center cursor-pointer sm:justify-start border-b-2 title-font font-medium' +
            'inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t'
            :'sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 cursor-pointer title-font font-medium inline-flex items-center leading-none  tracking-wider rounded-t']">
            <img src="/src/assets/baby.png" class="w-5 h-5 mr-3" alt=""/>Births
          </a>
          <a id="Deaths-Tab"
             :class="[currentTab === 'Deaths-Tab'? 'sm:px-6 py-3 w-1/2 sm:w-auto cursor-pointer justify-center sm:justify-start border-b-2 title-font font-medium' +
            'inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t'
            :'sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start cursor-pointer border-b-2 title-font font-medium inline-flex items-center leading-none  tracking-wider rounded-t']
        ">
            <img src="/src/assets/tombstone.png" class="w-5 h-5 mr-3" alt=""/>Deaths
          </a>
        </div>
        <div class="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded">

          <Transition name="slide-fade">
            <EventCards v-if="currentTab==='Events-Tab'"/>
          </Transition>
          <Transition name="slide-fade">
            <BirthCards v-if="currentTab==='Births-Tab'"/>
          </Transition>
          <Transition name="slide-fade">
            <DeathsCard v-if="currentTab==='Deaths-Tab'"/>
          </Transition>
        </div>
      </template>

    </div>
  </section>

</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import EventCards from "./EventCards.vue"
import BirthCards from "./BirthCards.vue";
import DeathsCard from "./DeathsCard.vue";
import {useBirthdayInfoStore} from "@/stores/birthday-info.store"
import {useBreathingDaysStore} from "@/stores/breathing-days.store";



export default {
  name: "BirthdayCardComponent",
  components: {DeathsCard, BirthCards, EventCards, Datepicker},
  setup() {
    const birthdayInfoStore = useBirthdayInfoStore()
    const breathingDaysStore = useBreathingDaysStore()

    return {birthdayInfoStore, breathingDaysStore}
  },
  data() {
    return {
      date: null,
      countDown: 0,
      currentTab: 'Events-Tab',
      trips: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      BirthdayName: "",
      ShowInfos: false,
      emptyBirthdayName: false,
      emptyBirthdayDate: false,
      countDownInitialized:false,
      emptyYear:false
    };
  },

  watch:{
    BirthdayName: function () {
      this.emptyBirthdayName = false
    },

    date: function () {
      this.emptyBirthdayDate = false
      this.emptyYear = false
    }
  },

  computed: {
    GetEvents: function () {
      return this.birthdayInfoStore.getBirthdayInfo.events
    },

    getDeaths: function () {
      return this.birthdayInfoStore.getBirthdayInfo.celeb.filter(x=>x.type === "death")

    },

    getBirths: function () {
      return this.birthdayInfoStore.getBirthdayInfo.celeb.filter(x=>x.type === "birth")

    }

  },

  methods: {


    secondCountDownTimer() {

      setTimeout(() => {
        this.seconds += 1
        this.secondCountDownTimer()
      }, 1000)

    },

    minuteCountDownTimer() {

      setTimeout(() => {
        this.minutes += 1
        this.minuteCountDownTimer()
      }, 60000)

    },

    hourCountDownTimer() {

      setTimeout(() => {
        this.minutes += 1
        this.hourCountDownTimer()
      }, 3600000)

    },

    validateDate(){
      const currDateMonth = new Date().getMonth() + 1
      const currDateDate = new Date().getDate()
      return !(currDateDate >= this.date.getDate() && currDateMonth >= this.date.getMonth() + 1);
    },


    async SetBirthdayDate() {


      if (this.BirthdayName === ""){
        this.emptyBirthdayName = true
        this.ShowInfos = false
      }
      else if (!this.date){
        this.emptyBirthdayDate = true
        this.ShowInfos = false

      }
      else if(this.date && this.date.toLocaleString('default', {year: 'numeric'})>= new Date().toLocaleString('default',{year:'numeric'})){
        this.emptyYear = true
        this.ShowInfos = false
      }
      else{

        this.trips = this.validateDate()?
            Number(new Date().toLocaleDateString('default', {year: 'numeric'})) - Number(this.date.toLocaleString('default', {year: 'numeric',})) -1:
            Number(new Date().toLocaleDateString('default', {year: 'numeric'})) - Number(this.date.toLocaleString('default', {year: 'numeric',}))
        this.days = this.trips * 365
        this.hours = this.days * 24
        this.minutes = this.hours * 60
        this.seconds = this.minutes * 60
        this.countDown = this.seconds

        if(!this.countDownInitialized){
          this.secondCountDownTimer()
          this.minuteCountDownTimer()
          this.hourCountDownTimer()
        }


        this.breathingDaysStore.setBreathingDays({
          name: this.BirthdayName,
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          trips: this.trips
        })

        await this.birthdayInfoStore.setBirthdayInfo(
            {
              date: this.date.getDate(),
              month: this.date.toLocaleString('default', {month: 'long'})
            }
        ).then(() => {

          $('.cards').each(function () {

            var $this = $(this),
                $cards = $this.find('.card'),
                $current = $cards.filter('.card--current'),
                $next;


            $cards.on('click', function () {
              if (!$current.is(this)) {
                $cards.removeClass('card--current card--out card--next');
                $current.addClass('card--out');
                $current = $(this).addClass('card--current');
                $next = $current.next();
                $next = $next.length ? $next : $cards.first();
                $next.addClass('card--next');
              }
            });

            if (!$current.length) {
              $current = $cards.last();
              $cards.first().trigger('click');
            }

            $this.addClass('cards--active');

          })
        })
        this.ShowInfos = true
        this.countDownInitialized = true

      }



    },


    SwitchTabs(ev) {
      this.currentTab = ev.target.getAttribute('id')
    }
  },



}
</script>


<style scoped>

</style>

