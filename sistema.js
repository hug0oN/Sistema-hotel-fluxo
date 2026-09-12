const prompt = require('prompt-sync')(); //esse aqui eh o melhor jeito que eu achei para fazer input
//talvez precise instalar o prompt sync antes

class sistema{
    constructor(){ //construtor so pra uma variavel eh sacanagem
        this.dev_mode = false;
    }

    ativar_dev(){ //ativa o dev mode, que vai habilitar varias mensagens de teste
        this.dev_mode = true;
        if(Sistema.dev_mode == true){
            console.log("DEV: Modo dev ativado");
        }
    }
    
    login(){

        if(Sistema.dev_mod == true){
        console.log("DEV: Iniciando processo de login");
        }
        console.log("Você é funcionário ou cliente?");
        //aqui pesquisar alguma maneira de criar uma janela de input e multipla escolha 
        //ao inves de digitacao
        //se nao der eu uso numeros (opcao 1 2 3 etc)

        nome_login = prompt("Por favor digite seu nome de usuário: ");


        senha_login = prompt("Agora digite sua senha: ");


    }
    cadastro(){
        tipo_cadastro;
        if(Sistema.dev_mod == true){
        console.log("DEV: Iniciando processo de cadastro");
        }
        //Escolher entre funcionario e cliente

        tipo_cadastro = 1;
        
        tipo_cadastro = 2;

        //receber inputs dos dados

        //fazer o id unico

        //chamar construtor

        //ir para o menu de cliente/funcionario
    }

    menu_cliente(){


    }


    menu_funcionario(){


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

