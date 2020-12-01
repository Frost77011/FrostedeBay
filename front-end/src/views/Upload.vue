<template>
<div class="admin">
<h1>Create a New Listing</h1>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Name of Item">
        <p></p>
        <p><input v-model="user" placeholder="User">       <input v-model="price" placeholder="$Price"></p>
        <p></p>
        <textarea v-model="description" placeholder="Add item description"></textarea>
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2 class="title">{{addItem.title}}</h2>
        <p>by {{addItem.user}} at {{addItem.price}}</p>
        <p>{{addItem.description}}</p>
        <img :src="addItem.path" />
      </div>
    </div>  
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      description: "",
      price: "",
      user: "",
      file: null,
      addItem: null,
      items: [],
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          user: this.user,
          price: this.price,
          description: this.description,
          path: r1.data.path
        });
        this.addItem = r2.data;
        let r3 = await axios.post('/api/users', {
          user: this.user,
        });
        this.addUser = r3.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
  color: black;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  color: black;
}

.title {
  color: black;
  text-align: left;
}

.add,
.edit {
  display: flex;
}


/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>