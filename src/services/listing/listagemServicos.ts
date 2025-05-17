import Servico from "../../models/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Servico[];

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
    }

    public listar(): void {
        console.log(`\nLista de Serviços:\n`);

        if (this.servicos.length === 0) {
            console.log("Nenhum serviço cadastrado.");
            return;
        }

        this.servicos.forEach((servico, index) => {
            console.log(`Serviço ${index + 1}:`);
            console.log(`  Nome: ${servico.getNome()}`);
            console.log(`  Preço: R$ ${servico.getPreco().toFixed(2)}`);
            console.log(`-----------------------------`);
        });
    }
}
