<template>
  <div>
    <ul class="cards">

      <li  class="card">
        <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
        <h1>Comment Card 1 </h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent bibendum, lorem vel tincidunt imperdiet,
          nibh elit laoreet felis, a bibendum nisl tortor non orci. Donec pretium fermentum felis, quis aliquet est
        .</p>
      </li>
      <li  class="card">
        <h1>Comment Card 2 </h1>

        <p>Vestibulum nunc massa, gravida quis porta nec, feugiat id metus. Nunc ac arcu dolor, quis vestibulum leo.
          Cras viverra mollis ipsum, non rhoncus lectus aliquam et. Morbi faucibus purus sit amet lacus aliquet
          elementum. .</p>
      </li>
      <li  class="card">
        <h1>Comment Card 3</h1>

        <p>Donec nunc ligula, vulputate quis mollis eu, interdum quis libero. Donec nulla ante, facilisis sit amet
          vulputate at, tincidunt a velit. Maecenas vestibulum, nulla sed tincidunt viverra, lorem turpis aliquam urna,
          ut pretium orci purus consequat augue. Etiam a enim orci, vitae pulvinar odio. In elit urna, tincidunt a
          pellentesque et, scelerisque at nibh.a.</p>

      </li>
      <li  class="card">
        <h1>Comment Card 4</h1>

        <p>Donec nunc ligula, vulputate quis mollis eu, interdum quis libero. Donec nulla ante, facilisis sit amet
          vulputate at, tincidunt a velit. Maecenas vestibulum, nulla sed tincidunt viverra, lorem turpis aliquam urna,
          ut pretium orci purus consequat augue. Etiam a enim orci, vitae pulvinar odio. In elit urna, tincidunt a
          pellentesque et, scelerisque at nibh. Sed nec est sapien..</p>

      </li>
    </ul>
  </div>

</template>

<script>

export default {


  data(){
    return{
      current:'',
      cards: null,
      next:null
    }
  },


  mounted() {
    $.fn.commentCards = function(){

      return this.each(function(){

        var $this = $(this),
            $cards = $this.find('.card'),
            $current = $cards.filter('.card--current'),
            $next;

        $cards.on('click',function(){
          if ( !$current.is(this) ) {
            $cards.removeClass('card--current card--out card--next');
            $current.addClass('card--out');
            $current = $(this).addClass('card--current');
            $next = $current.next();
            $next = $next.length ? $next : $cards.first();
            $next.addClass('card--next');
          }
        });

        if ( !$current.length ) {
          $current = $cards.last();
          $cards.first().trigger('click');
        }

        $this.addClass('cards--active');

      })

    };

    $('.cards').commentCards();

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


  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 0 40px #000;
  transform: translateY(0) rotate(4deg) translateX(25px) scale(1);
  transform-origin: 0 0;

  transition: transform 0.6s cubic-bezier(.8,.2,.1,0.8) 0.1s,
  background 0.4s linear;

  cursor: pointer;
  user-select: none;

:last-child { margin-bottom: 0; }
}

.card--next {
  z-index: 5;
  transform: translateY(-25px) rotate(4deg) translateX(25px) scale(1);
}

.card--out {
  animation: card-out 0.6s cubic-bezier(.8,.2,.1,0.8);
  transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95);
  z-index: 1;
  background: #bbb;
}

@keyframes card-out {
  0% { z-index: 20; transform: translateY(0px) rotate(-4deg); }
  50% { transform: translateY(-120%) rotate(-5deg) translateX(-40px); }
  80% { z-index: 1; }
  100% { transform: translateY(-50px) rotate(8deg) translateX(55px) scale(0.95); }
}

.card--current {
  cursor: auto;
  user-select: auto;
  position: relative;
  z-index: 10;
  opacity: 1;
  background: #a81a1a;
  transform: rotate(-1deg) translateX(0%) scale(1);
}
</style>