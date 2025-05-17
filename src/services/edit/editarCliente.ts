import Cliente from "../../models/cliente";
import Entrada from "../../client/entrada";
import Editar from "./editar";

export default class EditarCliente extends Editar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Edição de Cliente`);
        console.log(`-------------------------------------------------`);

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados para editar.`);
            return;
        }

        // Listar os clientes disponíveis
        console.log(`\nClientes disponíveis para edição:`);
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.getNome()} (Nome social: ${cliente.getNomeSocial()}) - CPF: ${cliente.getCpf().getValor()}`);
        });

        // Selecionar o cliente a ser editado
        const clienteIndex = this.entrada.receberNumero(`\nSelecione o cliente pelo número: `) - 1;
        
        if (clienteIndex < 0 || clienteIndex >= this.clientes.length) {
            console.log(`\n❌ Índice de cliente inválido!`);
            return;
        }

        const clienteSelecionado = this.clientes[clienteIndex];

        console.log(`\nEditando cliente: ${clienteSelecionado.getNome()}`);
        console.log(`Nome atual: ${clienteSelecionado.getNome()}`);
        console.log(`Nome social atual: ${clienteSelecionado.getNomeSocial()}`);
        console.log(`CPF: ${clienteSelecionado.getCpf().getValor()} (não editável)`);

        // Editar nome
        const novoNome = this.entrada.receberTexto(`\nInforme o novo nome (ou deixe em branco para manter o atual): `);
        
        // Editar nome social
        const novoNomeSocial = this.entrada.receberTexto(`Informe o novo nome social (ou deixe em branco para manter o atual): `);

        // Aplicar as alterações
        if (novoNome.trim()) {
            clienteSelecionado.setNome(novoNome);
        }

        if (novoNomeSocial.trim()) {
            clienteSelecionado.setNomeSocial(novoNomeSocial);
        }

        console.log(`\n✅ Cliente editado com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
