// Prevent default drop document
;['drop', 'dragenter', 'dragleave', 'dragover'].forEach(function(eventName) {

	document.addEventListener(eventName, function(e) {
		e.preventDefault();
		e.stopPropagation();
	}, false)

});



var App = new Vue({
    el: '#app',
    data: {
        title: '',
        describe: '',
        surveyTitle: '',
        photos: [],
        options: [],
        surveyIsVisible: false,
        dropzoneIsActive: false
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
        },
        dropzoneEnable() {
            this.dropzoneIsActive = true;
        },
        dropzoneDisable() {
            this.dropzoneIsActive = false;
        },
        dropZoneDrop() {
            var files = event.dataTransfer.files;
            files = [... files];

            files.forEach((file, index) => {
                
                var reader = new FileReader();

                reader.onload = (e) => {
                    this.photos.push(e.target.result);
                }

                reader.readAsDataURL(file);
            });
        },
        deleteImage(index) {
            console.log(index);
            this.photos = this.photos.filter((item, i) => {
                return index !== i;
            });
        }

    }
});