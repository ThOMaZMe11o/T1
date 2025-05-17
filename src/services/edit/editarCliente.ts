import Cliente from "../../models/cliente";
import Entrada from "../../client/entrada";

export default class EditeCliente {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
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
            // Adicionar método setNome na classe Cliente
            if (typeof clienteSelecionado.setNome === 'function') {
                clienteSelecionado.setNome(novoNome);
            } else {
                console.log(`\n⚠️ Não foi possível editar o nome. Método setNome não encontrado na classe Cliente.`);
                console.log(`Adicione o seguinte método à sua classe Cliente:`);
                console.log(`
public setNome(nome: string): void {
    this.nome = nome;
}
                `);
            }
        }

        if (novoNomeSocial.trim()) {
            // Adicionar método setNomeSocial na classe Cliente
            if (typeof clienteSelecionado.setNomeSocial === 'function') {
                clienteSelecionado.setNomeSocial(novoNomeSocial);
            } else {
                console.log(`\n⚠️ Não foi possível editar o nome social. Método setNomeSocial não encontrado na classe Cliente.`);
                console.log(`Adicione o seguinte método à sua classe Cliente:`);
                console.log(`
public setNomeSocial(nomeSocial: string): void {
    this.nomeSocial = nomeSocial;
}
                `);
            }
        }

        console.log(`\n✅ Cliente editado com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
