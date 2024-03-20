# AgroSync - Plataforma de Rastreio de Produções Agrícolas Através da Blockchain

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
