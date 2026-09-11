const 



class sistema{


    login(){

    }
    cadastro(){

    }

    sair(){
        process.exit(0);
    }

}
const Sistema = new sistema;

/* Um copia e cola de texto pra testes 
if(Sistema.dev_mode == "true"){
    console.log("")
}
*/

function mudar_senha(identificador){
        
    }

function ver_dados(identificador){

}

class reserva{
    constructor(cliente, status, entrada, saida){
        this.cliente = cliente;
        this.status = status;
        this.entrada = entrada;
        this.saida = saida;
        //parte para a construcao do id unico


    }
    cancelar(){

        this.status = "Cancelada."
    }
    check_out(){

        this.status = "Concluída."
    }


}

class funcionario{
    #senha; //como eu vou definir senha como um atributo privado
            //pra proteger, eu uso esse # pra deixar privado (documentaçao da internet)
    constructor(nome,cpf,email,senha){
        //construtor definindo os atributos basicos
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.#senha = senha;
        //aqui entra a parte de id unico

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


}


class cliente{
    #senha; //mesmo caso do funcionario
    constructor(nome,cpf,data_nasc,email,senha){
        //construtor definindo os atributos basicos
        this.nome = nome;
        this.cpf = cpf;
        this.data_nasc = data_nasc;
        this.email = email;
        this.#senha = senha;
        //aqui entra a parte de id unico
        
    }
    fazer_reserva(){

    }
    cancelar_reserva(){

    }
    ver_reservas(){

    }
    mudar_dados(){

    }
    avaliar_estadia(){

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


}

class quartos{
    constructor(n_camas, preco, nome, descricao){
        this.n_camas = n_camas;
        this.preco = preco;
        this.nome = nome;
        this.descricao = descricao;
    }



}

