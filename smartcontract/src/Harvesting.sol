//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Harvesting is Ownable {
  constructor(address initialOwner) Ownable(initialOwner) {}

  ///@title Contrato para resgitro de produções agrícolas
  ///@notice Este contrato registra = Colheita > Produção > Transporte > Entrega
  ///@notice 1 - Colheita : Registra dia e horario que foi feito a colheita
  ///@notice 2 - Produção : Registra a quantidade que foi produzida após a colheita
  ///@notice 3 - Transporte : Registra dia e horario que saiu para entrega
  ///@notice 4 - Entrega : Registra dia e horario que foi feita a entrega

  ///@dev Alterar mappings private para public afim de testes
  mapping(uint256 => Production) private productions;
  mapping(address => uint256[]) private companyLots;
  mapping(address => mapping(uint256 => bool)) private productionLots;
  mapping(address => bool) public allowListAddress;

  ///@notice Events
  event EventHarvest(string indexed productName, uint256 data);
  event EventProduction(uint256 productionNumber, uint256 quantityProduced, uint256 data);
  event EventDepartureDate(uint256 indexed productionNumber, uint256 quantitySent_, uint256 data);
  event EventArrivalDate(uint256 productionNumber, uint256 amountReceived, uint256 data);

  ///@notice  Custom Errors
  error ProductionNumberExist();
  error LotNotFoundOrNotTheOwner();
  error NotAuthorized();
  error ProductionNotFound();
  error NotTheOwner();
  error ArrayisEmpty();
  error InvalidAddress();
  error NoProductionsAvailabe();

  ///@notice Estrutura de dados do produto
  struct Production {
    address company;
    string productName;
    uint256 harvest;
    uint256 productionNumber;
    uint256 quantityProduced;
    uint256 DepartureDate;
    uint256 ArrivalDate;
  }

  ///@notice Modifier para Verificar se o endereço que chama a função está na lista de permissões
  modifier isAllowList() {
    if (!allowListAddress[msg.sender]) {
      revert NotAuthorized();
    }
    _;
  }

  ///@notice Modifier para verificar se quem chama a função é owner de alguma produção
  modifier isProductionOwner(uint256 productionNumber_) {
    if (productions[productionNumber_].productionNumber != productionNumber_) {
      revert ProductionNotFound();
    }

    if (productions[productionNumber_].company != msg.sender) {
      revert NotTheOwner();
    }
    _;
  }

  ///@notice Esta função adiciona um novo lote de produtos
  ///@notice Pode registrar lotes para outros endereços
  ///@notice Verifica se o novo lote já está existe no endereço
  ///@notice Se o lote não existir, cria um novo lote e adiciona no array da struct
  ///@notice Incrementa o número de lotes criados pelo endereço no mapping
  ///@notice Modifica o numero do lote criado para true, assim evita numeros de lotes repetidos
  function createProduction(uint256 productionNumber_, string calldata productName_) public isAllowList {
    if (productionLots[msg.sender][productionNumber_]) {
      revert ProductionNumberExist();
    }

    Production memory newProduction = Production({
      company: msg.sender,
      productionNumber: uint256(productionNumber_),
      productName: productName_,
      harvest: block.timestamp,
      quantityProduced: 0,
      DepartureDate: 0,
      ArrivalDate: 0
    });

    productions[productionNumber_] = newProduction;

    companyLots[msg.sender].push(productionNumber_);
    productionLots[msg.sender][productionNumber_] = true;

    emit EventHarvest(productName_, block.timestamp);
  }

  ///@notice Esta função alterar nome do produto dentro na sctruct
  function setProductName(uint256 productionNumber_, string memory newProductName_) public isAllowList isProductionOwner(productionNumber_) {
    productions[productionNumber_].productName = newProductName_;
  }

  ///@notice Esta função adiciona uma quantidade produzido após a colheita
  function setQuantityProduced(uint256 productionNumber_, uint256 quantityProduced_) public isAllowList isProductionOwner(productionNumber_) {
    productions[productionNumber_].quantityProduced += quantityProduced_;
    emit EventProduction(productionNumber_, quantityProduced_, block.timestamp);
  }

  ///@notice Esta função registra a data de saida para entrega
  function setDepartureDate(uint256 productionNumber_, uint256 quantitySent_) public isAllowList isProductionOwner(productionNumber_) {
    productions[productionNumber_].DepartureDate = block.timestamp;
    emit EventDepartureDate(productionNumber_, quantitySent_, block.timestamp);
  }

  ///@notice Esta função registra a data de chegada do produto
  function setArrivalDate(uint256 productionNumber_, uint256 amountReceived_) public isAllowList isProductionOwner(productionNumber_) {
    productions[productionNumber_].ArrivalDate = block.timestamp;
    emit EventDepartureDate(productionNumber_, amountReceived_, block.timestamp);
  }

  ///@dev As únicas funções que uma pessoa que não é proprietário de uma produção deve chamar são as funções de retornos (view)
  ///@notice Esta função retorna todos os produtos de um endereço
  function getProductionsByCompany(address company) public view returns (Production[] memory) {
    uint256[] memory productionNumbers = companyLots[company];

    if(productionNumbers.length == 0) {
      revert NoProductionsAvailabe();
    }
    
    Production[] memory companyProductions = new Production[](productionNumbers.length);

    for (uint256 i = 0; i < productionNumbers.length;) {
      unchecked {
        companyProductions[i] = productions[productionNumbers[i]];
        i++;
      }
    }

    return companyProductions;
  }

  ///@notice Esta função retorna informações detalhadas sobre uma produção específica de um endereço
  function getProductionByNumber(address company, uint256 productionNumber) public view returns (Production memory) {
    // Verifica se o número de produção existe para a empresa especificada
    require(productionLots[company][productionNumber], "ProductionNumberNotFound");

    // Retorna a produção especificada
    return productions[productionNumber];
  }

  ///@notice Esta função adiciona e autorizar endereços na lista de permissões
  function setAllowList(address[] calldata addresses_) external onlyOwner {
    if (addresses_.length == 0) {
      revert ArrayisEmpty();
    }

    for (uint256 i = 0; i < addresses_.length; i++) {
      if (addresses_[i] == address(0)) {
        revert InvalidAddress();
      }
      allowListAddress[addresses_[i]] = true;
    }
  }

  ///@notice Função para remover um address da lsita de  permissões
  function removeAddressList(address[] calldata addresses_) external onlyOwner {
    if (addresses_.length == 0) {
      revert ArrayisEmpty();
    }

    for (uint256 i = 0; i < addresses_.length; i++) {
      if (addresses_[i] == address(0)) {
        revert InvalidAddress();
      }
      allowListAddress[addresses_[i]] = false;
    }
  }

}
