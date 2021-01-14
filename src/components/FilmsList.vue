<template>
  <div class="films">
    <ul class="films__list">
      <li class="films__item film">
        <h2 class="film__title">TITLE</h2>
      </li>
    </ul>
  </div>
</template>

/**

 Films
[
  {
   Film-name:String
   Dates:{
           19.01.21:[
             {
               Time:12.00,
               Rows:[ //ryady
                [   //mesta
                  {
                    status:String,
                    price:NUM
                  }
                  {
                    status:String,
                    price:NUM
                  }
                ],
                [ {} , {}...]
                [ {} , {}...]
               ]
             },{Time...},{}
           ]
           21.01.21:{}
           23.01.21:{}
    }

  }
]
*/
<script>
export default {
  name: 'FilmsList',
  data() {
    return {
      test1: { one: 1 },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
