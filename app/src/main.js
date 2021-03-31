const Vue = require("vue/dist/vue");
const axios = require("axios");

new Vue({
    el: "#app",
    data: {
        pageList: [],
        newPageName: ''
    },
    methods: {
        createPage() {
            axios
                .post("./api/createNewHtmlFile.php", { name: this.newPageName })
                .then(() => this.updatePageList())
        },
        deletePage(page) {
            axios
                .post("./api/deleteHtmlFile.php", { name: page })
                .then(() => this.updatePageList())
        },
        updatePageList() {
            axios
                .get("./api/api.php")
                .then((response) => {
                    this.pageList = response.data
                });
        }
    },
    created() {
        this.updatePageList()
    },
});