<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <img :src="item.path"/>
      <h2>{{item.title}} - {{item.price}}</h2>
      <p>by {{item.user}}</p>
      <p class="description">{{item.description}}</p>
      <p><button @click="buy">Buy</button></p>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: bold;
  padding-bottom: 0px;
  margin-bottom: 0px;
  text-align: center;
}

.image p {
  text-align: center;
}


/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
  padding-top: 10px;
}

.description{
  margin: 0px;
  padding: 0px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>