<template>
    <div class="study">
        <div class="study__top-panel">
            <el-card class="box-card study__list">
                <b>List info</b><br>
                Name: {{ listName }}<br>
                Number: {{ listLength }}
            </el-card>
            <el-card class="box-card study__progress">
                <b>Your today's progress:</b>
                <el-progress :percentage="successPercentage" status="success"></el-progress>
                <el-progress :percentage="failedPercentage" status="exception"></el-progress>
            </el-card>
        </div>

            <template v-if="successPercentage < 100">
                <transition name="fade" mode="out-in">
                    <p :key="phrase.id" class="study__phrase mg0">
                        <Speaker :active="speakerActive" @click="playSound(phrase.audio)" class="study__speaker"></Speaker>
                        <span v-if="showed">{{ phrase.text }}</span>
                        <span v-else-if="translated">{{ phrase.ru }}</span>
                        <span v-else>{{ phrase.text | blur }}</span>
                    </p>
                </transition>
                <div class="study__btns">
                    <div class="study__left-btns">
                        <el-button type="danger" @click="next(false)" title="Я не знаю эту фразу и хочу перейти к следующей">I don't know. Next</el-button>
                        <div>
                            <el-button type="text" @click="toogleShowingPhrase()" :class="{'bold': showed}">Show</el-button>
                            <el-button type="text" @click="toggleTranslatingPhrase()" :class="{'bold': translated}">Translate</el-button>
                        </div>
                    </div>
                    <el-button type="success" @click="next(true)" :disabled="iKnowDisabled" title="Я знаю эту фразу и хочу перейти к следующей">I know. Next</el-button>
                </div>
            </template>
            <template v-else>
                <transition name="fade" mode="out-in">
                <h2>You win!</h2>
                </transition>
            </template>

    </div>
</template>

<script>

  import phrases from '@/vocab/popular-eng-phrases.js'
  import Speaker from "@/components/Speaker";

  export default {
    name: "Study",
    components: {Speaker},
    data() {
      return {
        phrases: phrases,
        phrase: {},
        listName: '',
        listLength: 0,
        showed: false,
        translated: false,
        speakerActive: false,
        iKnowDisabled: false
      }
    },
    methods: {
      next: function (status) {
        status ?
          this.$store.commit('incrementLearned', this.phrase) :
          this.$store.commit('incrementFailed', this.phrase);
        //this.phrases.length <= (this.phraseNum + 1) ? this.phraseNum = 0 : this.phraseNum++;
        if (this.$store.state.phraseQueue.length) {
          this.phrase = this.$store.getters.getPhrase();
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
        //this.phraseNum > this.phrases
        this.iKnowDisabled = false;
        this.translated = false;
        this.showed = false;
      }
    },
    filters: {
      blur(value) {
        return value.split('').map(function(item) { return item === ' ' ? ' ' : '⚹'; }).join('');
      }
    },
    beforeMount() {
      this.$store.commit('initQueue', this.phrases.list);
      this.listName = this.phrases.name;
      this.listLength = this.phrases.list.length;
      this.phrase = this.$store.getters.getPhrase();
      console.log('beforeMount');
    },
    mounted() {
      this.playSound(this.phrase.audio);
      console.log('mounted');
    },
    computed: {
      successPercentage() {
        return this.$store.state.learned.length / (phrases.list.length * 0.01);
      },
      failedPercentage() {
        return this.$store.state.failed.length / (phrases.list.length * 0.01);
      }
    }
  }
</script>

<style lang="scss" scoped>
    .study {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;

        &__top-panel {
            //width: 20%;
            display: flex;
            margin-bottom: 10px;
            line-height: 1.5em;
        }

        &__list {
            margin-right: 10px;
            text-align: left;
        }

        &__progress {

        }

        &__speaker {
            margin-right: 20px;
        }

        &__phrase {
            font-size: 5vw;
            white-space: pre-wrap;
        }

        &__btns {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin: 10px;
            width: 320px;
        }

        &__left-btns {
            display: flex;
            flex-direction: column;
        }

    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-to {
        transition: all 0.5s;
        opacity: 1;
    }

</style>