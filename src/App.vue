<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
            |
            <router-link to="/study">Listening</router-link>
        </div>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<style lang="scss">
    #app {
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 10px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    #progress {
        margin-top: 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
