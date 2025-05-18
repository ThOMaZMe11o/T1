import Entrada from "../client/entrada";
import Empresa from "../models/empresa";
// Cliente
import CadastroCliente from "../services/register/cadastroCliente";
import EditeCliente from "../services/edit/editarCliente";
import DeleteCliente from "../services/delete/deletarCliente";
import ListagemClientes from "../services/listing/listagemClientes";
import ListagemTopClientes from "../services/listing/listagemTopCleintes";
// Pets
import CadastroPets from "../services/register/cadastroPets";
import EditePet from "../services/edit/editarPets";
import DeletePet from "../services/delete/deletarPets";
import ListagemPets from "../services/listing/listagemPets";
import ListagemPorRaca from "../services/listing/listagemTipoRaca";
// Produtos
import CadastroProduto from "../services/register/cadastroProdutos";
import EditeProduto from "../services/edit/editarProduto";
import DeleteProduto from "../services/delete/deletarProduto";
import ListagemProdutos from "../services/listing/listagemProdutos";
// Serviços
import CadastroServico from "../services/register/cadastroServicos";
import ListagemServicos from "../services/listing/listagemServicos";
import EditeServico from "../services/edit/editarServico";
import DeleteServico from "../services/delete/deletarServicos";
// Consumos
import ListagemMaisConsumido from "../services/listing/listagemMaisConsumidos";
import RegistroConsumo from "../services/register/registroConsumo";
import ListagemConsumos from "../services/listing/listagemConsumo";

export default class App {
    private entrada: Entrada;
    private empresa: Empresa;

    constructor() {
        this.entrada = new Entrada();
        this.empresa = new Empresa();
    }

    public iniciar(): void {
        let execucao = true;

        this.exibirLogo();

        while (execucao) {
            this.exibirMenu();

            let opcao = this.entrada.receberNumero(`Por favor, escolha uma opção: `);

            switch (opcao) {
                // Cliente
                case 1:
                    const cadastroCliente = new CadastroCliente(this.empresa.getClientes());
                    cadastroCliente.cadastrar();
                    break;
                case 2:
                    const editeCliente = new EditeCliente(this.empresa.getClientes());
                    editeCliente.editar();
                    break;
                case 3:
                    const deleteCliente = new DeleteCliente(this.empresa.getClientes(), this.empresa.getConsumos());
                    deleteCliente.deletar();
                    break;
                case 4:
                    const listagemClientes = new ListagemClientes(this.empresa.getClientes());
                    listagemClientes.listar();
                    break;
                case 5:
                    const listagemTopClientes = new ListagemTopClientes(this.empresa.getClientes());
                    listagemTopClientes.listar();
                    break;
                // Pets
                case 6:
                    const cadastroPets = new CadastroPets(this.empresa.getClientes());
                    cadastroPets.cadastrar();
                    break;
                case 7:
                    const editePet = new EditePet(this.empresa.getClientes());
                    editePet.editar();
                    break;
                case 8:
                    const deletePet = new DeletePet(this.empresa.getClientes());
                    deletePet.deletar();
                    break;
                case 9:
                    const listagemPets = new ListagemPets(this.empresa.getClientes());
                    listagemPets.listar();
                    break;
                case 10:
                    const listagemPorRaca = new ListagemPorRaca(this.empresa.getProdutos(), this.empresa.getServicos());
                    listagemPorRaca.listar();
                    break;
                // Produtos
                case 11:
                    const cadastroProduto = new CadastroProduto(this.empresa.getProdutos());
                    cadastroProduto.cadastrar();
                    break;
                case 12:
                    const editeProduto = new EditeProduto(this.empresa.getProdutos());
                    editeProduto.editar();
                    break;
                case 13:
                    const deleteProduto = new DeleteProduto(this.empresa.getProdutos(), this.empresa.getConsumos());
                    deleteProduto.deletar();
                    break;
                case 14:
                    const listagemProdutos = new ListagemProdutos(this.empresa.getProdutos());
                    listagemProdutos.listar();  
                    break;
                // Serviços
                case 15:
                    const cadastroServico = new CadastroServico(this.empresa.getServicos());
                    cadastroServico.cadastrar();
                    break;
                case 16:
                    const listagemServicos = new ListagemServicos(this.empresa.getServicos());
                    listagemServicos.listar();
                    break;
                case 17:
                    const editeServico = new EditeServico(this.empresa.getServicos());
                    editeServico.editar();
                    break;
                case 18:
                    const deleteServico = new DeleteServico(this.empresa.getServicos(), this.empresa.getConsumos());
                    deleteServico.deletar();
                    break;
                // Consumos
                case 19:
                    const listagemMaisConsumido = new ListagemMaisConsumido(this.empresa.getProdutos(), this.empresa.getServicos());
                    listagemMaisConsumido.listar();
                    break;
                case 20:
                    const registroConsumo = new RegistroConsumo(this.empresa.getClientes(), this.empresa.getProdutos(), this.empresa.getServicos(), this.empresa.getConsumos());
                    registroConsumo.registrar();
                    break;
                case 21:
                    const listagemConsumos = new ListagemConsumos(this.empresa.getConsumos());
                    listagemConsumos.listar();
                    break;
                case 0:
                    execucao = false;
                    console.log(`\nEncerrando o sistema. Até mais! 🐾\n`);
                    break;
                default:
                    console.log(`\n❌ Opção inválida. Tente novamente.\n`);
            }
            
            if (execucao && opcao >= 0 && opcao <= 21) {
                this.pausar();
            }
        }
    }

    private exibirLogo(): void {
        console.log(`\n╔═══════════════════════════════════════════════════════════════╗`);
        console.log(`║                                                               ║`);
        console.log(`║                      🐾 PET LOVERS (C4P) 🐾                   ║`);
        console.log(`║                                                               ║`);
        console.log(`║           Sistema de Gerenciamento para Pet Shops             ║`);
        console.log(`║                                                               ║`);
        console.log(`╚═══════════════════════════════════════════════════════════════╝\n`);
    }

    private exibirMenu(): void {
        console.log(`╔═══════════════════════════════════════════════════════════════╗`);
        console.log(`║                         MENU PRINCIPAL                        ║`);
        console.log(`╠═══════════════════════════════════════════════════════════════╣`);
        console.log(`║                                                               ║`);
        console.log(`║  CLIENTES:                                                    ║`);
        console.log(`║    1 - Cadastrar Cliente          3 - Excluir Cliente         ║`);
        console.log(`║    2 - Editar Cliente             4 - Listar Clientes         ║`);
        console.log(`║    5 - Top 10 Clientes                                        ║`);
        console.log(`║                                                               ║`);
        console.log(`║  PETS:                                                        ║`);
        console.log(`║    6 - Cadastrar Pet              8 - Excluir Pet             ║`);
        console.log(`║    7 - Editar Pet                 9 - Listar Pets             ║`);
        console.log(`║   10 - Listar por Raça                                        ║`);
        console.log(`║                                                               ║`);
        console.log(`║  PRODUTOS:                                                    ║`);
        console.log(`║   11 - Cadastrar Produto         13 - Excluir Produto         ║`);
        console.log(`║   12 - Editar Produto            14 - Listar Produtos         ║`);
        console.log(`║                                                               ║`);
        console.log(`║  SERVIÇOS:                                                    ║`);
        console.log(`║   15 - Cadastrar Serviço         17 - Editar Serviço          ║`);
        console.log(`║   16 - Listar Serviços           18 - Excluir Serviço         ║`);
        console.log(`║                                                               ║`);
        console.log(`║  CONSUMO E RELATÓRIOS:                                        ║`);
        console.log(`║   19 - Produtos/Serviços Mais Consumidos                      ║`);
        console.log(`║   20 - Registrar Consumo                                      ║`);
        console.log(`║   21 - Listar Consumos                                        ║`);
        console.log(`║                                                               ║`);
        console.log(`║  0 - Sair                                                     ║`);
        console.log(`║                                                               ║`);
        console.log(`╚═══════════════════════════════════════════════════════════════╝\n`);
    }

    private pausar(segundos: number = 1): void {
        const inicio = Date.now();
        while (Date.now() - inicio < segundos * 1000) {}
    }
}
