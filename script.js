var App = new Vue({
    el: '#app',
    data: {
        title: '',
        describe: '',
        surveyTitle: '',
        photos: [],
        options: [],
        surveyIsVisible: false
    },
    computed: {
        printTitle() {
            return this.title;
        },
        printDescribe() {
            return this.describe;
        },
        printSurveyTitle() {
            return this.surveyTitle;
        }
    },
    methods: {

    }
});