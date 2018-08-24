var App = new Vue({
    el: '#app',
    data: {
        title: '',
        describe: '',
        photos: [],
        options: []
    },
    computed: {
        printTitle() {
            return this.title;
        },
        printDescribe() {
            return this.describe;
        }
    },
    methods: {

    }
});