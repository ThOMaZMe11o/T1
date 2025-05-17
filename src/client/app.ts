import Entrada from "../client/entrada";
import Empresa from "../models/empresa";
import CadastroCliente from "../services/register/cadastroCliente";
import ListagemClientes from "../services/listing/listagemClientes";
import ListagemPets from "../services/listing/listagemPets";
import ListagemProdutos from "../services/listing/listagemProdutos";
import ListagemServicos from "../services/listing/listagemServicos";
import CadastroProduto from "../services/register/cadastroProdutos";
import CadastroServico from "../services/register/cadastroServicos";

export default class App {
    private entrada: Entrada;
    private empresa: Empresa;

    constructor() {
        this.entrada = new Entrada();
        this.empresa = new Empresa();
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
            console.log(`8 - Listar Pets`);
            console.log(`9 - Cadastrar Produto`);
            console.log(`10 - Cadastrar Serviço`);
            console.log(`11 - Listar Produtos`);
            console.log(`12 - Listar Serviços`);
            console.log(`0 - Sair\n`);

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                case 1:
                    const cadastroCliente = new CadastroCliente(this.empresa.getClientes());
                    cadastroCliente.cadastrar();
                    console.log(`\n[🔧 Em construção] Cadastrar Cliente\n`);
                    break;
                case 2:
                    console.log(`\n[🔧 Em construção] Editar Cliente\n`);
                    break;
                case 3:
                    console.log(`\n[🔧 Em construção] Excluir Cliente\n`);
                    break;
                case 4:
                    const listagemClientes = new ListagemClientes(this.empresa.getClientes());
                    listagemClientes.listar();
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
                case 8:
                    const listagemPets = new ListagemPets(this.empresa.getClientes());
                    listagemPets.listar();
                    console.log(`\n[🔧 Em construção] Listar Pets\n`);
                    break;
                case 9:
                    const cadastroProduto = new CadastroProduto(this.empresa.getProdutos());
                    cadastroProduto.cadastrar();
                    console.log(`\n[🔧 Em construção] Cadastrar Produto\n`);
                    break;
                case 10:
                    const cadastroServico = new CadastroServico(this.empresa.getServicos());
                    cadastroServico.cadastrar();
                    console.log(`\n[🔧 Em construção] Cadastrar Serviço\n`);
                    break;
                case 11:
                    const listagemProdutos = new ListagemProdutos(this.empresa.getProdutos());
                    listagemProdutos.listar();  
                    console.log(`\n[🔧 Em construção] Listar Produtos\n`);
                    break;
                case 12:
                    const listagemServicos = new ListagemServicos(this.empresa.getServicos());
                    listagemServicos.listar();
                    console.log(`\n[🔧 Em construção] Listar Serviços\n`);
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
