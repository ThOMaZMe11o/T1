import Entrada from "../client/entrada";
import Empresa from "../models/empresa";
import CadastroCliente from "../services/register/cadastroCliente";
import ListagemClientes from "../services/listing/listagemClientes";

export default class App {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    public iniciar(): void {
        let execucao = true;

        console.log(`\nBem-vindo ao sistema PetLovers (C4P)\n`);

        while (execucao) {
            console.log(`Opções:`);
            console.log(`1 - Cadastrar Cliente`);
            console.log(`2 - Editar Cliente`);
            console.log(`3 - Excluir Cliente`);
            console.log(`4 - Listar Clientes`);
            console.log(`5 - Registrar Consumo`);
            console.log(`6 - Listar Top 10 Clientes por Quantidade`);
            console.log(`7 - Listar Produtos/Serviços por Raça`);
            console.log(`0 - Sair\n`);

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    console.log(`\n[🔧 Em construção] Cadastrar Cliente\n`);
                    break;
                case 2:
                    console.log(`\n[🔧 Em construção] Editar Cliente\n`);
                    break;
                case 3:
                    console.log(`\n[🔧 Em construção] Excluir Cliente\n`);
                    break;
                case 4:
                    console.log(`\n[🔧 Em construção] Listar Clientes\n`);
                    break;
                case 5:
                    console.log(`\n[🔧 Em construção] Registrar Consumo\n`);
                    break;
                case 6:
                    console.log(`\n[🔧 Em construção] Top 10 Clientes por Quantidade\n`);
                    break;
                case 7:
                    console.log(`\n[🔧 Em construção] Produtos/Serviços por Raça\n`);
                    break;
                case 0:
                    execucao = false;
                    console.log(`\nEncerrando o sistema. Até mais! 🐾\n`);
                    break;
                default:
                    console.log(`\n❌ Opção inválida. Tente novamente.\n`);
            }
        }
    }
}
