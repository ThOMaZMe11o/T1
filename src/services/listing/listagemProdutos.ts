import Produto from "../../models/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Produto[];

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
    }

    public listar(): void {
        console.log(`\nLista de Produtos:\n`);

        if (this.produtos.length === 0) {
            console.log("Nenhum produto cadastrado.");
            return;
        }

        this.produtos.forEach((produto, index) => {
            console.log(`Produto ${index + 1}:`);
            console.log(`  Nome: ${produto.getNome()}`);
            console.log(`  Preço: R$ ${produto.getPreco().toFixed(2)}`);
            console.log(`-----------------------------`);
        });
    }
}
