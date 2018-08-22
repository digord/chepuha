<template>
    <div class="trainer">
        <transition name="fade" mode="out-in">
            <span v-if="isRunning" key="running">
                <div class="trainer__top-panel">
                    <ChosenList class="trainer__list"></ChosenList>
                    <CurrentStatus></CurrentStatus>
                </div>
                <transition name="fade" mode="out-in">
                    <Cards v-if="$store.getters.successPercentage() < 100" key="cards"></Cards>
                    <Finish v-else key="finish"></Finish>
                </transition>
            </span>
            <span v-else key="starting">
                <ChooseList :phraseLists="phraseLists" @set="setList"></ChooseList>
            </span>
        </transition>
    </div>
</template>

<script>

  import phraseLists from '@/vocab/popular-eng-phrases.js'
  import ChosenList from "@/components/trainer/ChosenList";
  import CurrentStatus from "@/components/trainer/CurrentStatus";
  import Cards from "@/components/trainer/Cards";
  import Finish from "@/components/trainer/Finish";
  import ChooseList from "@/components/trainer/ChooseList";

  export default {
    name: "Trainer",
    components: {ChooseList, Finish, Cards, CurrentStatus, ChosenList},
    data() {
      return {
        phraseLists: phraseLists,
        phrases: null,
        listName: '',
        listLength: 0,
      }
    },
    methods: {
      setList(n) {
        this.$store.commit('initQueue', this.phraseLists[n]);
        this.listName = this.phraseLists[n].name;
        this.listLength = this.phraseLists[n].list.length;
        this.$store.commit('getPhrase');
      }
    },
    computed: {
      isRunning() {
        return this.$store.state.trainer.length;
      }
    }
  }
</script>

<style lang="scss" scoped>
    .trainer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 10px;

        &__top-panel {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            line-height: 1.5em;
        }

        &__list {
            margin-right: 10px;
            text-align: left;
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