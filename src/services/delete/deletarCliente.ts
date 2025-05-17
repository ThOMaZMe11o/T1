import Cliente from "../../models/cliente";
import Consumo from "../../models/consumo";
import Entrada from "../../client/entrada";
import Delete from "./deletar";

export default class DeleteCliente extends Delete {
    private clientes: Array<Cliente>;
    private consumos: Array<Consumo>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, consumos: Array<Consumo>) {
        super();
        this.clientes = clientes;
        this.consumos = consumos;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Exclusão de Cliente`);
        console.log(`-------------------------------------------------`);

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados para excluir.`);
            return;
        }

        // Listar os clientes disponíveis
        console.log(`\nClientes disponíveis para exclusão:`);
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.getNome()} (Nome social: ${cliente.getNomeSocial()}) - CPF: ${cliente.getCpf().getValor()}`);
        });

        // Selecionar o cliente a ser excluído
        const clienteIndex = this.entrada.receberNumero(`\nSelecione o cliente pelo número: `) - 1;
        
        if (clienteIndex < 0 || clienteIndex >= this.clientes.length) {
            console.log(`\n❌ Índice de cliente inválido!`);
            return;
        }

        const clienteSelecionado = this.clientes[clienteIndex];

        // Primeira confirmação - Mostrar informações do cliente
        console.log(`\n⚠️ Você está prestes a excluir o seguinte cliente:`);
        console.log(`Nome: ${clienteSelecionado.getNome()}`);
        console.log(`Nome social: ${clienteSelecionado.getNomeSocial()}`);
        console.log(`CPF: ${clienteSelecionado.getCpf().getValor()}`);
        
        // Mostrar pets associados
        const pets = clienteSelecionado.getPets();
        if (pets.length > 0) {
            console.log(`\nPets associados que também serão excluídos:`);
            pets.forEach((pet, index) => {
                console.log(`${index + 1} - ${pet.getNome()} (${pet.getTipo()}, ${pet.getRaca()}, ${pet.getGenero()})`);
            });
        } else {
            console.log(`\nEste cliente não possui pets cadastrados.`);
        }
        
        // Mostrar consumos associados
        const consumosCliente = this.consumos.filter(consumo => consumo.getCliente() === clienteSelecionado);
        if (consumosCliente.length > 0) {
            console.log(`\nConsumos associados que também serão excluídos:`);
            consumosCliente.forEach((consumo, index) => {
                console.log(`${index + 1} - ${consumo.getNomeItem()} (${consumo.getTipo()}) - Quantidade: ${consumo.getQuantidade()}`);
            });
        } else {
            console.log(`\nEste cliente não possui consumos registrados.`);
        }

        // Primeira confirmação
        const primeiraConfirmacao = this.entrada.receberTexto(`\nDeseja realmente excluir este cliente e todos os seus dados associados? (S/N): `);
        
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

        // Remover consumos associados ao cliente
        const consumosARemover = this.consumos.filter(consumo => consumo.getCliente() === clienteSelecionado);
        consumosARemover.forEach(consumo => {
            const index = this.consumos.indexOf(consumo);
            if (index !== -1) {
                this.consumos.splice(index, 1);
            }
        });

        // Remover o cliente
        this.clientes.splice(clienteIndex, 1);

        console.log(`\n✅ Cliente excluído com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
