class App extends Component {
    constructor(props) {
        super(props);
        this.header = new Header({
            id: "header", 
            parent: this.id, 
            template: template.headerTemplate, 
            callbacks: { showPage: (name) => this.showPage(name) }
        });

        this.graph2D = new Graph2D({
            id: "2D", 
            parent: this.id, 
            template: template.graph2DTemplate, 
        })

        this.calc = new Calc({
            id: "Calc", 
            parent: this.id, 
            template: template.calcTemplate, 
        })

        this.sobaka = new Sobaka({
            id: "sobaka", 
            parent: this.id, 
            template: template.sobakaTemplate, 
        })
        
        this.graph3D = new Graph3D({
            id: "graph3D", 
            parent: this.id, 
            template: template.graph3DTemplate, 
        })
        
        this.showPage('graph3D');
    }

    showPage(name) {
        this.calc.hide();
        this.graph2D.hide();
        this.sobaka.hide();
        this.graph3D.hide();

        if (this[name]?.show) {
            this[name].show();
        }
    }

    graph2D() { }

    calc() { }
}
