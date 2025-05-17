import Cliente from "../../models/cliente";
import Entrada from "../../client/entrada";
import Editar from "./editar";

export default class EditarPet extends Editar {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Edição de Pet`);
        console.log(`-------------------------------------------------`);

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados.`);
            return;
        }

        // Listar os clientes disponíveis
        console.log(`\nSelecione o cliente dono do pet:`);
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.getNome()} (CPF: ${cliente.getCpf().getValor()})`);
        });

        // Selecionar o cliente
        const clienteIndex = this.entrada.receberNumero(`\nSelecione o cliente pelo número: `) - 1;
        
        if (clienteIndex < 0 || clienteIndex >= this.clientes.length) {
            console.log(`\n❌ Índice de cliente inválido!`);
            return;
        }

        const clienteSelecionado = this.clientes[clienteIndex];
        const pets = clienteSelecionado.getPets();

        if (pets.length === 0) {
            console.log(`\nEste cliente não possui pets cadastrados.`);
            return;
        }

        // Listar os pets do cliente
        console.log(`\nPets de ${clienteSelecionado.getNome()}:`);
        pets.forEach((pet, index) => {
            console.log(`${index + 1} - ${pet.getNome()} (${pet.getTipo()}, ${pet.getRaca()}, ${pet.getGenero()})`);
        });

        // Selecionar o pet a ser editado
        const petIndex = this.entrada.receberNumero(`\nSelecione o pet pelo número: `) - 1;
        
        if (petIndex < 0 || petIndex >= pets.length) {
            console.log(`\n❌ Índice de pet inválido!`);
            return;
        }

        const petSelecionado = pets[petIndex];

        console.log(`\nEditando pet: ${petSelecionado.getNome()}`);
        console.log(`Nome atual: ${petSelecionado.getNome()}`);
        console.log(`Raça atual: ${petSelecionado.getRaca()}`);
        console.log(`Tipo atual: ${petSelecionado.getTipo()}`);
        console.log(`Gênero atual: ${petSelecionado.getGenero()}`);

        // Editar nome
        const novoNome = this.entrada.receberTexto(`\nInforme o novo nome (ou deixe em branco para manter o atual): `);
        
        // Editar raça
        const novaRaca = this.entrada.receberTexto(`Informe a nova raça (ou deixe em branco para manter a atual): `);
        
        // Editar tipo
        const novoTipo = this.entrada.receberTexto(`Informe o novo tipo (ou deixe em branco para manter o atual): `);
        
        // Editar gênero
        const novoGenero = this.entrada.receberTexto(`Informe o novo gênero (ou deixe em branco para manter o atual): `);

        // Aplicar as alterações
        if (novoNome.trim()) {
            // Adicionar método setNome na classe Pet
            if (typeof petSelecionado.setNome === 'function') {
                petSelecionado.setNome(novoNome);
            } else {
                console.log(`\n⚠️ Não foi possível editar o nome. Método setNome não encontrado na classe Pet.`);
                console.log(`Adicione o seguinte método à sua classe Pet:`);
                console.log(`
public setNome(nome: string): void {
    this.nome = nome;
}
                `);
            }
        }

        if (novaRaca.trim()) {
            // Adicionar método setRaca na classe Pet
            if (typeof petSelecionado.setRaca === 'function') {
                petSelecionado.setRaca(novaRaca);
            } else {
                console.log(`\n⚠️ Não foi possível editar a raça. Método setRaca não encontrado na classe Pet.`);
                console.log(`Adicione o seguinte método à sua classe Pet:`);
                console.log(`
public setRaca(raca: string): void {
    this.raca = raca;
}
                `);
            }
        }

        if (novoTipo.trim()) {
            // Adicionar método setTipo na classe Pet
            if (typeof petSelecionado.setTipo === 'function') {
                petSelecionado.setTipo(novoTipo);
            } else {
                console.log(`\n⚠️ Não foi possível editar o tipo. Método setTipo não encontrado na classe Pet.`);
                console.log(`Adicione o seguinte método à sua classe Pet:`);
                console.log(`
public setTipo(tipo: string): void {
    this.tipo = tipo;
}
                `);
            }
        }

        if (novoGenero.trim()) {
            // Adicionar método setGenero na classe Pet
            if (typeof petSelecionado.setGenero === 'function') {
                petSelecionado.setGenero(novoGenero);
            } else {
                console.log(`\n⚠️ Não foi possível editar o gênero. Método setGenero não encontrado na classe Pet.`);
                console.log(`Adicione o seguinte método à sua classe Pet:`);
                console.log(`
public setGenero(genero: string): void {
    this.genero = genero;
}
                `);
            }
        }

        console.log(`\n✅ Pet editado com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
