const axios = require('axios');
const DOMHelper = require("./dom-helper");

require("./iframe-load");

module.exports = class Editor {
    constructor() {
        this.iframe = document.querySelector("iframe");
    }

    open(page) {
        this.currentPage = page;

        axios.get("../" + page)
            .then((res) => DOMHelper.parseStringToDom(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                this.virtualDom = dom;
                return dom; 
            })
            .then(DOMHelper.serializeDomToString)
            .then((html) => axios.post('./api/saveTempPage.php', { html }))
            .then(() => this.iframe.load("../temp.html", () => { this.enableEditing() }))
    }

    enableEditing() {
        console.log(this.iframe.contentDocument.body);

        this.iframe.contentDocument.body.querySelectorAll("editor-element").forEach((element) => { 
            element.contentEditable = "true";

            element.oninput = () => {
                this.onTextChange(element);
            }
        });
    }

    onTextChange(element) {
        const id = element.getAttribute("nodeid");
        this.virtualDom.body.querySelector(`[nodeid="${id}"]`).innerHTML = element.innerHTML;
    }

    save() {
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);

        const html = DOMHelper.serializeDomToString(newDom);
        axios.post('./api/savePage.php', { pageName: this.currentPage, html: html });
    }
}