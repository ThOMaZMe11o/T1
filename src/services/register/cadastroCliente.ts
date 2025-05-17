import Entrada from "../../client/entrada";
import Cliente from "../../models/cliente";
import CPF from "../../models/cpf";
import Cadastro from "../register/cadastro";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente:`);

        const nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `);
        const nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `);
        const valor = this.entrada.receberTexto(`Por favor informe o número do CPF: `);
        const data = this.entrada.receberTexto(`Por favor informe a data de emissão do CPF (dd/mm/yyyy): `);

        const partesData = data.split('/');
        if (partesData.length !== 3) {
            console.log("⚠️ Data inválida. Cadastro cancelado.");
            return;
        }

        const ano = Number(partesData[2]);
        const mes = Number(partesData[1]);
        const dia = Number(partesData[0]);
        const dataEmissao = new Date(ano, mes - 1, dia);

        const cpf = new CPF(valor, dataEmissao);
        const cliente = new Cliente(nome, nomeSocial, cpf);

        this.clientes.push(cliente);

        console.log(`\n✅ Cadastro de cliente concluído!\n`);
    }
}
