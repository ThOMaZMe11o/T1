import Listagem from "./listagem";
import Cliente from "../../models/cliente";

export default class ListagemTopClientes extends Listagem {
    private clientes: Array<Cliente>;
    private limite: number;

    constructor(clientes: Array<Cliente>, limite: number = 10) {
        super();
        this.clientes = clientes;
        this.limite = limite;
    }

    private calcularConsumoClientes(): Array<{ cliente: Cliente, quantidade: number }> {
        // Mapear clientes e calcular consumo total
        const clientesComConsumo = this.clientes.map(cliente => {
            // Calcular quantidade total de produtos e serviços consumidos
            const quantidadeTotal = cliente.getQuantidadeConsumida();
            
            return {
                cliente: cliente,
                quantidade: quantidadeTotal
            };
        });

        // Ordenar por quantidade (decrescente)
        return clientesComConsumo.sort((a, b) => b.quantidade - a.quantidade);
    }

    public listar(): void {
        const clientesOrdenados = this.calcularConsumoClientes();
        
        console.log(`\n-------------------------------------------------`);
        console.log(`Listagem dos Top ${this.limite} Clientes por Consumo:`);
        console.log(`-------------------------------------------------`);

        // Limitar a quantidade de clientes exibidos
        const clientesLimitados = clientesOrdenados.slice(0, this.limite);

        if (clientesLimitados.length === 0) {
            console.log(`\nNenhum cliente realizou consumo até o momento.`);
        } else {
            clientesLimitados.forEach((item, index) => {
                const cliente = item.cliente;
                console.log(`${index + 1}. ${cliente.getNome()} - ${item.quantidade} itens consumidos`);
                console.log(`   CPF: ${cliente.getCpf().getValor()}`);
            });
        }
        
        console.log(`-------------------------------------------------\n`);
    }
}
