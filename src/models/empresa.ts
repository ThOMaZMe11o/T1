import Cliente from "./cliente";
import Produto from "./produto";
import Servico from "./servico";
import Consumos from "./consumo";

export default class Empresa {
    private clientes: Cliente[] = [];
    private produtos: Produto[] = [];
    private servicos: Servico[] = [];
    private consumos: Consumos[] = [];

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public getProdutos(): Produto[] {
        return this.produtos;
    }

    public getServicos(): Servico[] {
        return this.servicos;
    }

    public getConsumos(): Consumos[] {
        return this.consumos;
    }
}
