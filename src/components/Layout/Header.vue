<template>
    <header class="header has-background-white has-text-black">
        <b-navbar
                class="container is-white"
                :fixed-top="true"
        >
            <template slot="brand">
                <b-navbar-item tag="router-link"
                               :to="{ path: '/' }">
                    <img :src="doubaoImg" alt="logo">
                    <div style="font-weight: bold">Liquid's blog</div>
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-navbar-item tag="div">
                    <audio :src="mp3Url" id="mus" @ended="ending"></audio>
                    <i class="el-icon-headset" @click="playMus" v-show="playing===0"></i>
                    <i class="el-icon-coffee-cup" @click="pauseMus" v-show="playing===1"></i>
                    <b-switch
                            v-model="darkMode"
                            passive-type="is-warning"
                            type="is-dark"
                    >
<!--                        {{ darkMode ? "夜" : "日" }}-->
                    </b-switch>
                </b-navbar-item>
            </template>
        </b-navbar>
    </header>
</template>

<script>
    import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader'
    import { getDarkMode, setDarkMode } from '@/utils/auth'
    import { mapGetters } from 'vuex'
    import {createVisitor} from "../../api/visitor";


    export default {
        name: 'Header',
        data() {
            return {
                logoUrl: require('@/assets/1.jpg'),
                doubaoImg: require('@/assets/1.jpg'),
                searchKey: '',
                darkMode: false,
                mp3Url: require('@/assets/1.mp3'),
                playing:0
            }
        },
        watch: {
            // 监听Theme模式
            darkMode(val) {
                if (val) {
                    enableDarkMode({})
                } else {
                    disableDarkMode()
                }
                setDarkMode(this.darkMode)
            }
        },
        created() {
            // 获取cookie中的夜间还是白天模式
            this.darkMode = getDarkMode()
            if (this.darkMode) {
                enableDarkMode({})
            } else {
                disableDarkMode()
            }
            createVisitor();
        },
        methods: {
            playMus(){
                let mus=document.getElementById('mus');
                mus.currentTime=0;
                this.playing=1;
                mus.play();
            },
            pauseMus(){
                let mus=document.getElementById('mus');
                this.playing=0;
                mus.pause();
            },
            ending(){
                this.playing=0;
            }
        }
    }
</script>

<style scoped>
    input {
        width: 80%;
        height: 86%;
    }
</style>
