# AgroSync - Plataforma de Rastreio de Produções Agrícolas Através da Blockchain
Vídeo explicativo : https://www.loom.com/share/8ff4f005ae0349d7967ff6fdac737d00
Site em produção : https://dapp-lilac-three.vercel.app/defi

## Resumo do SmartContract

- Este contrato atua como forma de rastreio em cada etapa de uma produção agrícola, desde sua colheita, checagem de produção, envio, e chegada ao destino final.

- Permite um endereço adicionar e atualizar dados de uma produção.

- Para que um endereço consiga adicionar uma produção, e atualizar os dados, ele precisa primeiro estar em uma lista de permissões onde só o proprietário do contrato tem acesso.

- Ao criar uma produção, o usuário (que está na lista) precisa passar um numéro de identificador do produto e o seu nome.

- Quando o usuário por fim, chama a função createProduction, primeiro é feita a checagem se o número de identificador já existe associado ao endereço chamador, se exitir, um erro chamado ProductNumberExist é ativado.

- Prosseguindo com a criação, então é adicionado o novo produto ao mapping de produções, junto com seu número identificador, e alterando esse número para true, para que não possa existir outro número de identificador de produto igual a este. Em seguida, emite um evento de colheita, com o nome do produto, e o carimbo de data e hora.

## Funções

- As funções `setProductName`, `setQuantityProduced`, `setDepartureDate`, `setArrivalDate`, estão restritas a apenas para usuários da lista de permissões, e que exista alguma produção criada. Cujo número de identificador é usado como parâmetro para chamada destas funções.

- As funções `getProductionsByCompany` e `getProductionByNumber`são publicas e qualquer pessoa pode chamar-las, para retornar dados de produções.

## Fluxo de interação do usuário na UI/UX

- Ao entrar no site da AgroSync, o usuário deve conectar sua carteira, lembrando que deve ser na rede de teste da Optimsm, a OP Sepolia.

- Como adicionar a rede de teste da Optimism https://chainlist.org/chain/11155420

- Ao se conectar, o usuário terar as opçoes de adicionar uma produção, editar, adicionar quantidade produzida, atualizar datas de envio e de recebimento do produto para seu destino.

- Só pode criar uma nova produção, um endereço que está na alloList, onde somente o prorpretário do contrato tem acesso (questão de segunrança)

- Após ser criada, o usuário pode vê-las no painel de busca, passando os paramêtros pedidos, para retornar seus produtos
