import Listagem from "./listagem";
import Consumo from "../../models/consumo";
import Entrada from "../../client/entrada";

export default class ListagemConsumos extends Listagem {
    private consumos: Array<Consumo>;
    private entrada: Entrada;

    constructor(consumos: Array<Consumo>) {
        super();
        this.consumos = consumos;
        this.entrada = new Entrada();
    }

    public listar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Listagem de Todos os Consumos Registrados`);
        console.log(`-------------------------------------------------`);
        
        if (this.consumos.length === 0) {
            console.log(`\nNenhum consumo foi registrado até o momento.`);
        } else {
            // Ordenar consumos por data (mais recente primeiro)
            const consumosOrdenados = [...this.consumos].sort((a, b) => 
                b.getData().getTime() - a.getData().getTime()
            );
            
            consumosOrdenados.forEach((consumo, index) => {
                const cliente = consumo.getCliente();
                const data = this.formatarData(consumo.getData());
                const tipo = consumo.getTipo();
                const nomeItem = consumo.getNomeItem();
                const quantidade = consumo.getQuantidade();
                const valorTotal = consumo.getValorTotal().toFixed(2);
                
                console.log(`\nConsumo #${index + 1}:`);
                console.log(`Cliente: ${cliente.getNome()} ${cliente.getSobrenome ? cliente.getSobrenome() : ''}`);
                console.log(`CPF: ${cliente.getCpf().getValor()}`);
                console.log(`Item: ${nomeItem} (${tipo})`);
                console.log(`Quantidade: ${quantidade}`);
                console.log(`Data: ${data}`);
                console.log(`Valor Total: R$ ${valorTotal}`);
                console.log(`-------------------------------------------------`);
            });
        }
        
        console.log(`\nTotal de consumos: ${this.consumos.length}`);
        console.log(`-------------------------------------------------\n`);
    }
    
    private formatarData(data: Date): string {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}
