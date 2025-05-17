export default class Servico {
    private nome: string;
    private preco: number;
    private quantidadeConsumida: number;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this.preco = preco;
        this.quantidadeConsumida = 0;
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
}
