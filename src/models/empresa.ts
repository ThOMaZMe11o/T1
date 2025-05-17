import Cliente from "./cliente";
import Produto from "./produto";
import Servico from "./servico";

export default class Empresa {
    private clientes: Cliente[] = [];
    private produtos: Produto[] = [];
    private servicos: Servico[] = [];

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public getProdutos(): Produto[] {
        return this.produtos;
    }

    public getServicos(): Servico[] {
        return this.servicos;
    }
}
