<template>
    <svg class="speaker" @click="click()" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 75 75">
        <g id="g1">
            <polygon id="polygon1" points="39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769" style="stroke:#666666;stroke-width:5;stroke-linejoin:round;fill:#666666;"/>
            <g :class="{'speaker--active': active}">
                <path id="path1" d="M 48.128,49.03 C 50.057,45.934 51.19,42.291 51.19,38.377 C 51.19,34.399 50.026,30.703 48.043,27.577" style="fill:none;stroke:#666666;stroke-width:5;stroke-linecap:round"/>
                <path id="path2" d="M 55.082,20.537 C 58.777,25.523 60.966,31.694 60.966,38.377 C 60.966,44.998 58.815,51.115 55.178,56.076" style="fill:none;stroke:#666666;stroke-width:5;stroke-linecap:round"/>
                <path id="path1" d="M 61.71,62.611 C 66.977,55.945 70.128,47.531 70.128,38.378 C 70.128,29.161 66.936,20.696 61.609,14.01" style="fill:none;stroke:#666666;stroke-width:5;stroke-linecap:round"/>
            </g>
        </g>
    </svg>
</template>

<script>
  export default {
    name: "Speaker",
    props: {
      width: {
        type: Number,
        default: 40
      },
      height: {
        type: Number,
        default: 40
      },
      active: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      click() {
        this.$emit('click');
      }
    }
  }
</script>

<style lang="scss" scoped>

    .speaker {
        cursor: pointer;

        &--active {
            animation-duration: 0.5s;
            animation-name: playing;
            animation-iteration-count: infinite;
        }

    }

    @keyframes playing {

        0% {
            opacity: 0;
        }

        50% {
            opacity: 0.5;
        }

        100% {
            opacity: 0;
        }
    }

</style>