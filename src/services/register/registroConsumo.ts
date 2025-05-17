import Cliente from "../../models/cliente";
import Produto from "../../models/produto";
import Servico from "../../models/servico";
import Consumo from "../../models/consumo";
import Entrada from "../../client/entrada";

export default class RegistroConsumo {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private consumos: Array<Consumo>;
    private entrada: Entrada;

    constructor(
        clientes: Array<Cliente>,
        produtos: Array<Produto>,
        servicos: Array<Servico>,
        consumos: Array<Consumo>
    ) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.consumos = consumos;
        this.entrada = new Entrada();
    }

    public registrar(): void {
        console.log(`\n-------------------------------------------------`);
        console.log(`Registro de Novo Consumo`);
        console.log(`-------------------------------------------------`);

        if (this.clientes.length === 0) {
            console.log(`\nNão há clientes cadastrados. Cadastre um cliente primeiro.`);
            return;
        }

        if (this.produtos.length === 0 && this.servicos.length === 0) {
            console.log(`\nNão há produtos nem serviços cadastrados. Cadastre pelo menos um produto ou serviço primeiro.`);
            return;
        }

        // Selecionar cliente
        console.log(`\nClientes disponíveis:`);
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.getNome()} ${cliente.getNomeSocial ? cliente.getNomeSocial() : ''} (CPF: ${cliente.getCpf().getValor()})`);
        });

        const clienteIndex = this.entrada.receberNumero(`\nSelecione o cliente pelo número: `) - 1;
        
        if (clienteIndex < 0 || clienteIndex >= this.clientes.length) {
            console.log(`\nÍndice de cliente inválido!`);
            return;
        }

        const clienteSelecionado = this.clientes[clienteIndex];

        // Escolher entre produto ou serviço
        console.log(`\nTipo de consumo:`);
        console.log(`1 - Produto`);
        console.log(`2 - Serviço`);
        
        const tipoConsumo = this.entrada.receberNumero(`\nSelecione o tipo de consumo: `);
        
        if (tipoConsumo !== 1 && tipoConsumo !== 2) {
            console.log(`\nOpção inválida!`);
            return;
        }

        // Criar o consumo com a data atual
        const dataAtual = new Date();
        const quantidade = this.entrada.receberNumero(`\nInforme a quantidade: `);
        
        if (quantidade <= 0) {
            console.log(`\nQuantidade inválida!`);
            return;
        }

        const novoConsumo = new Consumo(clienteSelecionado, dataAtual, quantidade);

        if (tipoConsumo === 1) {
            // Selecionar produto
            if (this.produtos.length === 0) {
                console.log(`\nNão há produtos cadastrados. Cadastre um produto primeiro.`);
                return;
            }

            console.log(`\nProdutos disponíveis:`);
            this.produtos.forEach((produto, index) => {
                console.log(`${index + 1} - ${produto.getNome()} - R$ ${produto.getPreco().toFixed(2)}`);
            });

            const produtoIndex = this.entrada.receberNumero(`\nSelecione o produto pelo número: `) - 1;
            
            if (produtoIndex < 0 || produtoIndex >= this.produtos.length) {
                console.log(`\nÍndice de produto inválido!`);
                return;
            }

            const produtoSelecionado = this.produtos[produtoIndex];
            novoConsumo.setProduto(produtoSelecionado);
            
            // Incrementar a quantidade consumida do produto
            produtoSelecionado.incrementarConsumo(quantidade);
            
        } else {
            // Selecionar serviço
            if (this.servicos.length === 0) {
                console.log(`\nNão há serviços cadastrados. Cadastre um serviço primeiro.`);
                return;
            }

            console.log(`\nServiços disponíveis:`);
            this.servicos.forEach((servico, index) => {
                console.log(`${index + 1} - ${servico.getNome()} - R$ ${servico.getPreco().toFixed(2)}`);
            });

            const servicoIndex = this.entrada.receberNumero(`\nSelecione o serviço pelo número: `) - 1;
            
            if (servicoIndex < 0 || servicoIndex >= this.servicos.length) {
                console.log(`\nÍndice de serviço inválido!`);
                return;
            }

            const servicoSelecionado = this.servicos[servicoIndex];
            novoConsumo.setServico(servicoSelecionado);
            
            // Incrementar a quantidade consumida do serviço
            servicoSelecionado.incrementarConsumo(quantidade);
        }

        // Adicionar o consumo à lista
        this.consumos.push(novoConsumo);
        
        // Incrementar a quantidade consumida do cliente (se existir esse método)
        if (typeof clienteSelecionado.incrementarConsumo === 'function') {
            clienteSelecionado.incrementarConsumo(quantidade);
        }

        console.log(`\n✅ Consumo registrado com sucesso!`);
        console.log(`Cliente: ${clienteSelecionado.getNome()}`);
        console.log(`Item: ${novoConsumo.getNomeItem()} (${novoConsumo.getTipo()})`);
        console.log(`Quantidade: ${quantidade}`);
        console.log(`Valor Total: R$ ${novoConsumo.getValorTotal().toFixed(2)}`);
        console.log(`-------------------------------------------------\n`);
    }
}
