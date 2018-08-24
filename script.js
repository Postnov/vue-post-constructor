// Prevent default drop document
;['drop', 'dragenter', 'dragleave', 'dragover'].forEach(function(eventName) {

	document.addEventListener(eventName, function(e) {
		e.preventDefault();
		e.stopPropagation();
	}, false);

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

    updated() {
        slider.resetWidth();
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
                    if (index < 10 && queue.length < 10) {
                        this.photos.push(e.target.result);
                    } else {
                        reader.abort();
                        return;
                    }
                }

                reader.readAsDataURL(file);
            });

            if (files.length > 10 && this.photos.length === 0) {
                alert('Можно загрузить только 10 файлов.\nСейчас вы загружаете - ' + files.length + '.\nБудут загружены первые 10 файлов.');
            } else if (this.photos.length === 10) {
                alert('Можно загрузить только 10 файлов.\nСейчас в дропзоне уже 10 файлов');
            } else if (files.length + this.photos.length > 10) {
                alert('Можно загрузить только 10 файлов. Сейчас в дропзоне уже ' + this.photos.length + '.\nСейчас вы загружаете - ' + files.length + '.\nБудут загружены ' + (10 - this.photos.length) + ' файлов.');
            }

        },
        deleteImage(index) {
            console.log(index);
            this.photos = this.photos.filter((item, i) => {
                return index !== i;
            });
        }

    }
});


var slider = new DPSlider('.preview-slider', {
    nav: true,
    dots: false,
    sliderPerView: 1
})