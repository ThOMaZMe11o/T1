export default class Servico {
    private nome: string;
    private preco: number;
    private quantidadeConsumida: number;
    private racasCompativeis: Array<string>;

    constructor(nome: string, preco: number, racasCompativeis: Array<string> = []) {
        this.nome = nome;
        this.preco = preco;
        this.quantidadeConsumida = 0;
        this.racasCompativeis = racasCompativeis;
    }

    public getNome(): string {
        return this.nome;
    }

    public getPreco(): number {
        return this.preco;
    }

    public getQuantidadeConsumida(): number {
        return this.quantidadeConsumida;
    }

    public incrementarConsumo(quantidade: number = 1): void {
        this.quantidadeConsumida += quantidade;
    }

    public getRacasCompativeis(): Array<string> {
        return this.racasCompativeis;
    }

    public adicionarRacaCompativel(raca: string): void {
        this.racasCompativeis.push(raca);
    }
}
