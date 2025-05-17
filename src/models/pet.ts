export default class Pet {
    private nome: string;
    private raca: string;
    private tipo: string;
    private genero: string;

    constructor(nome: string, raca: string, tipo: string, genero: string) {
        this.nome = nome;
        this.raca = raca;
        this.tipo = tipo;
        this.genero = genero;
    }

    public getNome(): string {
        return this.nome;
    }

    public getRaca(): string {
        return this.raca;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getGenero(): string {
        return this.genero;
    }
}
