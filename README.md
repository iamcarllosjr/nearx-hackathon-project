# AgroSync - Plataforma de Rastreio de Produções Agrícolas Através da Blockchain
- Vídeo explicativo : https://www.loom.com/share/660dd5cdf9b6499fbcd499df3ab46463
- Site em produção : https://dapp-lilac-three.vercel.app/defi
- Contrato verificado : https://sepolia-optimism.etherscan.io/address/0x58fda51449837ac04f9543329e1edfb66326ccbd#code

## Supply Chain Management 
- Este é um exemplo de aplicação da tecnlogia Blockchain para gerenciar a cadeia de suprimentos agrícolas, oferencendo várias vantagens :

### Transparência : 
- Permitindo que todas as transações sejam registradas de forma imutável, criando um histórico de rastreamento que pode ser verificado por todos os envolvidos no processo. Isso é crucial para garantir a autenticidade dos produtos e a conformidade com as normas de qualidade e segurança alimentar.

### Segurança : 
-  A segurança é uma das principais vantagens da blockchain. Uma vez que os dados são registrados na blockchain, eles não podem ser alterados ou apagados. Isso ajuda a prevenir fraudes e garantir a integridade dos dados ao longo da cadeia de suprimentos.

### Eficiência : 
- Ao automatizar o processo de rastreamento e verificação, a blockchain pode reduzir significativamente o tempo e os custos associados à gestão da cadeia de suprimentos. Isso pode resultar em economias significativas para os produtores, fornecedores e consumidores.

### Responsabilidade : 
- A blockchain permite que cada parte da cadeia de suprimentos tenha uma responsabilidade clara e definida. Isso pode ajudar a prevenir práticas negativas, como o uso de ingredientes não declarados ou a manipulação de produtos.

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
