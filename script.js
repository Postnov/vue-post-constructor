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
        imagesLimit: 10,
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
                    if (index < this.imagesLimit && this.photos.length < this.imagesLimit) {
                        this.photos.push(e.target.result);
                    } else {
                        reader.abort();
                        return;
                    }
                }

                reader.readAsDataURL(file);
            });

            if (files.length > this.imagesLimit && this.photos.length === 0) {
                alert(`You can load only ${this.imagesLimit} files. Right now you load ${files.length}.\nWill be loaded first ${this.imagesLimit} files`);
            } else if (this.photos.length === this.imagesLimit) {
                alert(`You can load only ${this.imagesLimit} files.\nIn dropzone already ${this.imagesLimit} files`);
            } else if (files.length + this.photos.length > this.imagesLimit) {
                alert(`You can load only ${this.imagesLimit} files. In dropzone already ${this.photos.length} files.\nRight now you load ${files.length} files. Will be loaded first ${this.imagesLimit - this.photos.length} files.`);
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