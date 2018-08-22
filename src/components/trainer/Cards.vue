<template>
    <div class="cards">
        <transition name="fade" mode="out-in">
            <p :key="phrase.id" class="cards__phrase mg0">
                <Speaker :active="speakerActive" @click="playSound(phrase.audio)" class="cards__speaker"></Speaker>
                <span v-if="showed">{{ phrase.text }}</span>
                <span v-else-if="translated">{{ phrase.ru }}</span>
                <span v-else>{{ phrase.text | blur }}</span>
            </p>
        </transition>
        <div class="cards__btns">
            <div class="cards__left-btns">
                <el-button type="danger" @click="next(false)" title="Я не знаю эту фразу и хочу перейти к следующей">I don't know. Next</el-button>
                <div>
                    <el-button type="text" @click="toogleShowingPhrase()" :class="{'bold': showed}">Show</el-button>
                    <el-button type="text" @click="toggleTranslatingPhrase()" :class="{'bold': translated}">Translate</el-button>
                </div>
            </div>
            <el-button type="success" @click="next(true)" :disabled="iKnowDisabled" title="Я знаю эту фразу и хочу перейти к следующей">I know. Next</el-button>
        </div>
    </div>
</template>

<script>

  import Speaker from "@/components/Speaker";

  export default {
    name: "Cards",
    components: {Speaker},
    data() {
      return {
        speakerActive: false,
        showed: false,
        translated: false,
        iKnowDisabled: false
      }
    },
    filters: {
      blur(value) {
        return value.split('').map(function(item) { return item === ' ' ? ' ' : '⚹'; }).join('');
      }
    },
    methods: {
      next: function (status) {
        status ?
          this.$store.commit('incrementLearned', this.phrase) :
          this.$store.commit('incrementFailed', this.phrase);
        if (this.$store.state.trainer.phraseQueue.length) {
          this.$store.commit('getPhrase');
          this.activateNewPhrase();
          this.playSound(this.phrase.audio);
        } else {
          console.log('you win');
        }
      },
      playSound: function (file) {
        if(file) {
          let sound = `/audio/${file}`;
          var audio = new Audio(sound);
          audio.playbackRate = 1; //0.75;
          audio.addEventListener('ended', () => this.speakerActive = false);
          audio.play();
          this.speakerActive = true;
        }
      },
      showPhrase() {
        this.showed = true;
        this.translated = false;
      },
      hidePhrase() {
        this.showed = false;
        this.translated = false;
      },
      showTranslatePhrase() {
        this.translated = true;
        this.showed = false;
      },
      hideTranslatePhrase() {
        this.translated = false;
        this.showed = false;
      },
      toogleShowingPhrase() {
        this.iKnowDisabled = true;
        this.showed ? this.hidePhrase() : this.showPhrase();
      },
      toggleTranslatingPhrase() {
        this.iKnowDisabled = true;
        this.translated ? this.hideTranslatePhrase() : this.showTranslatePhrase();
      },
      activateNewPhrase() {
        this.iKnowDisabled = false;
        this.translated = false;
        this.showed = false;
      },
    },
    computed: {
      phrase() {
        return this.$store.state.trainer.phrase;
      }
    },
    mounted() {
      this.playSound(this.phrase.audio);
    }
  }
</script>

<style lang="scss" scoped>
    .cards {

        &__speaker {
            margin-right: 2vw;
            width: 7vw;
            height: 7vw;
            min-width: 40px;
            min-height: 40px;
            max-width: 80px;
            max-height: 80px;
        }

        &__phrase {
            font-size: 5vw;
            white-space: pre-wrap;
            display: flex;
            align-items: center;
        }

        &__btns {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 10px auto;
            width: 320px;
        }

        &__left-btns {
            display: flex;
            flex-direction: column;
        }
    }
</style>