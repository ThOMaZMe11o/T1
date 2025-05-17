import Cliente from "../../models/cliente";
import Listagem from "./listagem";
import Pet from "../../models/pet";

export default class ListagemPets extends Listagem {
    private clientes: Cliente[];

    constructor(clientes: Cliente[]) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nListagem de Pets por Cliente:\n`);

        this.clientes.forEach(cliente => {
            const pets: Pet[] = cliente.getPets();

            if (pets.length === 0) return; // Pula cliente sem pet

            console.log(`Cliente: ${cliente.getNome()} (${cliente.getCpf().getValor()})`);

            pets.forEach((pet, index) => {
                console.log(`  Pet ${index + 1}:`);
                console.log(`    Nome: ${pet.getNome()}`);
                console.log(`    Tipo: ${pet.getTipo()}`);
                console.log(`    Raça: ${pet.getRaca()}`);
                console.log(`    Gênero: ${pet.getGenero()}`);
            });

            console.log(`--------------------------------------`);
        });

        console.log();
    }
}
