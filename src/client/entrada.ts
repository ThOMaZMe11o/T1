import promptSync from 'prompt-sync';

const prompt = promptSync();

export default class Entrada {
    public receberNumero(mensagem: string): number {
        const valor = prompt(mensagem);
        const numero = Number(valor);

        while (isNaN(numero)) {
            console.log("Valor inválido. Digite um número.");
            const novoValor = prompt(mensagem);
            if (!isNaN(Number(novoValor))) {
                return Number(novoValor);
            }
        }

        return numero;
    }

    public receberTexto(mensagem: string): string {
        const texto = prompt(mensagem).trim();

        while (!texto) {
            console.log("Texto não pode ser vazio.");
            const novoTexto = prompt(mensagem).trim();
            if (novoTexto) {
                return novoTexto;
            }
        }

        return texto;
    }
}
