import Listagem from "./listagem";
import Produto from "../../models/produto";
import Servico from "../../models/servico";

export default class ListagemMaisConsumido extends Listagem {
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private limite: number;

    constructor(produtos: Array<Produto>, servicos: Array<Servico>, limite: number = 10) {
        super();
        this.produtos = produtos;
        this.servicos = servicos;
        this.limite = limite;
    }

    private calcularConsumoTotal(): Array<{ nome: string, tipo: string, quantidade: number }> {
        // Mapear produtos
        const produtosConsumidos = this.produtos.map(produto => {
            return {
                nome: produto.getNome(),
                tipo: "Produto",
                quantidade: produto.getQuantidadeConsumida()
            };
        });

        // Mapear serviços
        const servicosConsumidos = this.servicos.map(servico => {
            return {
                nome: servico.getNome(),
                tipo: "Serviço",
                quantidade: servico.getQuantidadeConsumida()
            };
        });

        // Combinar produtos e serviços
        const todosItens = [...produtosConsumidos, ...servicosConsumidos];

        // Ordenar por quantidade (decrescente)
        return todosItens.sort((a, b) => b.quantidade - a.quantidade);
    }

    public listar(): void {
        const itensConsumidos = this.calcularConsumoTotal();
        
        console.log(`\n-------------------------------------------------`);
        console.log(`Listagem dos Itens Mais Consumidos:`);
        console.log(`-------------------------------------------------`);

        // Limitar a quantidade de itens exibidos
        const itensLimitados = itensConsumidos.slice(0, this.limite);

        if (itensLimitados.length === 0) {
            console.log(`\nNenhum item foi consumido até o momento.`);
        } else {
            itensLimitados.forEach((item, index) => {
                console.log(`${index + 1}. ${item.nome} (${item.tipo}) - ${item.quantidade} unidades consumidas`);
            });
        }
        
        console.log(`-------------------------------------------------\n`);
    }
}
