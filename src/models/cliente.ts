import CPF from "./cpf";
import Pet from "./pet";

export default class Cliente {
    private nome: string;
    private nomeSocial: string;
    private cpf: CPF;
    private pets: Pet[] = [];
    private quantidadeConsumida: number

    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.quantidadeConsumida = 0;
    }

    public getNome(): string {
        return this.nome;
    }

    public getNomeSocial(): string {
        return this.nomeSocial;
    }

    public getCpf(): CPF {
        return this.cpf;
    }

    public getPets(): Pet[] {
        return this.pets;
    }

    public adicionarPet(pet: Pet): void {
        this.pets.push(pet);
    }

    public getQuantidadeConsumida(): number {
        return this.quantidadeConsumida;
    }

    public incrementarConsumo(quantidade: number = 1): void {
        this.quantidadeConsumida += quantidade;
    }
}
