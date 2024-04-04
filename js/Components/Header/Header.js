class Header extends Component {
    addEventListeners() {
        document.getElementById("show2D").addEventListener("click", () => this.callbacks.showPage("graph2D"));
        document.getElementById("showCalc").addEventListener("click", () => this.callbacks.showPage("calc"));
        document.getElementById("showSobaka").addEventListener("click", () => this.callbacks.showPage("sobaka"));
        document.getElementById("show3D").addEventListener("click", () => this.callbacks.showPage("graph3D"));
    }
}
