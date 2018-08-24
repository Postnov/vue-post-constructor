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
        addOption() {
            this.options.push('');
        },
        deleteOption(index) {
            this.options = this.options.filter((item, i) => {
                return index !== i;
            });
        },
        deleteSurvey() {
            this.surveyIsVisible = false;
            this.options = [];
            this.surveyTitle = '';
        }
    }
});