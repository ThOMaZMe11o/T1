import Cliente from "../models/cliente";
import Produto from "../models/produto";
import Servico from "../models/servico";

export default class Consumo {
    private cliente: Cliente;
    private produto?: Produto;
    private servico?: Servico;
    private data: Date;
    private quantidade: number;

    constructor(cliente: Cliente, data: Date, quantidade: number = 1) {
        this.cliente = cliente;
        this.data = data;
        this.quantidade = quantidade;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getProduto(): Produto | undefined {
        return this.produto;
    }

    public getServico(): Servico | undefined {
        return this.servico;
    }

    public getData(): Date {
        return this.data;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public setProduto(produto: Produto): void {
        this.produto = produto;
        this.servico = undefined; 
    }

    public setServico(servico: Servico): void {
        this.servico = servico;
        this.produto = undefined;
    }

    public getTipo(): string {
        return this.produto ? 'Produto' : 'Serviço';
    }

    public getNomeItem(): string {
        return this.produto ? this.produto.getNome() : this.servico!.getNome();
    }

    public getValorTotal(): number {
        const valorUnitario = this.produto ? this.produto.getPreco() : this.servico!.getPreco();
        return valorUnitario * this.quantidade;
    }
}
