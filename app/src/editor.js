const axios = require('axios');
const DOMHelper = require("./dom-helper");
const EditorText = require("./editor-text");

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
            .then(() => this.iframe.load("../temp.html", () => { 
                this.enableEditing();
                this.injectStyles();
            }));
    }

    enableEditing() {
        console.log(this.iframe.contentDocument.body);

        this.iframe.contentDocument.body.querySelectorAll("editor-element").forEach((element) => { 
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.body.querySelector(`[nodeid="${id}"]`);
            new EditorText(element, virtualElement);
        });
    }

    save() {
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);

        const html = DOMHelper.serializeDomToString(newDom);
        axios.post('./api/savePage.php', { pageName: this.currentPage, html: html });
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            editor-element:hover {
                outline: 1px solid grey;
                outline-offset: 8px;
            }
            editor-element:focus {
                outline: 1px solid blue;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }
}