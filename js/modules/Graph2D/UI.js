function UI({ addFunction, delFunction, setColor, setWidth}) {
    let num = 0;
    document.getElementById('addFunction').addEventListener('click', addClickHandler);

    function addClickHandler() {
          
        const inputColor = document.createElement('input');
        inputColor.dataset.num = num;
        inputColor.setAttribute('type', 'color');
        inputColor.addEventListener('input', keyUpColorHandler);
    
        const inputWidth = document.createElement('input');
        inputWidth.dataset.num = num;
        inputWidth.addEventListener('input', keyUpWidthHandler);
    
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'функция номер' + num);
        input.dataset.num = num;
        input.addEventListener('keyup', keyUpHandler);
    
        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
          delFunction(input.dataset.num - 0);
          funcInputs.removeChild(input);
          funcInputs.removeChild(inputColor);
          funcInputs.removeChild(inputWidth);
          funcInputs.removeChild(button);
        })
    
        var funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(inputColor);
        funcInputs.appendChild(inputWidth);
        funcInputs.appendChild(button);
        num++;
    }

    function keyUpHandler() {
        try {
          let f;
          eval(`f = function(x){return ${this.value};}`);
          addFunction(f, this.dataset.num - 0);
        } catch (e) {
          console.log("Ошибка ввода", e);
        }
      }

    function keyUpColorHandler() {
        setColor(this.value, this.dataset.num - 0)
      }
    
    function keyUpWidthHandler(){
      setWidth(this.value, this.dataset.num - 0)
    }
}