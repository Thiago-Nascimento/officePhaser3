
export default class DialogBox extends Phaser.Scene {
    larguraTela: number
    alturaTela: number

    larguraCaixa: number
    alturaCaixa: number

    posicaoHorizontal: number
    posicaoVertical: number

    paddingCaixa: number

    cena!: Phaser.Scene

    private caixa!: Phaser.GameObjects.Graphics
    private texto!: Phaser.GameObjects.Text
    private opcoesTexto: Phaser.GameObjects.Text[] = []

    private seletor!: Phaser.GameObjects.Arc
    private indiceSelecionado: number = 0
    
    open: boolean = false

    constructor(scene: Phaser.Scene, larguraTela: number, alturaTela: number) {
        super("DialogBox")

        this.larguraTela = larguraTela
        this.alturaTela = alturaTela

        this.larguraCaixa = this.larguraTela * 0.95
        this.alturaCaixa = this.alturaTela / 3

        this.posicaoHorizontal = (this.larguraTela - this.larguraCaixa) / 2
        this.posicaoVertical = (this.alturaCaixa * 2) - 20

        this.paddingCaixa = 20

        this.cena = scene

    }

    mostrarCaixa(data: any): void {
        this.caixa = this.cena.add.graphics({ x: this.posicaoHorizontal, y: this.posicaoVertical })
        
        //  Bubble color
        this.caixa.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        this.caixa.lineStyle(4, 0x565656, 1);

        //  Bubble shape and outline
        this.caixa.strokeRoundedRect(0, 0, this.larguraCaixa, this.alturaCaixa, 16);
        this.caixa.fillRoundedRect(0, 0, this.larguraCaixa, this.alturaCaixa, 16);

        this.mostrarTexto(data.msg)

        if (data.options.length > 0) {
            this.mostrarOpcoes(data.options)
        }

        this.open = true
    }

    mostrarTexto(texto: string): void {
        this.texto = this.cena.add.text(0, 0, texto, { fontFamily: 'Arial', fontSize: 20, color: '#000000', align: 'left', wordWrap: { width: this.larguraCaixa - (this.paddingCaixa * 2) } });

        this.texto.setPosition(this.caixa.x + this.paddingCaixa, this.caixa.y + this.paddingCaixa)
    }

    mostrarOpcoes(opcoes: string[]): void {
        let gap: number = 0
        
        let textStyle: Phaser.Types.GameObjects.Text.TextStyle = { 
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#000000',
            align: 'left',
            wordWrap: {
                width: this.larguraCaixa - (this.paddingCaixa * 2)
            } 
        }

        opcoes.forEach( (textoOpcao: string, index: number)  => {
            this.opcoesTexto.push(this.cena.add.text(this.texto.x + 30, this.texto.y + 40 + gap, textoOpcao, textStyle))

            gap += 25
        }) 
        
        this.seletor = this.cena.add.circle(this.opcoesTexto[0].x - 20, this.opcoesTexto[0].y + 10, 10, 0xff0000)

    }

    mudarOpcao(movimento: number): void {
        let numeroItens = this.opcoesTexto.length // -> 3        

        this.indiceSelecionado += movimento

        if (this.indiceSelecionado < 0) {
            this.indiceSelecionado = numeroItens - 1
        }

        if (this.indiceSelecionado > numeroItens - 1) {
            this.indiceSelecionado = 0
        }

        this.seletor.setY(this.opcoesTexto[this.indiceSelecionado].y + 10)

        // console.log(this.indiceSelecionado);
        
    }

    escolherOpcao(): void {
        console.log("Escolheuuuu:", this.opcoesTexto[this.indiceSelecionado].text);
        
    }

    esconderCaixa(): void {
        if (this.open) {
            this.caixa.destroy()
            this.texto.destroy()
            this.seletor.destroy()
    
            this.opcoesTexto.forEach( opcao => opcao.destroy() )
    
            this.open = false           
        }
    }

    atualizarTexto(texto: string): void {
        this.texto.destroy()

        this.texto = this.add.text(0, 0, texto, { fontFamily: 'Arial', fontSize: 20, color: '#000000', align: 'center', wordWrap: { width: this.larguraCaixa - (this.paddingCaixa * 2) } });
    }
    
    
}