# Sistema de Hotel — F-Luxo

## Descrição

Sistema simples de um Hotel (F-Luxo) com funcionalidades de login/cadastro, reservas, criação/alocação de quartos e avaliações.

## Estrutura do Código

O código é 100% Javascript, tudo em um mesmo arquivo (por questão de simplicidade, que foi pedido): `sistema.js`.

O código é estruturado com as classes pedidas (`cliente`, `funcionario`, `reserva`, `quarto`, `sistema`), além da classe de avaliação (marcada como opcional).

Todas as classes possuem um array de elementos declarado no topo do código (exceto `sistema`, que só precisa de um objeto, por ser o sistema).

## Identificação dos Objetos

Para os objetos que requerem um ID único para identificação (por coincidência, também todos menos `sistema`), é usado um método incremental, onde o primeiro objeto criado terá `ID = 1`, o segundo `ID = 2`, e assim por diante.

## Dependências

Foi necessário para o código também importar um módulo fora da biblioteca base do Javascript (pelo menos, eu não tinha) que é o `prompt`, usado para receber input do terminal.

Para instalar o `prompt`, é necessário rodar no terminal:


npm install prompt-sync


Além disso, no topo do código, há uma constante especial, `setTimeout`, usada para forçar pausas (intervalos) na execução do código. Esse recurso é nativo, sem necessidade de instalar nada.

## Função Global

Existe uma única função global, `voltar()`, que é usada para retornar o usuário para o seu respectivo menu, de qualquer ponto do código.

## Variáveis de Teste

Existem também variáveis de teste, que deixei comentadas: o funcionário `"a"` e o cliente `"b"`, além de dois quartos.

## Execução

Por último, vem a chamada do primeiro menu do sistema.
