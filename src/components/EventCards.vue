<template>
  <div>
    <ul class="cards">
      <li v-for="(val,i) in GetEvents" class="card">
                    <span
                        class="bg-blue-400 text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl">EVENTS</span>
        <!--        <span-->
        <!--            class="bg-blue-400 text-white px-3 py-1 tracking-widest text-xs absolute left-0 top-0 rounded-bl" id="next-card">NEXT CARD</span>-->
        <h1>{{ i }}</h1>

        <p style="max-height: 200px; overflow: auto; scrollbar-width:thin;">{{ val.event_description }}
        </p>
      </li>

    </ul>
  </div>
</template>

<script>
import {useBirthdayInfoStore} from "@/stores/birthday-info.store";

export default {
  name: "EventCards",
  setup() {
    const birthdayInfoStore = useBirthdayInfoStore()


    return {birthdayInfoStore}
  },
  data() {
    return {
      current: '',
      cards: null,
      next: null
    }
  },


  computed: {
    GetEvents: function () {
      return this.birthdayInfoStore.getBirthdayInfo.events
    },

  },

  mounted() {

    $('.cards').each(function () {

      var $this = $(this),
          $cards = $this.find('.card'),
          $current = $cards.filter('.card--current'),
          $next;

      console.log($this)
      console.log($cards)
      console.log($current)

      $cards.on('click', function () {
        console.log(this)
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

  }
}
</script>

<style scoped>
.cards {
  position: relative;
  list-style-type: none;
  padding: 0;
  max-width: 34em;
  margin: 20% auto 0;
}

.card {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 300px;
  scrollbar-width: thin;
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 0 40px rgba(168, 154, 37, 0.14);
  transform: translateY(0) rotate(4deg) translateX(25px) scale(1);
  transform-origin: 0 0;

  transition: transform 0.6s cubic-bezier(.8, .2, .1, 0.8) 0.1s,
  background 0.4s linear;

  cursor: pointer;
  user-select: none;

:last-child {
  margin-bottom: 0;
}

}

.card--next {
  z-index: 5;
  transform: translateY(-25px) rotate(4deg) translateX(25px) scale(1);
}

.card--out {
  animation: card-out 0.6s cubic-bezier(.8, .2, .1, 0.8);
  transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95);
  z-index: 1;
  background: #bbb;
}

@keyframes card-out {
  0% {
    z-index: 20;
    transform: translateY(0px) rotate(-4deg);
  }
  50% {
    transform: translateY(-120%) rotate(-5deg) translateX(-40px);
  }
  80% {
    z-index: 1;
  }
  100% {
    transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95);
  }
}

.card--current {
  cursor: auto;
  user-select: auto;
  position: relative;
  z-index: 10;
  opacity: 1;
  background: #ffe789;
  transform: rotate(-1deg) translateX(0%) scale(1);
}
</style>