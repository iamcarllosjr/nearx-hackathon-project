//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {Harvesting} from "../src/Harvesting.sol";
import {Script} from "forge-std/Script.sol";

contract DeployHarvesting is Script {
  address owner = 0xA5216C6F685c2b8a678A704107760Be652665234;

  function run() public {
    vm.startBroadcast();
    new Harvesting(owner);
    vm.stopBroadcast();
  }
}
