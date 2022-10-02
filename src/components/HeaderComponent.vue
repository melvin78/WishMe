<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img alt="Avatar"
             class="object-cover w-16 h-16 border-2 border-green-600 rounded-full"
             src="/src/assets/cake.png"/>
        <span class="ml-3 text-xl">Wish Me</span>
      </a>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        <router-link class="mr-5 hover:text-gray-900 cursor-pointer" to="/">Home</router-link>
        <router-link class="mr-5 hover:text-gray-900 cursor-pointer" to="/about">About</router-link>
        <!--        <a @click="$router.push('/currently-showing')" class="mr-5 hover:text-gray-900 cursor-pointer">Currently Showing</a>-->

      </nav>

    </div>
  </header>

</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>

</style>