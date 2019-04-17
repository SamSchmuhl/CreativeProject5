<template>
<div v-bind:placeholder="boolSet()">
  <div class="image" v-for="photo in photos" v-bind:key="photo._id" @click="displayPhoto(photo)">
    <img :src="photo.path" />
    <p class="photoTitle">{{photo.title}}</p>
    <p class="photoDate">
      <span v-if="photo.user.name">{{photo.user.name}} </span>
    </p>
    <p>{{photo.description}}</p>
  </div>
  <div v-if="photoBool">
    <div class="display" v-bind:key="currentPhoto._id">
      <img :src="currentPhoto.path" />
      <p class="photoTitle">{{currentPhoto.title}}</p>
      <p class="photoDate">
        <span v-if="currentPhoto.user.name">{{currentPhoto.user.name}}, </span>
        {{formatDate(currentPhoto.created)}}
      </p>
      <p>{{currentPhoto.description}}</p>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'ImageGallery',
  props: {
    photos: Array,
    currentPhoto: Object
  },
  data() {
    return {
      dataPhoto: this.currentPhoto,
      photoBool: false
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async displayPhoto(photo) {
      try {
        this.dataPhoto = photo;
        //console.log(this.dataPhoto.title);
        await this.$store.dispatch("getOnePhoto", this.dataPhoto);
        //this.updateCurrentPhoto();
        this.$router.push('photo');
      } catch (error) {
        console.log(error);
      }
    },
    updateCurrentPhoto() {
      //this.$emit('current-photo', this.dataPhoto);
    },
    boolSet() {
      if(this.currentPhoto === undefined || this.currentPhoto === null) {
        this.photoBool = false;
      }
      else {
        this.photoBool = true;
      }
    }
  }
}
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}
.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}
p {
  margin: 0px;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}
.image img {
  max-width: 600px;
  max-height: 600px;
  transition: transform .2s;
  image-orientation: from-image;
}
.image img:hover {
  transform: scale(1.05);
}
.display {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}
.display img {
  max-width: 500px;
  max-height: 500px;
  transition: transform .2s;
  image-orientation: from-image;
}
</style>
