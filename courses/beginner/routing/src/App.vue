<template>
  <div id="app">
    <div id="nav">
      <!-- links to a particular route by looking up the path from router/index.js -->
      <router-link to="/">Home</router-link> |
      <!-- linking by name -->
      <router-link :to="{ name: 'About' }">About</router-link> |
      <!-- dynamic routing -->
      <router-link :to="{ name: 'User', params: { username: 'Vincent' } }"
        >Dynamic Routing</router-link
      >
    </div>
    <!-- Vue's placeholder which renders the matched component -->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
