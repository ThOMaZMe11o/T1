import Cliente from "./cliente";
import Produto from "./produto";
import Servico from "./servico";
import Consumos from "./consumo";
import CPF from "./cpf";
import Pet from "./pet";

export default class Empresa {
    private clientes: Cliente[] = [];
    private produtos: Produto[] = [];
    private servicos: Servico[] = [];
    private consumos: Consumos[] = [];

    constructor() {
        this.cadastrarClientesExemplo();
    }

    private cadastrarClientesExemplo(): void {
        // Cliente 1 com pets
        const cpf1 = new CPF("123.456.789-10", new Date(2015, 5, 10));
        const cliente1 = new Cliente("João Silva", "João", cpf1);
        
        const pet1 = new Pet("Rex", "Labrador", "Cachorro", "Macho");
        const pet2 = new Pet("Luna", "Siamês", "Gato", "Fêmea");
        cliente1.adicionarPet(pet1);
        cliente1.adicionarPet(pet2);
        cliente1.incrementarConsumo(3);
        
        // Cliente 2 com pet
        const cpf2 = new CPF("987.654.321-00", new Date(2018, 2, 15));
        const cliente2 = new Cliente("Maria Oliveira", "Maria", cpf2);
        
        const pet3 = new Pet("Pipoca", "Poodle", "Cachorro", "Fêmea");
        cliente2.adicionarPet(pet3);
        cliente2.incrementarConsumo(1);
        
        // Cliente 3 com pets
        const cpf3 = new CPF("456.789.123-45", new Date(2020, 8, 22));
        const cliente3 = new Cliente("Carlos Mendes", "Carlos", cpf3);
        
        const pet4 = new Pet("Thor", "Pastor Alemão", "Cachorro", "Macho");
        const pet5 = new Pet("Mia", "Persa", "Gato", "Fêmea");
        const pet6 = new Pet("Pingo", "Calopsita", "Ave", "Macho");
        cliente3.adicionarPet(pet4);
        cliente3.adicionarPet(pet5);
        cliente3.adicionarPet(pet6);
        cliente3.incrementarConsumo(5);
        
        // Adicionar clientes ao array
        this.clientes.push(cliente1);
        this.clientes.push(cliente2);
        this.clientes.push(cliente3);
    }

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public getProdutos(): Produto[] {
        return this.produtos;
    }

    public getServicos(): Servico[] {
        return this.servicos;
    }

    public getConsumos(): Consumos[] {
        return this.consumos;
    }
}
