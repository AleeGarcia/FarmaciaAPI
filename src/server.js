const express = require('express')
const server = express()
const dados = require('./data/dados.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// mensagem no terminal para indicar o funcionamento
server.listen(3000, () =>{
    console.log(`O servidor está funcionando! :D`);
})

// CRUD para Medicamentos
server.post('/medicamentos', (req, res) => {
    const novoMedicamento = req.body;

    if (!novoMedicamento.id || !novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dados.medicamentos.push(novoMedicamento);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Novo medicamento cadastrado com sucesso!" });
    }
});

server.get('/medicamentos', (req, res) => {
    return res.json(dados.medicamentos);
});

server.put('/medicamentos/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    const atualizarMedicamento = req.body;
    const idMedicamento = dados.medicamentos.findIndex(m => m.id === medicamentoId);

    if (idMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado :/" });
    } else {
        dados.medicamentos[idMedicamento].nome = atualizarMedicamento.nome || dados.medicamentos[idMedicamento].nome;
        dados.medicamentos[idMedicamento].fabricante = atualizarMedicamento.fabricante || dados.medicamentos[idMedicamento].fabricante;
        dados.medicamentos[idMedicamento].preco = atualizarMedicamento.preco || dados.medicamentos[idMedicamento].preco;
        dados.medicamentos[idMedicamento].quantidade = atualizarMedicamento.quantidade || dados.medicamentos[idMedicamento].quantidade;

        salvarDados(dados);

        return res.json({ mensagem: "Medicamento atualizado com sucesso!" });
    }
});

server.delete("/medicamentos/:id", (req, res) => {
    const medicamentoId = parseInt(req.params.id);
    dados.medicamentos = dados.medicamentos.filter(m => m.id !== medicamentoId);
    salvarDados(dados);
    return res.status(200).json({ mensagem: "Medicamento excluído com sucesso" });
});
// CRUD para Clientes
server.post('/clientes', (req, res) => {
    const novoCliente = req.body;

    if (!novoCliente.id_cliente || !novoCliente.nome_cliente || !novoCliente.endereco_cliente || !novoCliente.email_cliente || !novoCliente.telefone_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dados.clientes.push(novoCliente);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Novo cliente cadastrado com sucesso!" });
    }
});

server.get('/clientes', (req, res) => {
    return res.json(dados.clientes);
});

server.put('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const atualizarCliente = req.body;
    const idCliente = dados.clientes.findIndex(c => c.id_cliente === clienteId);

    if (idCliente === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado :/" });
    } else {
        dados.clientes[idCliente].nome_cliente = atualizarCliente.nome_cliente || dados.clientes[idCliente].nome_cliente;
        dados.clientes[idCliente].endereco_cliente = atualizarCliente.endereco_cliente || dados.clientes[idCliente].endereco_cliente;
        dados.clientes[idCliente].email_cliente = atualizarCliente.email_cliente || dados.clientes[idCliente].email_cliente;
        dados.clientes[idCliente].telefone_cliente = atualizarCliente.telefone_cliente || dados.clientes[idCliente].telefone_cliente;

        salvarDados(dados);

        return res.json({ mensagem: "Cliente atualizado com sucesso!" });
    }
});

server.delete("/clientes/:id", (req, res) => {
    const clienteId = parseInt(req.params.id);
    dados.clientes = dados.clientes.filter(c => c.id_cliente !== clienteId);
    salvarDados(dados);
    return res.status(200).json({ mensagem: "Cliente excluído com sucesso" });
});

// CRUD para Fornecedores
server.post('/fornecedores', (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.id_fornecedor || !novoFornecedor.nome_fornecedor || !novoFornecedor.endereco_fornecedor || !novoFornecedor.telefone_fornecedor) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dados.fornecedores.push(novoFornecedor);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Novo fornecedor cadastrado com sucesso!" });
    }
});

server.get('/fornecedores', (req, res) => {
    return res.json(dados.fornecedores);
});

server.put('/fornecedores/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    const atualizarFornecedor = req.body;
    const idFornecedor = dados.fornecedores.findIndex(f => f.id_fornecedor === fornecedorId);

    if (idFornecedor === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado :/" });
    } else {
        dados.fornecedores[idFornecedor].nome_fornecedor = atualizarFornecedor.nome_fornecedor || dados.fornecedores[idFornecedor].nome_fornecedor;
        dados.fornecedores[idFornecedor].endereco_fornecedor = atualizarFornecedor.endereco_fornecedor || dados.fornecedores[idFornecedor].endereco_fornecedor;
        dados.fornecedores[idFornecedor].telefone_fornecedor = atualizarFornecedor.telefone_fornecedor || dados.fornecedores[idFornecedor].telefone_fornecedor;

        salvarDados(dados);

        return res.json({ mensagem: "Fornecedor atualizado com sucesso!" });
    }
});

server.delete("/fornecedores/:id", (req, res) => {
    const fornecedorId = parseInt(req.params.id);
    dados.fornecedores = dados.fornecedores.filter(f => f.id_fornecedor !== fornecedorId);
    salvarDados(dados);
    return res.status(200).json({ mensagem: "Fornecedor excluído com sucesso" });
});

// CRUD para Vendas
server.post('/vendas', (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.id_venda || !novaVenda.data_venda || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        dados.vendas.push(novaVenda);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Nova venda cadastrada com sucesso!" });
    }
});

server.get('/vendas', (req, res) => {
    return res.json(dados.vendas);
});

server.put('/vendas/:id', (req, res) => {
    const vendaId = parseInt(req.params.id);
    const atualizarVenda = req.body;
    const idVenda = dados.vendas.findIndex(v => v.id_venda === vendaId);

    if (idVenda === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrada :/" });
    } else {
        dados.vendas[idVenda].data_venda = atualizarVenda.data_venda || dados.vendas[idVenda].data_venda;
        dados.vendas[idVenda].id_medicamento = atualizarVenda.id_medicamento || dados.vendas[idVenda].id_medicamento;
        dados.vendas[idVenda].id_cliente = atualizarVenda.id_cliente || dados.vendas[idVenda].id_cliente;

        salvarDados(dados);

        return res.json({ mensagem: "Venda atualizada com sucesso!" });
    }
});

server.delete("/vendas/:id", (req, res) => {
    const vendaId = parseInt(req.params.id);
    dados.vendas = dados.vendas.filter(v => v.id_venda !== vendaId);
    salvarDados(dados);
    return res.status(200).json({ mensagem: "Venda excluída com sucesso" });
});



function salvarDados(dados) {
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2));
}



