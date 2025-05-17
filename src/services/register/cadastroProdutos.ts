import Entrada from "../../client/entrada";
import Produto from "../../models/produto";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Produto[];
    private entrada: Entrada;

    constructor(produtos: Produto[]) {
        super();
        this.produtos = produtos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nCadastro de produto:`);

        const nome = this.entrada.receberTexto(`Informe o nome do produto: `);
        const preco = this.entrada.receberNumero(`Informe o preço do produto: `);

        const produto = new Produto(nome, preco);
        this.produtos.push(produto);

        console.log(`✅ Produto cadastrado com sucesso!\n`);
    }
}
