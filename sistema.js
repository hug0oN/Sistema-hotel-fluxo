const prompt = require('prompt-sync')(); //esse aqui eh o melhor jeito que eu achei para fazer input
//talvez precise instalar o prompt sync antes

const { setTimeout } = require('node:timers/promises'); //aqui uma parte que precisa pra
//poder colocar um intervalo entre mensagens (uma funcao pra esperar)

let proximoIdFuncionario = 1;
let proximoIdCliente = 1; //aqui a parte de id dos funcionarios e clientes

let usuario_logado;

const funcionarios = [];
const clientes = [];

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
            return this.primeiro_menu();
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

            funcionarios.push(novo_funcionario); //coloa o novo cara la no array

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
        console.log("1. Ver meus dados");
        console.log("");
        console.log("2. Ver lista de quartos");
        console.log("");
        console.log("3. Fazer reserva");
        console.log("");
        console.log("4. Cancelar reserva");
        console.log("");
        console.log("5. Ver minhas reservas");
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha uma opção: ")
        if(opcao == 1){
            return ver_dados(cliente);
        }
        if(opcao == 2){
            return ver_lista_quartos();
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



    }


    menu_funcionario(funcionario){
        console.log("");
        console.log(`Bem vindo funcionário ${funcionario.nome}`);
        console.log("-------------------------------------------------------");
        console.log("1. Ver meus dados");
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
        console.log("-------------------------------------------------------");
        const opcao = prompt("Escolha uma opção: ")
        if(opcao == 1){
            return ver_dados(funcionario);
        }
        if(opcao == 2){
            return ver_lista_quartos();
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
    }

    sair(){
        process.exit(0);
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

function ver_dados(identificador){

}

function ver_avaliacao(){
    //aqui puxar todas as avaliacoes em forma de lista para escolher qual visualizar

}

function ver_lista_quartos(){
    //puxar todos os quartos em uma lista

}

function voltar(){ //funcao global de voltar, que pode ser usado por qualquer usuario
    if (!this.usuario_logado) {
        return this.primeiro_menu();
    }
    if (this.usuario_logado instanceof funcionario) { //verifica se o usuario atual é da classe funcionario
        return this.menu_funcionario();
    }
    if (this.usuario_logado instanceof cliente) { //verifica se o usuario atual é da classe cliente
        return this.menu_cliente();
    }
}


class reserva{
    constructor(cliente, entrada, saida){
        this.cliente = cliente;
        this.status = "Normal";
        this.entrada = entrada;
        this.saida = saida;
        //parte para a construcao do id unico
        //id unicos sao compartilhados entre funcionarios e clientes
        //o q vai facilitar pra chamar funcoes globais

    }
    cancelar(){

        this.status = "Cancelada."
    }
    check_out(){

        this.status = "Concluída."
    }
    avaliar_estadia(){

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
    mudar_reserva(){

    }
    add_quarto(){

    }
    mudar_dados(){

    }
    excluir_quarto(){

    }
    editar_quartos(){

    }
    ver_lista_clientes(){

    }
    ver_lista_funcionarios(){

    }
    ver_lista_reservas(){

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
    fazer_reserva(){

    }
    cancelar_reserva(){

    }
    ver_reservas(){

    }
    mudar_dados_cliente(){

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

class quartos{
    constructor(n_camas, preco, nome, descricao){
        this.n_camas = n_camas;
        this.preco = preco;
        this.nome = nome;
        this.descricao = descricao;
    }
    mudar_dados_quarto(){

    }



}

Sistema.primeiro_menu();

