import Entrada from "../../client/entrada";
import Cliente from "../../models/cliente";
import Pet from "../../models/pet";
import Cadastro from "../register/cadastro";

export default class CadastroPets extends Cadastro {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public cadastrar(): void {
        console.log(`\nCadastro de pet para cliente:`);

        const cpfBusca = this.entrada.receberTexto(`Informe o CPF do dono: `);
        const cliente = this.clientes.find(c => c.getCpf().getValor() === cpfBusca);

        if (!cliente) {
            console.log(`❌ Cliente com CPF ${cpfBusca} não encontrado.`);
            return;
        }

        const nome = this.entrada.receberTexto(`Informe o nome do pet: `);
        const tipo = this.entrada.receberTexto(`Informe o tipo do pet (ex: cão, gato): `);
        const raca = this.entrada.receberTexto(`Informe a raça do pet: `);
        const genero = this.entrada.receberTexto(`Informe o gênero do pet (M/F): `);

        const pet = new Pet(nome, raca, tipo, genero);
        cliente.adicionarPet(pet);

        console.log(`✅ Pet cadastrado com sucesso para o cliente ${cliente.getNome()}!\n`);
    }
}
