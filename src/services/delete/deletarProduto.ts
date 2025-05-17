import Produto from "../../models/produto";
import Consumo from "../../models/consumo";
import Entrada from "../../client/entrada";
import Delete from "./deletar";

export default class DeleteProduto extends Delete {
    private produtos: Array<Produto>;
    private consumos: Array<Consumo>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, consumos: Array<Consumo>) {
        super();
        this.produtos = produtos;
        this.consumos = consumos;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Exclusão de Produto`);
        console.log(`-------------------------------------------------`);

        if (this.produtos.length === 0) {
            console.log(`\nNão há produtos cadastrados para excluir.`);
            return;
        }

        // Listar os produtos disponíveis
        console.log(`\nProdutos disponíveis para exclusão:`);
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.getNome()} - R$ ${produto.getPreco().toFixed(2)}`);
        });

        // Selecionar o produto a ser excluído
        const produtoIndex = this.entrada.receberNumero(`\nSelecione o produto pelo número: `) - 1;
        
        if (produtoIndex < 0 || produtoIndex >= this.produtos.length) {
            console.log(`\n❌ Índice de produto inválido!`);
            return;
        }

        const produtoSelecionado = this.produtos[produtoIndex];

        // Verificar se o produto está associado a algum consumo
        const consumosAssociados = this.consumos.filter(consumo => {
            const produtoConsumido = consumo.getProduto();
            return produtoConsumido && produtoConsumido === produtoSelecionado;
        });

        // Primeira confirmação - Mostrar informações do produto
        console.log(`\n⚠️ Você está prestes a excluir o seguinte produto:`);
        console.log(`Nome: ${produtoSelecionado.getNome()}`);
        console.log(`Preço: R$ ${produtoSelecionado.getPreco().toFixed(2)}`);
        
        // Mostrar raças compatíveis
        const racasCompativeis = produtoSelecionado.getRacasCompativeis();
        if (racasCompativeis.length === 0) {
            console.log(`Raças compatíveis: Todas as raças`);
        } else {
            console.log(`Raças compatíveis: ${racasCompativeis.join(', ')}`);
        }
        
        // Mostrar quantidade consumida
        console.log(`Quantidade consumida: ${produtoSelecionado.getQuantidadeConsumida()}`);
        
        // Alertar sobre consumos associados
        if (consumosAssociados.length > 0) {
            console.log(`\n⚠️ ATENÇÃO: Este produto está associado a ${consumosAssociados.length} consumo(s).`);
            console.log(`Todos esses consumos serão excluídos junto com o produto.`);
        }

        // Primeira confirmação
        const primeiraConfirmacao = this.entrada.receberTexto(`\nDeseja realmente excluir este produto? (S/N): `);
        
        if (primeiraConfirmacao.trim().toUpperCase() !== 'S') {
            console.log(`\n✅ Operação de exclusão cancelada.`);
            return;
        }

        // Segunda confirmação
        const segundaConfirmacao = this.entrada.receberTexto(`\n⚠️ ATENÇÃO: Esta ação não pode ser desfeita. Confirma a exclusão? (S/N): `);
        
        if (segundaConfirmacao.trim().toUpperCase() !== 'S') {
            console.log(`\n✅ Operação de exclusão cancelada.`);
            return;
        }

        // Remover consumos associados ao produto
        if (consumosAssociados.length > 0) {
            consumosAssociados.forEach(consumo => {
                const index = this.consumos.indexOf(consumo);
                if (index !== -1) {
                    this.consumos.splice(index, 1);
                }
            });
            console.log(`\n${consumosAssociados.length} consumo(s) associado(s) foram excluídos.`);
        }

        // Remover o produto
        this.produtos.splice(produtoIndex, 1);

        console.log(`\n✅ Produto excluído com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
