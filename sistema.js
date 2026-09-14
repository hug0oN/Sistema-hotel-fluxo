const prompt = require('prompt-sync')(); //esse aqui eh o melhor jeito que eu achei para fazer input
//talvez precise instalar o prompt sync antes

const { setTimeout } = require('node:timers/promises'); //aqui uma parte que precisa pra
//poder colocar um intervalo entre mensagens (uma funcao pra esperar)

let proximoIdFuncionario = 1;
let proximoIdCliente = 1; //aqui a parte de id dos objetos
let proximoIdQuarto = 1;
let proximoIdReserva = 1;

let usuario_logado;

//array de todos os objetos a serem armazenados
const funcionarios = [];
const clientes = [];
const lista_quartos = [];
const reservas = [];

class sistema{
    constructor(){ 
        this.dev_mode = false;
        this.usuario_logado = null; //aqui armazenar o usuario logado atualmente
    }

    ativar_dev(){ //ativa o dev mode, que vai habilitar varias mensagens de teste
        if(this.dev_mode == false){
        this.dev_mode = true;
        console.log("DEV: Modo dev ativado");
        }
        else{
            this.dev_mode = false;
            console.log("Modo dev desativado");

        }
    }
    async primeiro_menu(){ //primeiro menu que abre (async precisa pro delay das mensagens)
        console.log("-------------------------------------------------------") //usar essas linhas como divisoria
        console.log("Bem-Vindo!");
        await setTimeout(1000);
        console.log("") //como eu ainda nao sei pular uma linha vou colocar uns logs vazios
        //aqui pesquisar alguma maneira de criar uma janela de input e multipla escolha 
        //ao inves de digitacao
        //se nao der eu uso numeros (opcao 1 2 3 etc)

        console.log("1. Login");

        await setTimeout(1000);

        console.log("");

        console.log("2. Cadastro");

        await setTimeout(1000);

        console.log("");

        console.log("3. Sair");

        await setTimeout(1000);
        
        if(Sistema.dev_mode == true){
            console.log("");
            console.log("4. Desativar Modo Dev");
        }
        console.log("-------------------------------------------------------")
        const opcao = prompt("Escolha uma opção: ")
        if(opcao == 1){
            console.clear();
            return await this.login();
        }
        if(opcao == 2){
            console.clear();
            await this.cadastro(); //isso eh bem bizarro, preciso de um await na chamada 
            //senao ele pula os await dentro do cadastro, mesmo as funcao sendo async
            return await this.primeiro_menu();
        }
        if(opcao == 4){
            console.log("MODO DEV ATIVADO");
            this.ativar_dev();
            this.primeiro_menu(); //volta pro menu depois de ativar o dev
        }
        else{
            this.sair();
        }
    }
    
    async login(){

        if(Sistema.dev_mode == true){
        console.log("DEV: Iniciando processo de login");
        }
        console.log("Você é funcionário ou cliente?"); //Escolher entre funcionario e cliente
        console.log("");
        console.log("1. Funcionário");
        console.log("");
        console.log("2. Cliente");
        console.log("-------------------------------------------------------");
        const tipo_login = prompt("Escolha uma opção: ")

        const nome_login = prompt("Por favor digite seu nome de usuário: ");
        const senha_login = prompt("Agora digite sua senha: ");

        if(tipo_login == 1){
            const funcionarioEncontrado = funcionarios.find(f => f.nome === nome_login);//vai procurar o funcionario na lista
            //variavel vai ser undefined se nao achar nada 
            if(funcionarioEncontrado && funcionarioEncontrado.checar_Senha(senha_login)){
                console.clear();
                console.log(`BEM VINDO ${funcionarioEncontrado.nome}!`)
                await setTimeout(1500);
                console.clear();
                this.usuario_logado = funcionarioEncontrado;
                return this.menu_funcionario(funcionarioEncontrado);
            }
            else{
                console.clear();
                console.log("Senha ou usuário incorretos! Tente novamente!");
                this.login();
            }
        }
        if(tipo_login == 2){
            const clienteEncontrado = clientes.find(c => c.nome === nome_login); //procurar o cliente com mesmo nome na lista
            if(clienteEncontrado && clienteEncontrado.checar_Senha(senha_login)){
                console.clear();
                console.log(`BEM VINDO ${clienteEncontrado.nome}!`);
                await setTimeout(1500);
                console.clear();
                this.usuario_logado = clienteEncontrado;
                return this.menu_cliente(clienteEncontrado);
            }
            else{
                console.clear();
                console.log("Senha ou usuário incorretos! Tente novamente!");
                this.login();
            }
        }
        else{
            console.clear();
            console.log("Opção inválida!");
            this.login();
        }


    }
    async cadastro(){
        if(Sistema.dev_mod == true){
        console.log("DEV: Iniciando processo de cadastro");
        }
        console.log("Você é funcionário ou cliente?"); //Escolher entre funcionario e cliente
        console.log("");
        console.log("1. Funcionário");
        console.log("");
        console.log("2. Cliente");
        console.log("-------------------------------------------------------");
        const tipo_cadastro = prompt("Escolha uma opção: ")
        if(tipo_cadastro == 1){
            console.clear();
            //receber os dados necessarios para funcionario
            const nome = prompt("Nome: ");
            const cpf = prompt("CPF: ");
            const email = prompt("Email: ");
            const senha = prompt("Senha: ");

            const id = proximoIdFuncionario++; //aqui um placeholder de id unico, vai incrementandi entao nunca vao ter dois iguais

            const novo_funcionario = new funcionario(id, nome, cpf, email, senha); //chamar construtor com os dados

            funcionarios.push(novo_funcionario); //coloca o novo cara la no array

            console.clear();
            console.log("");
            console.log("Cadastro realizado com sucesso!");
            console.log("Por favor faça login na sua nova conta");
            await setTimeout(1500);
            console.clear();    
            return;
        }
        if(tipo_cadastro == 2){
            console.clear();
            //receber os dados necessarios para cliente
            const nome = prompt("Nome: ");
            const cpf = prompt("CPF: ");
            const data_nasc = prompt("Data de Nascimento(DD/MM/ANO): ");
            const email = prompt("Email: ");
            const senha = prompt("Senha: ");

            const id = proximoIdCliente++; //id unico dele definido por ordem de registro
            const novo_cliente = new cliente(id, nome, cpf, data_nasc, email, senha);

            clientes.push(novo_cliente); //coloca ele no array
            console.clear();
            console.log("");
            console.log("Cadastro realizado com sucesso!");
            console.log("Por favor faça login na sua nova conta");
            await setTimeout(1500);
            console.clear();
            return;

        }
        console.clear();
        console.log("Opção inválida.");
        this.cadastro();
    }

    menu_cliente(cliente){
        console.log("");
        console.log(`Bem vindo cliente ${cliente.nome}`);
        console.log("-------------------------------------------------------");
        console.log("1. Mudar meus dados");
        console.log("");
        console.log("2. Ver lista de quartos");
        console.log("");
        console.log("3. Fazer reserva");
        console.log("");
        console.log("4. Cancelar reserva");
        console.log("");
        console.log("5. Ver minhas reservas");
        console.log("");
        console.log("6. Sair");
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha uma opção: ")
        if(opcao == 1){
            return cliente.mudar_dados_cliente();
        }
        if(opcao == 2){
            return this.ver_lista_quartos();
        }
        if(opcao == 3){
            return cliente.fazer_reserva();
        }
        if(opcao == 4){
            return cliente.cancelar_reserva();
        }
        if(opcao == 5){
            return cliente.ver_reservas();
        }
        if(opcao == 6){
            this.usuario_logado = null; //reseta o usuario logado pra voltar pro menu principal
            console.clear();
            return voltar();
        }



    }


    menu_funcionario(funcionario){
        console.log("");
        console.log(`Bem vindo funcionário ${funcionario.nome}`);
        console.log("-------------------------------------------------------");
        console.log("1. Alterar meus dados");
        console.log("");
        console.log("2. Ver lista de quartos");
        console.log("");
        console.log("3. Ver lista de reservas");
        console.log("");
        console.log("4. Ver lista de clientes");
        console.log("");
        console.log("5. Mudar status de reserva");
        console.log("");
        console.log("6. Adicionar quarto");
        console.log("");
        console.log("7. Sair");
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha uma opção: ")
        if(opcao == 1){
            return funcionario.mudar_dados();
        }
        if(opcao == 2){
            return this.ver_lista_quartos();
        }
        if(opcao == 3){
            return funcionario.ver_lista_reservas();
        }
        if(opcao == 4){
            return funcionario.ver_lista_clientes();
        }
        if(opcao == 5){
            return funcionario.mudar_reserva();
        }
        if(opcao == 6){
            return funcionario.add_quarto();
        }
        if(opcao == 7){
            this.usuario_logado = null; //reseta o usuario logado pra voltar pro menu principal
            console.clear();
            return voltar();
        }
    }

    sair(){

        process.exit(0);

    }

    ver_lista_quartos(){ //movido para ca ao inves de ser uma func global para poder acessar usuario_logado
        console.clear();
        console.log("Lista de quartos:");
    
    if (lista_quartos.length === 0) {//se nao tiver nenhum, dá essa mensagem
        console.log("Nenhum quarto cadastrado até o momento.");
    } else {
        lista_quartos.forEach(quarto => { //vai iterar a lista, para cada quarto, chama a func de exibir informaçoes
            quarto.exibir_detalhes();
            console.log("-------------------------------------------------------");//linha divisoria entre cada quarto
        });
    }
    console.log("");
    prompt("Pressione ENTER para voltar ao menu...");//testar um input para sair, pra poder dar tempo ilimitado pro usuario ler
    console.clear();
    
    return voltar();

}

}
const Sistema = new sistema;

/* Um copia e cola de texto para testes 
if(Sistema.dev_mode == true){
    console.log("")
}
*/


//aqui algumas funcoes que eu deixei como globais ja que ambos clientes e funcionarios
//acessam, usando os id unicos para identificar


function mudar_senha(identificador){
    //algum jeito de deixar como asteristico quando digitar?
    
}

function ver_avaliacao(){
    //aqui puxar todas as avaliacoes em forma de lista para escolher qual visualizar

}

function voltar(){ //funcao global de voltar, que pode ser usado por qualquer usuario
    if (!Sistema.usuario_logado) {
        return Sistema.primeiro_menu();
    }
    if (Sistema.usuario_logado instanceof funcionario) { //verifica se o usuario atual é da classe funcionario
        return Sistema.menu_funcionario(Sistema.usuario_logado);
    }
    if (Sistema.usuario_logado instanceof cliente) { //verifica se o usuario atual é da classe cliente
        return Sistema.menu_cliente(Sistema.usuario_logado);
    }
}


class reserva{
    constructor(id, cliente, quarto, entrada, saida, noites){
        this.id = id;
        this.cliente = cliente;
        this.status = "Normal";
        this.entrada = entrada;
        this.saida = saida;
        this.noites = noites;
        this.quarto = quarto;
        this.valor = (this.quarto.preco)*(this.noites); //ja calculando o valor pelas noites vezes o preço por noite
       

    }
    cancelar(){
        this.quarto.disponivel = true; //deixa oquarto disponivel denovo
        this.status = "Cancelada."
    }
    check_out(){

        this.status = "Concluída."
    }
    avaliar_estadia(){

    }
    exibir_detalhes() { //funcao a ser chamada quando o cliente for ver as suas reservas
        console.log(`[ID Reserva: ${this.id}] Quarto ${this.quarto.numero} | Cliente: ${this.cliente.nome}`);
        console.log(`  Período: ${this.entrada} até ${this.saida} (${this.noites} noites)`);
        console.log(`  Valor Total: R$${this.valor} | Status: ${this.status}`);
    }


}

class funcionario{
    #senha; //como eu vou definir senha como um atributo privado
            //pra proteger, eu uso esse # pra deixar privado (documentaçao da internet)
    constructor(id,nome,cpf,email,senha){
        //construtor definindo os atributos basicos
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.#senha = senha;
        this.id = id;
    }
    async mudar_reserva(){
        console.clear();
        console.log("Mudar dados de uma reserva:");
        if (reservas.length === 0) {
            console.log("Nenhuma reserva cadastrada.");
            console.log("");
            prompt("Pressione ENTER para voltar...");
         return await voltar();
    }
        reservas.forEach(r => r.exibir_detalhes());//imprimindo todas as reservas
        console.log("-------------------------------------------------------");
        const idReserva = prompt("Digite o ID da reserva: ");//pede e acha a reserva
        const reservaEncontrada = reservas.find(r => r.id == idReserva);
        if (!reservaEncontrada) {
            console.clear();
            console.log("");
            console.log("Reserva não encontrada!");
            await setTimeout(1500);
            return await voltar();
        }
        console.log("");
        console.log("Status atuais: 1. Ativa | 2. Concluída (Check-out) | 3. Cancelada");
        const opcao = prompt("Escolha o novo status: ");

        if (opcao == 1) {
        reservaEncontrada.status = "Ativa";
        reservaEncontrada.quarto.disponivel = false;
        } 
        else if (opcao == 2) {
        reservaEncontrada.check_out();
        reservaEncontrada.quarto.disponivel = true;
        } 
        else if (opcao == 3) {
        reservaEncontrada.cancelar();
        } 
        else {
        console.log("Opção inválida.");
        await setTimeout(1000);
        return await voltar();
        }
        console.log("");
        console.log("Status atualizado com sucesso!");
        await setTimeout(1500);
        return await voltar();

    }

    async add_quarto(){
        console.clear();
        console.log("Cadastrando novo quarto:");

        const numero = prompt("Número do quarto (ex: 101): "); //pegando as info pra chamar construtor
        const n_camas = prompt("Quantidade de camas: ");
        const preco = prompt("Preço por noite (R$): ");
        const descricao = prompt("Descrição breve: ");
        const id = proximoIdQuarto++;

        const novoQuarto = new Quarto(id, numero, Number(n_camas), Number(preco), descricao);

        lista_quartos.push(novoQuarto); //adiciona o quarto na lista la em cima

        console.clear();
        console.log("\nQuarto cadastrado com sucesso!");
        await setTimeout(1500);
        console.clear();
        return await voltar(); //to tendo que botar esses await senao dá errado

    }

    async mudar_dados(){
        console.clear();
        console.log("Alterar meus dados:");
        console.log(`1. Nome atual: ${this.nome}`);
        console.log(`2. Email atual: ${this.email}`);
        console.log(`3. CPF atual: ${this.cpf}`);
        console.log("4. Voltar sem alterar");
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha qual dado deseja alterar: ");
            if (opcao == 1) {
                const novoNome = prompt("Digite o novo nome: ");
                if (novoNome.trim() !== "") this.nome = novoNome;
            } 
            else if (opcao == 2) {
                const novoEmail = prompt("Digite o novo email: ");
                if (novoEmail.trim() !== "") this.email = novoEmail;
            } 
            else if (opcao == 3) {
                const novoCpf = prompt("Digite o novo CPF: ");
                if (novoCpf.trim() !== "") this.cpf = novoCpf;
            } 
            else if (opcao == 4) {
                return await voltar();
            } 
            else {
                console.log("Opção inválida.");
                await setTimeout(1000);
                return await this.mudar_dados();
            }
        console.clear();
        console.log("Dados atualizados com sucesso!");
        await setTimeout(1500);
        return await voltar();
    }

    async excluir_quarto(){
        console.clear();
        console.log("Excluindo quarto:");

        if (lista_quartos.length === 0) {
            console.log("Nenhum quarto cadastrado para excluir.");
            console.log("");
            prompt("Pressione ENTER para voltar...");
            return await voltar();
        }
        lista_quartos.forEach(q => q.exibir_detalhes());//imprime todas as opcao de quarto 
        console.log("-------------------------------------------------------");

        const idQuarto = prompt("Digite o ID do quarto que deseja excluir: ");
        const index = lista_quartos.findIndex(q => q.id == idQuarto);

        if (index === -1) { //ver se esse quarto existe
            console.log("Quarto não encontrado!");
            await setTimeout(1500);
            return await voltar();
        }
        lista_quartos.splice(index, 1);//elimina o quarto

        console.clear();
        console.log("Quarto removido com sucesso!");
        await setTimeout(1500);
        return await voltar();

    }

    async editar_quartos(){
        console.clear();
        console.log("Editar quartos:");
        if (lista_quartos.length === 0) { //ver se tem algum quarto né
            console.log("Nenhum quarto cadastrado para editar.");
            console.log("");
            prompt("Pressione ENTER para voltar...");
            return await voltar();
        }
        lista_quartos.forEach(q => q.exibir_detalhes());//assumindo que quartos existam, printa eles
        console.log("-------------------------------------------------------");

        const idQuarto = prompt("Digite o ID do quarto que deseja editar: ");
        const quarto = lista_quartos.find(q => q.id == idQuarto);

        if (!quarto) {
            console.log("Quarto não encontrado!");
            await setTimeout(1500);
            return await voltar();
        }
        console.clear();
        console.log(`Editando Quarto ${quarto.numero} (Pressione ENTER sem digitar para manter o valor atual)`);
        const novoNumero = prompt(`Novo Número [${quarto.numero}]: `);
        const novoCamas = prompt(`Nova Qtd. Camas [${quarto.n_camas}]: `);
        const novoPreco = prompt(`Novo Preço [${quarto.preco}]: `);
        const novaDescricao = prompt(`Nova Descrição [${quarto.descricao}]: `);
        //aqui vou fazer dessa maneira que dá para mudar os dados do quarto mais rápido
        //sem ter que abrir o editor pra cada info que for mudar
        //ele pede input de todos, e se der enter, a string ta vazia entao continua com o valor antigo
        if (novoNumero.trim() !== "") quarto.numero = novoNumero; 
        //essa funcao trim() é pra elimicar espaço em branco
        //ficava dando espaço sem querer e deu um erro, entao botei nesse caso
        if (novoCamas.trim() !== "") quarto.n_camas = Number(novoCamas);
        if (novoPreco.trim() !== "") quarto.preco = Number(novoPreco);
        if (novaDescricao.trim() !== "") quarto.descricao = novaDescricao;

        console.clear();
        console.log("Quarto atualizado com sucesso!");
        await setTimeout(1500);
        return await voltar();


    }
    async ver_lista_clientes(){
        console.clear();
        console.log("Lista de clientes:");

        if (clientes.length === 0) {//ver se tem algum cliente
            console.log("Nenhum cliente cadastrado no sistema.");
        } 
        else { //imprime no mesmo estilo do 
            clientes.forEach(c => {
                console.log(`[ID: ${c.id}] Nome: ${c.nome} | CPF: ${c.cpf} | Email: ${c.email} | Nasc: ${c.data_nasc}`);
                console.log("-------------------------------------------------------");
            });
        }
        console.log("");
        prompt("Pressione ENTER para voltar...");
        return await voltar();

    }
    async ver_lista_funcionarios(){ //literalmente a mesma coisa do ver_lista_clientes
        console.clear();
        console.log("Lista de funcionários");

        if (funcionarios.length === 0) {
            console.log("Nenhum funcionário cadastrado no sistema.");
        } 
        else {
            funcionarios.forEach(f => {
                console.log(`[ID: ${f.id}] Nome: ${f.nome} | CPF: ${f.cpf} | Email: ${f.email}`);
                console.log("-------------------------------------------------------");
            });
        }
        console.log("");
        prompt("Pressione ENTER para voltar...");
        return await voltar();


    }
    async ver_lista_reservas(){
        console.clear();
        console.log("Todas as reservas do sistema:");
        if (reservas.length === 0) {
            console.log("Nenhuma reserva registrada até o momento.");
        }
        else {
        reservas.forEach(r => {
                r.exibir_detalhes();
                console.log("-------------------------------------------------------");
            });
        }
        console.log("");//como eh so pra ver acaba aqui mesmo
        prompt("Pressione ENTER para voltar...");
        return await voltar();

    }
    checar_Senha(senha_proposta){
        return this.#senha == senha_proposta; //verificaçao da senha, ja que é privada 
    }

}


class cliente{
    #senha; //mesmo caso do funcionario
    constructor(id,nome,cpf,data_nasc,email,senha){
        //construtor definindo os atributos basicos
        this.nome = nome;
        this.cpf = cpf;
        this.data_nasc = data_nasc;
        this.email = email;
        this.#senha = senha;
        this.id = id;
        
    }
    async fazer_reserva(){
        console.clear();
        console.log("Fazendo reserva...");

        const quartosDisponiveis = lista_quartos.filter(q => q.disponivel); //funcao para filtrar em quartos que estejam disponiveis
        //ou seja, a variavel disponivel do quarto seja = true
        //isso cria um novo array só com quartos disponiveis

        if (quartosDisponiveis.length === 0) { //se nao tiver nenhum quarto disponivel, ou seja, o novo array nao tem elementos 
            console.log("Não há quartos disponíveis no momento.");
            console.log("");
            prompt("Pressione ENTER para voltar...");
            return await voltar();
    }

        console.log("Quartos disponíveis:");
        console.log("");
        quartosDisponiveis.forEach(q => q.exibir_detalhes()); //itera cada quarto e chama a funcao para imprimir as info
        console.log("-------------------------------------------------------");

        const idQuarto = prompt("Digite o ID do quarto que deseja reservar: "); //pede o num do quarto desejado
        const quartoSelecionado = quartosDisponiveis.find(q => q.id == idQuarto);//vai buscar qual quarto foi selecionado

        if (!quartoSelecionado) {
            console.log("");
            console.log("ID de quarto inválido ou indisponível!");
            await setTimeout(1500);
            return await this.fazer_reserva();
        }
        console.log("Perfeito! Agora alguns detalhes da sua estadia:");
        const entrada = prompt("Data de Entrada (DD/MM/AAAA): ");
        const saida = prompt("Data de Saída (DD/MM/AAAA): ");
        const noites = Number(prompt("Quantidade de noites: "));

        const id = proximoIdReserva++;
        const novaReserva = new reserva(id, this, quartoSelecionado, entrada, saida, noites);


        quartoSelecionado.disponivel = false;//troca a disponibilidade do quarto
        reservas.push(novaReserva);//aloca a reserva no array de reservas
        console.clear();
        console.log("Reserva realizada com sucesso!");
        console.log(`Valor total da reserva: R$${novaReserva.valor}`);
        await setTimeout(2000);
        return await voltar();

    }
    async cancelar_reserva(){
        console.clear();
        console.log("Cancelar reserva:");
        const minhasReservasAtivas = reservas.filter(r => r.cliente.id === this.id && r.status === "Normal"); //procura reservas 
        //do cliente que estejam Normais

        if (minhasReservasAtivas.length === 0) {//se nao tiver reservas volta pro menu anterior
            console.log("Você não tem reservas ativas para cancelar.");
            console.log("");
            prompt("Pressione ENTER para voltar...");
            return await voltar();
        }
        minhasReservasAtivas.forEach(r => r.exibir_detalhes());//itera para imprimir reservas
        console.log("-------------------------------------------------------");

        const idReserva = prompt("Digite o ID da reserva que deseja cancelar: ");
        const reservaEncontrada = minhasReservasAtivas.find(r => r.id == idReserva);
        //pede qual reserva cancelar e procura ela na lista de reservas

        if (!reservaEncontrada) {
            console.clear();
            console.log("ID de reserva inválido!");
            await setTimeout(1500);
            return await voltar();
        }
        reservaEncontrada.cancelar();
        console.clear();
        console.log("Reserva cancelada com sucesso!");
        await setTimeout(1500);
        return await voltar();


    }
    async ver_reservas(){
        console.clear();
        console.log("Suas reservas:");

        const minhasReservas = reservas.filter(r => r.cliente.id === this.id);//filtra as reservas para o id desse cliente

        if (minhasReservas.length === 0) {//verifica se o cliente nao tem reservas (array do filtro vazio)
            console.log("Você ainda não possui nenhuma reserva.");
        } 
        else {
        minhasReservas.forEach(r => { //imprime cada reserva
            r.exibir_detalhes();
            console.log("-------------------------------------------------------");
            });
        }
        console.log("");
        prompt("Pressione ENTER para voltar...");
        console.clear(); //pede input para sair para dar tempo de leitura
        return await voltar();
    }

    async mudar_dados_cliente(){
        console.clear();
        console.log("Alterar meus dados:");
        console.log(`1. Nome atual: ${this.nome}`);
        console.log(`2. Email atual: ${this.email}`);
        console.log(`3. CPF atual: ${this.cpf}`);
        console.log(`4. Data de nascimento: ${this.data_nasc}`);
        console.log("5. Voltar sem alterar");
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha qual dado deseja alterar: ");
            if (opcao == 1) {
                const novoNome = prompt("Digite o novo nome: ");
                if (novoNome.trim() !== "") this.nome = novoNome;
            } 
            else if (opcao == 2) {
                const novoEmail = prompt("Digite o novo email: ");
                if (novoEmail.trim() !== "") this.email = novoEmail;
            } 
            else if (opcao == 3) {
                const novoCpf = prompt("Digite o novo CPF: ");
                if (novoCpf.trim() !== "") this.cpf = novoCpf;
            } 
            else if (opcao == 4) {
                const novaData = prompt("Digite o novo CPF: ");
                if (novaData.trim() !== "") this.data_nasc = novaData;
            } 
            else if (opcao == 5) {
                return await voltar();
            } 
            else {
                console.log("Opção inválida.");
                await setTimeout(1000);
                return await this.mudar_dados_cliente();
            }
        console.clear();
        console.log("Dados atualizados com sucesso!");
        await setTimeout(1500);
        return await voltar();

    }
    checar_Senha(senha_proposta){
        return this.#senha == senha_proposta; //verificaçao da senha, ja que é privada 
    }


}

class avaliacao{ 
    //escolhi fazer as avaliacoes como uma classe separada
    constructor(cliente, estrelas, descricao, data){
        this.autor = cliente;
        this.estrelas = estrelas;
        this.descricao = descricao;
        this.data = data;
    }
    exibir_avaliacao(){

    }

}

class Quarto{
    constructor(id, numero, n_camas, preco, descricao){
        this.id = id;
        this.n_camas = n_camas;
        this.preco = preco;
        this.numero = numero;
        this.descricao = descricao;
        this.disponivel = true; //variavel para disponibilidade, para reservas 
    }
    mudar_dados_quarto(){

    }
    exibir_detalhes() {
        const status = this.disponivel ? "Disponível" : "Ocupado"; //aqui uma maneira melhor que eu achei ao inves de usar dois if
        console.log(`[ID: ${this.id}] Quarto ${this.numero} | Camas: ${this.n_camas} | R$${this.preco}/noite | Status: ${status}`);
        console.log(`Descrição: ${this.descricao}`);
    }



}

//aqui vou colocar uns casos teste pra agilizar testagem
//se deus quiser hugo do futuro vai lembrar de tirar isso antes de mandar
const cliente_teste = new cliente(0, "b", 123, "01/01/1500", "algum_email@gmail.com", "b");
clientes.push(cliente_teste);

const funcionario_teste = new funcionario(0, "a", 124, "email@gmail.com", "a");
funcionarios.push(funcionario_teste);

const quarto_teste1 = new Quarto(proximoIdQuarto++, "101", 1, 150, "Quarto Solteiro Confortável")
lista_quartos.push(quarto_teste1);

const quarto_teste2 = new Quarto(proximoIdQuarto++, "102", 2, 280, "Quarto Casal Luxo")
lista_quartos.push(quarto_teste2);


Sistema.primeiro_menu(); //chama o primeiro menu para iniciar