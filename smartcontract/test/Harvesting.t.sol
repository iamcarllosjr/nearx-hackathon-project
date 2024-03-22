//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Harvesting} from "../src/Harvesting.sol";

import {stdError} from "forge-std/StdError.sol";
import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";

contract HarvestingTest is Test {
  mapping(address => bool) public allowList;
  mapping(address => uint256) public companyLots;
  mapping(address => mapping(uint256 => bool)) public productionLots;
  address admin = makeAddr("admin");
  address user = makeAddr("user");
  Harvesting harvesting;

  function setUp() external {
    harvesting = new Harvesting(admin);
    console.log(admin);

    vm.startPrank(admin);
    address[] memory allowed = new address[](1);
    allowed[0] = admin;
    harvesting.setAllowList(allowed);
    allowList[admin] = true;
    vm.stopPrank();
  }

  ///@notice Testando criação de novo lote [PASS]
  function testCreateProduction() public {
    vm.prank(admin);
    harvesting.createProduction(1, "xxx");
  }

  ///@notice Testando erro ao criar novo lote com um endereço que não está na lista [PASS]
  function testFailCreateProduction() public {
    vm.prank(user);
    vm.expectRevert(stdError.assertionError); //Espera que a chamada de createProduction seja revertida com o erro do contrato
    harvesting.createProduction(1, "xxx");
  }

  ///@notice Testando mudança de nome do produto [PASS]
  function testSetProductName() public {
    vm.startPrank(admin);
    harvesting.createProduction(1, "xxx");
    harvesting.setProductName(1, "xax");
    vm.stopPrank();
  }

  ///@notice Testando adicionar quantidade produzida [PASS]
  function testSetQuantityProduced() public {
    vm.startPrank(admin);
    harvesting.createProduction(1, "xxx");
    harvesting.setQuantityProduced(1, 50);
    vm.stopPrank();
  }

  ///@notice Testando chamar a função que carimba a data de saida [PASS]
  function testSetDepartureDate() public {
    vm.startPrank(admin);
    harvesting.createProduction(1, "xxx");
    harvesting.setDepartureDate(1, 45);
    vm.stopPrank();
  }

  ///@notice Testando chamar a função que carimba a data de chegada [PASS]
  function testSetArrivalDate() public {
    vm.startPrank(admin);
    harvesting.createProduction(1, "xxx");
    harvesting.setQuantityProduced(1, 50);
    harvesting.setArrivalDate(1, 50);
    vm.stopPrank();
  }
}
