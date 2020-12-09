<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  // 引入整个库
import * as R from 'ramda'
  // 引入部分函数
  // import identity from 'ramda/examples/identity'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // this.add()
    // this.addIndex()
    this.adjust()
  },
  methods: {
    // 两数相加
    add() {
      console.log(R.add(2, 3));
      console.log(R.add(2)(3));
    },
    //
    addIndex() {
      const mapIndexed = R.addIndex(R.map)
      console.log(mapIndexed((val, idx) => idx + '-' + val, ['z', 'm', 'h', 'e', 'a', 'n', 'g']));
    },
    // adjust():
    adjust() {
      console.log(R.adjust(0, R.toUpper, ['z', 'm', 'h', 'e', 'a', 'n', 'g']));
    }





  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
