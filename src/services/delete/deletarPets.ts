import Cliente from "../../models/cliente";
import Entrada from "../../client/entrada";
import Delete from "./deletar";

export default class DeletePet extends Delete {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Exclusão de Pet`);
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

        // Selecionar o pet a ser excluído
        const petIndex = this.entrada.receberNumero(`\nSelecione o pet pelo número: `) - 1;
        
        if (petIndex < 0 || petIndex >= pets.length) {
            console.log(`\n❌ Índice de pet inválido!`);
            return;
        }

        const petSelecionado = pets[petIndex];

        // Primeira confirmação - Mostrar informações do pet
        console.log(`\n⚠️ Você está prestes a excluir o seguinte pet:`);
        console.log(`Nome: ${petSelecionado.getNome()}`);
        console.log(`Tipo: ${petSelecionado.getTipo()}`);
        console.log(`Raça: ${petSelecionado.getRaca()}`);
        console.log(`Gênero: ${petSelecionado.getGenero()}`);
        console.log(`Dono: ${clienteSelecionado.getNome()} (CPF: ${clienteSelecionado.getCpf().getValor()})`);

        // Primeira confirmação
        const primeiraConfirmacao = this.entrada.receberTexto(`\nDeseja realmente excluir este pet? (S/N): `);
        
        if (primeiraConfirmacao.trim().toUpperCase() !== 'S') {
            console.log(`\n✅ Operação de exclusão cancelada.`);
            return;
        }

        // Segunda confirmação
        const segundaConfirmacao = this.entrada.receberTexto(`\n⚠️ ATENÇÃO: Esta ação não pode ser desfeita. Confirma a exclusão? (S/N): `);
        
        if (segundaConfirmacao.trim().toUpperCase() !== 'S') {
            console.log(`\n✅ Operação de exclusão cancelada.`);
            return;
        }

        // Remover o pet
        pets.splice(petIndex, 1);

        console.log(`\n✅ Pet excluído com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
