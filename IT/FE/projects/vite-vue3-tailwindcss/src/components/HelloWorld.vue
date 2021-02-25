<template>
  <h1 class="font-semibold text-2xl">{{ msg }}</h1>
  <button @click="count++"
          class="bg-gray-300 rounded-md">
    count is: {{ count }}
  </button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <p>
    this is a html
    <span v-html="rowHtml"></span>
  </p>
  <p>{{bookMsg}}</p>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.init()
  },
  data() {
    return {
      count: 0,
      rowHtml: '<h1 class="font-semibold text-2xl">hahaha</h1>',
      books: [
        {
          name: 'aaa', price: 33
        },
        {
          name: 'bbb', price: 44
        }
      ]
    }
  },
  computed: {
    bookMsg() {
      return `we have ${this.books.length} 本 books`
    }
  },
  methods: {
    init() {
      const www = new Proxy(new URL('https://www'), {
        get: function get(target, prop) {
          let o = Reflect.get(target, prop);
          if (typeof o === 'function') {
            return o.bind(target)
          }
          if (typeof prop !== 'string') {
            return o;
          }
          if (prop === 'then') {
            return Promise.prototype.then.bind(fetch(target));
          }
          target = new URL(target);
          target.hostname += `.${prop}`;
          return new Proxy(target, { get });
        }
      });

      www.baidu.com.then(response => {
        console.log(response.status);
        // ==> 200
      })

      // const response = await www.baidu.com

      // console.log(response.ok)
      // ==> true

      // console.log(response.status);
      // ==> 200
    },
  }
}
</script>
