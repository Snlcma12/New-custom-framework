class Calc extends Component {

    operandHandler(event) {
        const calc = new Calculator();
        const a = calc.getValue(document.getElementById('a').value);
        const b = calc.getValue(document.getElementById('b').value);
        const operand = event.target.dataset.operand;
        const result = calc[operand](a, b);
        document.getElementById('c').value = result !== null ? result.toString() : '';
    }

    addEventListeners() {
        const buttons = document.querySelectorAll('.operand');
        buttons.forEach(button =>
            button.addEventListener('click', (event) => this.operandHandler(event)));
    }
}