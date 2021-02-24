<template>
  <h1 class="font-semibold text-2xl">{{ msg }}</h1>
  <button @click="count++" class="bg-gray-300 rounded-md">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
