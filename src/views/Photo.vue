<template>
<div>
<div class="display">
  <image-gallery :currentPhoto="currentPhoto"></image-gallery>
  <div v-bind:placeholder="update"></div>
</div>
<h2>Comments</h2><hr>
<div v-for="comment in comments" v-bind:key="comment._id">
    <div class="comment">
      <div class="other">
        <p>{{comment.comment}}</p>
        <div class="smaller">
        <p><i>{{comment.user.name}}<br>
        {{formatDate(comment.created)}}</i></p><hr>
      </div>
      </div>
    </div>
  </div>
  <form v-if="user" @submit.prevent="addComment" v-bind:placeholder="update">
    <textarea v-model="addedComment"></textarea>
    <br />
    <button type="submit">Submit</button>
  </form>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageGallery from '@/components/ImageGallery.vue'
import moment from 'moment';
export default {
  name: 'photo',
  components: {
    ImageGallery
  },
  data() {
    return {
      thePhoto: null,
      addedComment: '',
      localComments: null,
    }
  },
  computed: {
    currentPhoto() {
      this.thePhoto = this.$store.state.photo;
      return this.thePhoto;
    },
    user() {
      return this.$store.state.user;
    },
    comments() {
      //console.log(this.$store.state.comments);
      //return this.$store.state.comments;
      return this.localComments;
    },
    async update() {
      await this.$store.dispatch("getComments", this.thePhoto);
      this.localComments = this.$store.state.comments;
    },
  },
  watch: {
    '$store.state.comments.length'() {
      this.localComments = this.$store.state.comments;
      //console.log(this.localComments[0].user);
    }
  },
  methods: {
    async addComment() {
      this.$store.dispatch("addComment", {
        comment: this.addedComment,
        photo: this.thePhoto,
      });
      this.addedComment = '';
      await this.$store.dispatch("getComments", this.thePhoto);
      //this.localComments = this.$store.state.comments;
      //console.log(this.localComments);
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style>
.smaller {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}
</style>
