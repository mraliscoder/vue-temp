module.exports = class EditorText {
    constructor(element, virtualElement) {
        this.element = element;
        this.virtualElement = virtualElement;

        //console.log(element);
        //console.log(virtualElement);

        this.element.onclick = () => this.onClick();
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