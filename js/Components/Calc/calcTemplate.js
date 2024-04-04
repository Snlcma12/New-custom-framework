Template.prototype.calcTemplate = () => `
<div id="left">
<center>
    <label id="labelName"> &nbsp Universal Calculator</label><br><br><br><br>
    <div id="rectangle"><br><br><br>
        <div id="texts">
            <textarea spellcheck="false" tabindex="-1" id="a" placeholder="a"></textarea><br><br>
            <div>
                <textarea spellcheck="false" id="b" placeholder="b"></textarea><br><br>
            </div>
            <textarea spellcheck="false" type="text" disabled id="c" placeholder="Ответ"></textarea><br><br>
        </div>
        <div id="buttons">
            <br><br>
            <button class="operand" data-operand="add" id="buttonPlus">+</button>&nbsp &nbsp &nbsp
            <button class="operand" data-operand="sub" id="buttonMinus">-</button>&nbsp &nbsp &nbsp
            <button class="operand" data-operand="mult" id="buttonMult">*</button>
            <br><br>
            <div><br><br>
                <button class="operand" data-operand="div" id="buttonDiv">/</button>&nbsp &nbsp &nbsp
                <button class="operand" data-operand="pow" id="buttonPow">^</button>&nbsp &nbsp &nbsp
                <button class="operand" data-operand="prod" id="buttonPow">X</button><br><br><br>
            </div>
        </div><br><br><br>
    </div>
</center>
</div>
<div id="right">
<center>
    <label id="labelName">Polynom Calculator &nbsp</label><br><br><br><br>
    <div id="rectangle"><br><br><br>
        <div id="texts">
            <textarea spellcheck="false" tabindex="-1" id="poly"
                placeholder="poly1&#13;+&#13;poly2&#13;=&#13;result" cols="40" rows="5"></textarea><br><br>
            <div>
                <textarea spellcheck="false" id="point" placeholder="Точка" cols="20"
                    rows="5"></textarea><br><br>
            </div>
        </div>
        <div id="buttons">
            <br><br>
            <button id="polyOperand">Посчитать</button> <br><br>
            <button id="polyValue">Значение в точке</button><br><br>
        </div><br><br>
    </div><br>
</div>
</center>
</div>
`;
