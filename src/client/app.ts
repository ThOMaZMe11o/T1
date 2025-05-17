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
                    const registroConsumo = new RegistroConsumo(this.empresa.getClientes(), this.empresa.getProdutos(), this.empresa.getServicos(), this.empresa.getConsumos());
                    registroConsumo.registrar();
                    break;
                case 6:
                    const listagemTopClientes = new ListagemTopClientes(this.empresa.getClientes());
                    listagemTopClientes.listar();
                    break;
                case 7:
                    const listagemPorRaca = new ListagemPorRaca(this.empresa.getProdutos(), this.empresa.getServicos());
                    listagemPorRaca.listar();
                    break;
                case 8:
                    const listagemPets = new ListagemPets(this.empresa.getClientes());
                    listagemPets.listar();
                    break;
                case 9:
                    const cadastroProduto = new CadastroProduto(this.empresa.getProdutos());
                    cadastroProduto.cadastrar();
                    break;
                case 10:
                    const cadastroServico = new CadastroServico(this.empresa.getServicos());
                    cadastroServico.cadastrar();
                    break;
                case 11:
                    const listagemProdutos = new ListagemProdutos(this.empresa.getProdutos());
                    listagemProdutos.listar();  
                    break;
                case 12:
                    const listagemServicos = new ListagemServicos(this.empresa.getServicos());
                    listagemServicos.listar();
                    break;
                case 13:
                    const listagemMaisConsumido = new ListagemMaisConsumido(this.empresa.getProdutos(), this.empresa.getServicos());
                    listagemMaisConsumido.listar();
                    break;
                case 14:
                    const listagemConsumos = new ListagemConsumos(this.empresa.getConsumos());
                    listagemConsumos.listar();
                    break;
                case 15:
                    const editePet = new EditePet(this.empresa.getClientes());
                    editePet.editar();
                    break;
                case 16:
                    const editeProduto = new EditeProduto(this.empresa.getProdutos());
                    editeProduto.editar();
                    break;
                case 17:
                    const editeServico = new EditeServico(this.empresa.getServicos());
                    editeServico.editar();
                    break;
                case 18:
                    const deletePet = new DeletePet(this.empresa.getClientes());
                    deletePet.deletar();
                    break;
                case 19:
                    const deleteProduto = new DeleteProduto(this.empresa.getProdutos(), this.empresa.getConsumos());
                    deleteProduto.deletar();
                    break;
                case 20:
                    const deleteServico = new DeleteServico(this.empresa.getServicos(), this.empresa.getConsumos());
                    deleteServico.deletar();
                    break;
                case 21:
                    const cadastrarPets = new CadastroPets(this.empresa.getClientes());
                    cadastrarPets.cadastrar();
                    break;
                case 0:
                    execucao = false;
                    console.log(`\n${this.colorir("Encerrando o sistema. Até mais! 🐾", "verde")}\n`);
                    break;
                default:
                    console.log(`\n${this.colorir("❌ Opção inválida. Tente novamente.", "vermelho")}\n`);
            }
            
            if (execucao && opcao >= 0 && opcao <= 20) {
                this.pausar();
            }
        }
    }

    private exibirLogo(): void {
        console.log(`\n${this.colorir("╔═══════════════════════════════════════════════════════════════╗", "ciano")}`);
        console.log(`${this.colorir("║                                                               ║", "ciano")}`);
        console.log(`${this.colorir("║                      🐾 PET LOVERS (C4P) 🐾                   ║", "ciano")}`);
        console.log(`${this.colorir("║                                                               ║", "ciano")}`);
        console.log(`${this.colorir("║           Sistema de Gerenciamento para Pet Shops             ║", "ciano")}`);
        console.log(`${this.colorir("║                                                               ║", "ciano")}`);
        console.log(`${this.colorir("╚═══════════════════════════════════════════════════════════════╝", "ciano")}\n`);
    }

    private exibirMenu(): void {
        console.log(`${this.colorir("╔═══════════════════════════════════════════════════════════════╗", "amarelo")}`);
        console.log(`${this.colorir("║                         MENU PRINCIPAL                        ║", "amarelo")}`);
        console.log(`${this.colorir("╠═══════════════════════════════════════════════════════════════╣", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  CLIENTES:                                                    ║", "amarelo")}`);
        console.log(`${this.colorir("║    1 - Cadastrar Cliente          3 - Editar Cliente          ║", "amarelo")}`);
        console.log(`${this.colorir("║    2 - Excluir Cliente            4 - Listar Clientes         ║", "amarelo")}`);
        console.log(`${this.colorir("║    5 - Top 10 Clientes                                        ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  PETS:                                                        ║", "amarelo")}`);
        console.log(`${this.colorir("║    1 - Cadastrar Pet              3 - Excluir Pet             ║", "amarelo")}`);
        console.log(`${this.colorir("║    2 - Listar Pets                4 - Editar Pet              ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  PRODUTOS:                                                    ║", "amarelo")}`);
        console.log(`${this.colorir("║    1 - Cadastrar Produto          3 - Listar Produtos         ║", "amarelo")}`);
        console.log(`${this.colorir("║    2 - Editar Produto             4 - Excluir Produto         ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  SERVIÇOS:                                                    ║", "amarelo")}`);
        console.log(`${this.colorir("║    1 - Cadastrar Serviço         3 - Listar Serviços          ║", "amarelo")}`);
        console.log(`${this.colorir("║    2 - Editar Serviço            4 - Excluir Serviço          ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  CONSUMO E RELATÓRIOS:                                        ║", "amarelo")}`);
        console.log(`${this.colorir("║    1 - Registrar Consumo                                      ║", "amarelo")}`);
        console.log(`${this.colorir("║    2 - Listar Consumos                                        ║", "amarelo")}`);
        console.log(`${this.colorir("║    3 - Produtos/Serviços por Raça                             ║", "amarelo")}`);
        console.log(`${this.colorir("║    4 - Produtos/Serviços Mais Consumidos                      ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("║  0 - Sair                                                     ║", "amarelo")}`);
        console.log(`${this.colorir("║                                                               ║", "amarelo")}`);
        console.log(`${this.colorir("╚═══════════════════════════════════════════════════════════════╝", "amarelo")}\n`);
    }

    private pausar(segundos: number = 1): void {
        const inicio = Date.now();
        while (Date.now() - inicio < segundos * 1000) {}
    }

    private colorir(texto: string, cor: 'vermelho' | 'verde' | 'amarelo' | 'azul' | 'magenta' | 'ciano' | 'branco' | 'reset'): string {
        const cores = {
            "vermelho": "\x1b[31m",
            "verde": "\x1b[32m",
            "amarelo": "\x1b[33m",
            "azul": "\x1b[34m",
            "magenta": "\x1b[35m",
            "ciano": "\x1b[36m",
            "branco": "\x1b[37m",
            "reset": "\x1b[0m"
        };
        
        return `${cores[cor]}${texto}${cores["reset"]}`;
    }
}
