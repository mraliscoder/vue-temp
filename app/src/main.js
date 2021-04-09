const Editor = require('./editor');
const Vue = require("vue/dist/vue");
const UIKit = require("uikit");

window.editor = new Editor();

window.onload = () => {
}

new Vue({
    el: "#app",
    data: {
        showLoader: true
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
            () => {
                this.showLoader = false;
                UIKit.notification({message: "Сохранено", status: "success", pos: "bottom-left"});
            },
            () => {
                this.showLoader = false;
                UIKit.notification({message: "Ошибка сохранения", status: "danger", pos: "bottom-left"});
            });
        }
    },
    created() {
        window.editor.open("index.html", () => {
            this.showLoader = false;
        });
    }
});