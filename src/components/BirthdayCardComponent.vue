<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5  mx-auto flex flex-wrap flex-col">
      <div class="flex justify-center">
        <div class="flex w-full  justify-center items-end mb-5">
          <div class="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
            <label for="hero-field" class="leading-7 text-sm text-gray-600">First Name</label>
            <input type="text" id="hero-field" name="hero-field"
                   class="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            <label for="hero-field" class="leading-7 text-sm text-gray-600">Date of Birth</label>
            <Datepicker :enableTimePicker = "false" v-model="date"></Datepicker>
          </div>
          <button
              @click="SetBirthdayDate"
              class="inline-flex text-white bg-amber-600 border-0 py-2 px-6 focus:outline-none hover:bg-amber-500 rounded text-lg">
            Wish Me
          </button>
        </div>
      </div>

      <div class="flex flex-col text-center w-full">
<!--        <h1 class="text-xl font-medium title-font mb-4 text-gray-900 text-3xl">Happy Birthday User</h1>-->
        <p class="lg:w-2/3 mx-auto leading-relaxed font-light text-2xl">CONGRATUALTIONS!!..<span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Melvin
        </span><span>
        </span> on making <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">23 </span> trips around the sun. You have been breathing for the last
          <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">8,395 </span> days,
          <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">201,480</span> hours,
          <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">12,088,800</span> minutes
          and
          <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">725,328,000</span> seconds
          and counting <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{{ countDown }}</span>.
        </p>
        <br/>
        <span class="mt-2">
          Check below to see events,deaths and births of prominent people that occured on the day you were born.
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

export default {
  name: "BirthdayCardComponent",
  components: {DeathsCard, BirthCards, EventCards, Datepicker },
  setup() {
    const birthdayInfoStore = useBirthdayInfoStore()
    return { birthdayInfoStore }
  },
  data() {
    return {
      date: null,
      countDown: 10,
      currentTab:'Events-Tab'
    };
  },
  methods:{
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown += 1
          this.countDownTimer()
        }, 1000)
      }
    },

    async SetBirthdayDate(){

      await this.birthdayInfoStore.setBirthdayInfo({date: this.date.getDate(),month:this.date.toLocaleString('default', { month: 'long' })}).then(()=>{

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


    },



    SwitchTabs(ev){

      this.currentTab = ev.target.getAttribute('id')

    }
  },


  created() {
    this.countDownTimer()
  }
}
</script>


<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

