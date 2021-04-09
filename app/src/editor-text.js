module.exports = class EditorText {
    constructor(element, virtualElement) {
        this.element = element;
        this.virtualElement = virtualElement;

        //console.log(element);
        //console.log(virtualElement);

        this.element.onclick = () => this.onClick();
        
        if (this.element.parentNode.nodeName === "A" ||
            this.element.parentNode.nodeName === "BUTTON") {
            this.element.addEventListener("contextmenu", (e) => this.onCtxMenu(e));
        }

        this.element.onblur = () => this.onBlur();
        this.element.addEventListener("keypress", (e) => this.onKeypress(e));

        this.element.oninput = () => this.onTextChange();

        //this.element.oninput = this.onTextChange;
    }

    onKeypress(e) {
        if (e.keyCode === 13) {
            this.element.blur();
        }
    }

    onCtxMenu(e) {
        e.preventDefault();
        this.onClick();
    }

    onBlur() {
        this.element.removeAttribute("contenteditable");
    }

    onClick() {
        this.element.contentEditable = "true";
        this.element.focus();
    }

    onTextChange() {
        this.virtualElement.innerHTML = this.element.innerHTML;
    }
}