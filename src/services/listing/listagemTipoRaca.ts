import Listagem from "./listagem";
import Produto from "../../models/produto";
import Servico from "../../models/servico";
import Entrada from "../../client/entrada";

export default class ListagemPorRaca extends Listagem {
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(produtos: Array<Produto>, servicos: Array<Servico>) {
        super();
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    private filtrarProdutosPorRaca(raca: string): Array<Produto> {
        // Filtra produtos compatíveis com a raça especificada
        return this.produtos.filter(produto => {
            const racasCompativeis = produto.getRacasCompativeis();
            // Se o produto for compatível com todas as raças ou com a raça específica
            return racasCompativeis.length === 0 || 
                   racasCompativeis.some((r: string) => r.toLowerCase() === raca.toLowerCase());
        });
    }

    private filtrarServicosPorRaca(raca: string): Array<Servico> {
        // Filtra serviços compatíveis com a raça especificada
        return this.servicos.filter(servico => {
            const racasCompativeis = servico.getRacasCompativeis();
            // Se o serviço for compatível com todas as raças ou com a raça específica
            return racasCompativeis.length === 0 || 
                   racasCompativeis.some((r: string) => r.toLowerCase() === raca.toLowerCase());
        });
    }

    public listar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Listagem de Produtos e Serviços por Raça`);
        console.log(`-------------------------------------------------`);
        
        // Solicitar a raça para filtrar
        const raca = this.entrada.receberTexto(`Por favor, informe a raça do pet: `);
        
        // Filtrar produtos e serviços pela raça
        const produtosFiltrados = this.filtrarProdutosPorRaca(raca);
        const servicosFiltrados = this.filtrarServicosPorRaca(raca);
        
        console.log(`\nProdutos compatíveis com a raça ${raca}:`);
        console.log(`-------------------------------------------------`);
        
        if (produtosFiltrados.length === 0) {
            console.log(`Nenhum produto específico encontrado para a raça ${raca}.`);
        } else {
            produtosFiltrados.forEach((produto, index) => {
                console.log(`${index + 1}. ${produto.getNome()} - R$ ${produto.getPreco().toFixed(2)}`);
            });
        }
        
        console.log(`\nServiços compatíveis com a raça ${raca}:`);
        console.log(`-------------------------------------------------`);
        
        if (servicosFiltrados.length === 0) {
            console.log(`Nenhum serviço específico encontrado para a raça ${raca}.`);
        } else {
            servicosFiltrados.forEach((servico, index) => {
                console.log(`${index + 1}. ${servico.getNome()} - R$ ${servico.getPreco().toFixed(2)}`);
            });
        }
        
        console.log(`-------------------------------------------------\n`);
    }
}
