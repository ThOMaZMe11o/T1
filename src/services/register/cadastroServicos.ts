import Entrada from "../../client/entrada";
import Servico from "../../models/servico";
import Cadastro from "../register/cadastro";

export default class CadastroServico extends Cadastro {
    private servicos: Servico[];
    private entrada: Entrada;

    constructor(servicos: Servico[]) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nCadastro de serviço:`);

        const nome = this.entrada.receberTexto(`Informe o nome do serviço: `);
        const preco = this.entrada.receberNumero(`Informe o preço do serviço: `);

        const servico = new Servico(nome, preco);
        this.servicos.push(servico);

        console.log(`✅ Serviço cadastrado com sucesso!\n`);
    }
}
