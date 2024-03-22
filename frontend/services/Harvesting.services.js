import { ethers } from "ethers";
import ABI from "./ABI.json";

debugger;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const GAS_LIMIT = 600000;

export async function doLogin() {
  try {
    if (typeof window.ethereum === "undefined")
      throw new Error("No Ethereum provider found.");

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    const accounts = await provider.listAccounts();
    if (!accounts || !accounts.length)
      throw new Error("Wallet has no accounts.");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
  } catch (error) {
    throw new Error("Failed to login: " + error.message);
  }
}

export async function createProduction(productionNumber, productName) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.createProduction(
        productionNumber,
        productName,
        {
          gasLimit: GAS_LIMIT,
        }
      );
      if (result) {
        alert(
          "Production created successfully! \n Transaction: " + result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to create production: " + error.message);
  }
}

export async function setProductName(productionNumber, newProductName) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.setProductName(
        productionNumber,
        newProductName,
        {
          gasLimit: GAS_LIMIT,
        }
      );
      if (result) {
        alert(
          "Product Name created successfully! \n Transaction: " + result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to set product name: " + error.message);
  }
}

export async function setQuantityProduced(productionNumber, quantityProduced) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.setQuantityProduced(
        productionNumber,
        quantityProduced
      );
      if (result) {
        alert(
          "Quantity Produced created successfully! \n Transaction: " +
            result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to set quantity produced: " + error.message);
  }
}

export async function setDepartureDate(productionNumber, quantitySent) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.setDepartureDate(
        productionNumber,
        quantitySent
      );
      if (result) {
        alert(
          "Departure Date created successfully! \n Transaction: " + result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to set departure date: " + error.message);
  }
}

export async function setArrivalDate(productionNumber, amountReceived) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.setArrivalDate(
        productionNumber,
        amountReceived
      );
      if (result) {
        alert(
          "Arrival Date created successfully! \n Transaction: " + result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to set arrival date: " + error.message);
  }
}

export async function setAllowList(addresses) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.contractsetAllowList(addresses);
      if (result) {
        alert(
          "Allow List created successfully! \n Transaction: " + result?.hash
        );
      }
    }
  } catch (error) {
    throw new Error("Failed to set allow list: " + error.message);
  }
}

export async function getProductionsByCompany(companyAddress) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.getProductionsByCompany(companyAddress);
      if (!result?.length > 0) {
        alert("No productions found for this company");
      }

      return result;
    }
  } catch (error) {
    throw new Error("Failed to get productions by company: " + error.message);
  }
}

export async function getProductionByNumber(companyAddress, productionNumber) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.getProductionByNumber(
        companyAddress,
        productionNumber
      );
      if (!result?.length > 0) {
        alert("No productions found for this company");
      }
      return result;
    }
  } catch (error) {
    throw new Error("Failed to get production by number: " + error.message);
  }
}

export async function removeAddressList(addresses) {
  try {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const result = await contract.removeAddressList(addresses);
      if (result) {
        alert("Address removed successfully!");
      }
      return result;
    }
  } catch (error) {
    throw new Error("Failed to remove address list: " + error.message);
  }
}
