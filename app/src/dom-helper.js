module.exports = class DOMHelper {
    static parseStringToDom(string) {
        const parser = new DOMParser();
        return parser.parseFromString(string, "text/html");
    }

    static serializeDomToString(dom) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(dom);
    }

    static unwrapTextNodes(dom) {
        dom.body.querySelectorAll("editor-element").forEach((element) => {
            element.parentNode.replaceChild(element.firstChild, element);
        })
    }

    static wrapTextNodes(dom) {
        const body = dom.body;
        let textNodes = [];

        function recursy(element) {
            element.childNodes.forEach((node) => {
                if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                    textNodes.push(node);
                } else {
                    recursy(node);
                }
            });
        }
        recursy(body);

        textNodes.forEach((node, i) => {
            const wrapper = dom.createElement("editor-element");

            node.parentNode.replaceChild(wrapper, node);
            wrapper.appendChild(node);
            wrapper.contentEditable = "true";
            wrapper.setAttribute("nodeid", i);
        });

        return dom;
    }
}