<template>
<div id="app">
  <div class="header">
    <div class="title">
      <h1><router-link to="/">Frosted-eBay</router-link></h1>
    </div>
    <div class="upload">
      <h2><router-link to="/upload">Upload</router-link></h2>
    </div>
    <div class="upload">
      <h2><router-link to="/edit">Edit</router-link></h2>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Georgia', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: white;
  text-decoration: underline overline dotted black;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #da2222;
  color: #dbdbdb;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}


.upload h2{
  font-size: 20px;
  text-align: right;
  margin-left: 30px;
  margin-top: 30px;
  color: #dbdbdb;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
