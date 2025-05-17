export default class Consumo {
    private cliente: any; // Substitua 'any' pelo tipo correto de Cliente
    private produto?: any; // Substitua 'any' pelo tipo correto de Produto
    private servico?: any; // Substitua 'any' pelo tipo correto de Servico
    private data: Date;
    private quantidade: number;

    constructor(cliente: any, data: Date, quantidade: number = 1) {
        this.cliente = cliente;
        this.data = data;
        this.quantidade = quantidade;
    }

    public getCliente(): any {
        return this.cliente;
    }

    public getProduto(): any | undefined {
        return this.produto;
    }

    public getServico(): any | undefined {
        return this.servico;
    }

    public getData(): Date {
        return this.data;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public setProduto(produto: any): void {
        this.produto = produto;
        this.servico = undefined; 
    }

    public setServico(servico: any): void {
        this.servico = servico;
        this.produto = undefined;
    }

    public getTipo(): string {
        return this.produto ? 'Produto' : 'Serviço';
    }

    public getNomeItem(): string {
        return this.produto ? this.produto.getNome() : this.servico.getNome();
    }

    public getValorTotal(): number {
        const valorUnitario = this.produto ? this.produto.getPreco() : this.servico.getPreco();
        return valorUnitario * this.quantidade;
    }
}
