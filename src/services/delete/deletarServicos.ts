import Servico from "../../models/servico";
import Consumo from "../../models/consumo";
import Entrada from "../../client/entrada";
import Delete from "./deletar";

export default class DeleteServico extends Delete {
    private servicos: Array<Servico>;
    private consumos: Array<Consumo>;
    private entrada: Entrada;

    constructor(servicos: Array<Servico>, consumos: Array<Consumo>) {
        super();
        this.servicos = servicos;
        this.consumos = consumos;
        this.entrada = new Entrada();
    }

    public deletar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Exclusão de Serviço`);
        console.log(`-------------------------------------------------`);

        if (this.servicos.length === 0) {
            console.log(`\nNão há serviços cadastrados para excluir.`);
            return;
        }

        // Listar os serviços disponíveis
        console.log(`\nServiços disponíveis para exclusão:`);
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome()} - R$ ${servico.getPreco().toFixed(2)}`);
        });

        // Selecionar o serviço a ser excluído
        const servicoIndex = this.entrada.receberNumero(`\nSelecione o serviço pelo número: `) - 1;
        
        if (servicoIndex < 0 || servicoIndex >= this.servicos.length) {
            console.log(`\n❌ Índice de serviço inválido!`);
            return;
        }

        const servicoSelecionado = this.servicos[servicoIndex];

        // Verificar se o serviço está associado a algum consumo
        const consumosAssociados = this.consumos.filter(consumo => {
            const servicoConsumido = consumo.getServico();
            return servicoConsumido && servicoConsumido === servicoSelecionado;
        });

        // Primeira confirmação - Mostrar informações do serviço
        console.log(`\n⚠️ Você está prestes a excluir o seguinte serviço:`);
        console.log(`Nome: ${servicoSelecionado.getNome()}`);
        console.log(`Preço: R$ ${servicoSelecionado.getPreco().toFixed(2)}`);
        
        // Mostrar raças compatíveis
        const racasCompativeis = servicoSelecionado.getRacasCompativeis();
        if (racasCompativeis.length === 0) {
            console.log(`Raças compatíveis: Todas as raças`);
        } else {
            console.log(`Raças compatíveis: ${racasCompativeis.join(', ')}`);
        }
        
        // Mostrar quantidade consumida
        console.log(`Quantidade consumida: ${servicoSelecionado.getQuantidadeConsumida()}`);
        
        // Alertar sobre consumos associados
        if (consumosAssociados.length > 0) {
            console.log(`\n⚠️ ATENÇÃO: Este serviço está associado a ${consumosAssociados.length} consumo(s).`);
            console.log(`Todos esses consumos serão excluídos junto com o serviço.`);
        }

        // Primeira confirmação
        const primeiraConfirmacao = this.entrada.receberTexto(`\nDeseja realmente excluir este serviço? (S/N): `);
        
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

        // Remover consumos associados ao serviço
        if (consumosAssociados.length > 0) {
            consumosAssociados.forEach(consumo => {
                const index = this.consumos.indexOf(consumo);
                if (index !== -1) {
                    this.consumos.splice(index, 1);
                }
            });
            console.log(`\n${consumosAssociados.length} consumo(s) associado(s) foram excluídos.`);
        }

        // Remover o serviço
        this.servicos.splice(servicoIndex, 1);

        console.log(`\n✅ Serviço excluído com sucesso!`);
        console.log(`-------------------------------------------------\n`);
    }
}
