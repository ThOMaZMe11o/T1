import Servico from "../../models/servico";
import Entrada from "../../client/entrada";
import Editar from "./editar";

export default class EditeServico extends Editar {
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>) {
        super();
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public editar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Edição de Serviço`);
        console.log(`-------------------------------------------------`);

        if (this.servicos.length === 0) {
            console.log(`\nNão há serviços cadastrados para editar.`);
            return;
        }

        // Listar os serviços disponíveis
        console.log(`\nServiços disponíveis para edição:`);
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome()} - R$ ${servico.getPreco().toFixed(2)}`);
        });

        // Selecionar o serviço a ser editado
        const servicoIndex = this.entrada.receberNumero(`\nSelecione o serviço pelo número: `) - 1;
        
        if (servicoIndex < 0 || servicoIndex >= this.servicos.length) {
            console.log(`\n❌ Índice de serviço inválido!`);
            return;
        }

        const servicoSelecionado = this.servicos[servicoIndex];

        console.log(`\nEditando serviço: ${servicoSelecionado.getNome()}`);
        console.log(`Nome atual: ${servicoSelecionado.getNome()}`);
        console.log(`Preço atual: R$ ${servicoSelecionado.getPreco().toFixed(2)}`);
        
        // Mostrar raças compatíveis atuais
        const racasCompativeis = servicoSelecionado.getRacasCompativeis();
        if (racasCompativeis.length === 0) {
            console.log(`Raças compatíveis: Todas as raças`);
        } else {
            console.log(`Raças compatíveis: ${racasCompativeis.join(', ')}`);
        }

        // Editar nome
        const novoNome = this.entrada.receberTexto(`\nInforme o novo nome (ou deixe em branco para manter o atual): `);
        
        // Editar preço
        const novoPrecoStr = this.entrada.receberTexto(`Informe o novo preço (ou deixe em branco para manter o atual): `);
        
        // Editar raças compatíveis
        const editarRacas = this.entrada.receberTexto(`Deseja editar as raças compatíveis? (S/N): `);

        // Aplicar as alterações
        if (novoNome.trim()) {
            // Adicionar método setNome na classe Servico se não existir
            if (typeof servicoSelecionado.setNome === 'function') {
                servicoSelecionado.setNome(novoNome);
            } else {
                console.log(`\n⚠️ Não foi possível editar o nome. Método setNome não encontrado na classe Servico.`);
                console.log(`Adicione o seguinte método à sua classe Servico:`);
                console.log(`
public setNome(nome: string): void {
    this.nome = nome;
}
                `);
            }
        }

        if (novoPrecoStr.trim()) {
            const novoPreco = parseFloat(novoPrecoStr);
            if (!isNaN(novoPreco) && novoPreco >= 0) {
                // Adicionar método setPreco na classe Servico se não existir
                if (typeof servicoSelecionado.setPreco === 'function') {
                    servicoSelecionado.setPreco(novoPreco);
                } else {
                    console.log(`\n⚠️ Não foi possível editar o preço. Método setPreco não encontrado na classe Servico.`);
                    console.log(`Adicione o seguinte método à sua classe Servico:`);
                    console.log(`
public setPreco(preco: number): void {
    this.preco = preco;
}
                    `);
                }
            } else {
                console.log(`\n❌ Preço inválido! O preço deve ser um número positivo.`);
            }
        }

        if (editarRacas.trim().toUpperCase() === 'S') {
            // Limpar raças atuais e adicionar novas
            if (typeof servicoSelecionado.setRacasCompativeis === 'function') {
                const novasRacas: string[] = [];
                
                console.log(`\nEdição de raças compatíveis:`);
                console.log(`(Deixe em branco e pressione Enter para finalizar)`);
                
                let adicionandoRacas = true;
                let contador = 1;
                
                while (adicionandoRacas) {
                    const raca = this.entrada.receberTexto(`Raça ${contador}: `);
                    if (raca.trim()) {
                        novasRacas.push(raca.trim());
                        contador++;
                    } else {
                        adicionandoRacas = false;
                    }
                }
                
                servicoSelecionado.setRacasCompativeis(novasRacas);
            } else {
                // Se não existir o método setRacasCompativeis, tentar limpar e adicionar uma a uma
                if (typeof servicoSelecionado.limparRacasCompativeis === 'function') {
                    servicoSelecionado.limparRacasCompativeis();
                    
                    console.log(`\nEdição de raças compatíveis:`);
                    console.log(`(Deixe em branco e pressione Enter para finalizar)`);
                    
                    let adicionandoRacas = true;
                    let contador = 1;
                    
                    while (adicionandoRacas) {
                        const raca = this.entrada.receberTexto(`Raça ${contador}: `);
                        if (raca.trim()) {
                            servicoSelecionado.adicionarRacaCompativel(raca.trim());
                            contador++;
                        } else {
                            adicionandoRacas = false;
                        }
                    }
                } else {
                    console.log(`\n⚠️ Não foi possível editar as raças compatíveis. Métodos necessários não encontrados na classe Servico.`);
                    console.log(`Adicione os seguintes métodos à sua classe Servico:`);
                    console.log(`
public setRacasCompativeis(racas: Array<string>): void {
    this.racasCompativeis = racas;
}

public limparRacasCompativeis(): void {
    this.racasCompativeis = [];
}
                    `);
                }
            }
        }

        console.log(`\n✅ Serviço editado com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
