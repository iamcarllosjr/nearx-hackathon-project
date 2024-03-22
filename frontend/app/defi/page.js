"use client";
import Head from "next/head";
import { useState } from "react";
import { ethers } from "ethers";

import {
  createProduction,
  setProductName,
  setQuantityProduced,
  setDepartureDate,
  setArrivalDate,
  getProductionByNumber,
  getProductionsByCompany,
} from "@/services/Harvesting.services";

import { GenericModal } from "../components";
import {
  formatTimestampDataHora,
  formatarDataHora,
} from "../utils";

export default function Defi() {
  //Modals State
  const [showModal, setShowModal] = useState(false);
  const [showModalNewProductName, setShowModalNewProductName] = useState(false);
  const [showModalSetQuantityProduced, setShowModalSetQuantityProduced] =
    useState(false);
  const [showModalSetDepartureDate, setShowModalSetDepartureDate] =
    useState(false);
  const [showModalSetArrivalDate, setShowModalSetArrivalDate] = useState(false);

  //Local State
  const [prodNumber, setProdNumber] = useState("");
  const [prodName, setProdName] = useState("");

  const [pdtNumber, setPdtNumber] = useState("");
  const [pdtName, setPdtName] = useState("");

  const [qtdNumber, setQtdNumber] = useState("");
  const [qtd, setQtd] = useState("");

  const [depDateNumber, setDepDateNumber] = useState("");
  const [depDate, setDepDate] = useState("");

  const [arrDateNumber, setArrDateNumber] = useState("");
  const [arrDate, setArrDate] = useState("");

  const [productionsByCompany, setProductionsByCompany] = useState([]);
  const [addressCompany, setAddressCompany] = useState("");

  const [productionsByNumber, setProductionsByNumber] = useState([]);
  const [addressWallet, setAddressWallet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");

  const [message, setMessage] = useState("");

  const handleCreateProduction = async () => {
    try {
      await createProduction(prodNumber, prodName);
      setMessage("Production created successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create production: " + error.message);
    }
  };

  const handleSetProductName = async () => {
    try {
      await setProductName(pdtNumber, pdtName);
      setMessage("Product Name successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create product: " + error.message);
    }
  };

  const handleSetQuantityProduced = async () => {
    try {
      await setQuantityProduced(qtdNumber, qtd);
      setMessage("Qtd Product successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create qtd product: " + error.message);
    }
  };

  const handleSetDepartureDate = async () => {
    try {
      await setDepartureDate(depDateNumber, depDate);
      setMessage("Departure date set successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to set departure date: " + error.message);
    }
  };

  const handleSetArrivalDate = async () => {
    try {
      await setArrivalDate(arrDateNumber, arrDate);
      setMessage("Arrival date set successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to set arrival date: " + error.message);
    }
  };

  const listProductionsByCompany = async (address) => {
    try {
      const result = await getProductionsByCompany(address);
      setProductionsByCompany(result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch productions: " + error.message);
    }
  };

  const listProductionByNumber = async (address, productionNumber) => {
    try {
      const result = await getProductionByNumber(address, productionNumber);

      setProductionsByNumber(result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch productions: " + error.message);
    }
  };

  const TableListCompany = () => {
    if (productionsByCompany?.length > 0) {
      return productionsByCompany.map((production, index) => (
        <tr key={index}>
          <td>{production?.company}</td>
          <td>{production?.productName}</td>
          <td>
            {formatTimestampDataHora(
              ethers.BigNumber.from(production?.harvest).toString()
            )}
          </td>
          <td>
            {ethers.BigNumber.from(production?.productionNumber).toNumber()}
          </td>
          <td>
            {ethers.BigNumber.from(production?.quantityProduced).toNumber()}
          </td>
          <td>{formatarDataHora(production?.DepartureDate)}</td>
          <td>{formatarDataHora(production?.ArrivalDate)}</td>
        </tr>
      ));
    } else {
      return (
        <div>
          <p>No result</p>
        </div>
      );
    }
  };

  const TableListNumber = () => {
    console.log(productionsByNumber);
    if (productionsByNumber?.length > 0) {
      return (
        <tr>
          <td>{productionsByNumber?.company}</td>
          <td>{productionsByNumber?.productName}</td>
          <td>
            {formatTimestampDataHora(
              ethers.BigNumber.from(productionsByNumber?.harvest).toString()
            )}
          </td>
          <td>
            {ethers.BigNumber.from(
              productionsByNumber?.productionNumber
            ).toNumber()}
          </td>
          <td>
            {ethers.BigNumber.from(
              productionsByNumber?.quantityProduced
            ).toNumber()}
          </td>
          <td>
            {formatarDataHora(productionsByNumber?.DepartureDate)}
          </td>
          <td>{formatarDataHora(productionsByNumber?.ArrivalDate)}</td>
        </tr>
      );
    } else {
      return (
        <div>
          <p>No result</p>
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Web Depp AgroSync - Create</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="d-flex flex-column justify-content-center">
        <h1 className="display-10 fw-bold text-body-emphasis lh-1 mb-3 text-center">
          Dashboard Web Depp AgroSync
        </h1>
      </div>

      <br />

      <div className="d-flex justify-content-around">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Production
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalNewProductName(true)}
        >
          Add Product Name
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetQuantityProduced(true)}
        >
          Add Qtd Produced
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetDepartureDate(true)}
        >
          Add Departure Date
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetArrivalDate(true)}
        >
          Add Arrival Date
        </button>
      </div>

      <GenericModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={handleCreateProduction}
        title="Production Name"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="prodNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="prodNumber"
              value={prodNumber}
              onChange={(e) => setProdNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prodName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control col-12"
              id="prodName"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalNewProductName}
        setShowModal={setShowModalNewProductName}
        onSubmit={handleSetProductName}
        title="Product Name"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="pdtNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="pdtNumber"
              value={pdtNumber}
              onChange={(e) => setPdtNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pdtName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="pdtName"
              value={pdtName}
              onChange={(e) => setPdtName(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetQuantityProduced}
        setShowModal={setShowModalSetQuantityProduced}
        onSubmit={handleSetQuantityProduced}
        title="Quantity Produced"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="qtdNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="qtdNumber"
              value={qtdNumber}
              onChange={(e) => setQtdNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qtd" className="form-label">
              Quantity:
            </label>
            <input
              type="text"
              className="form-control"
              id="qtd"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetDepartureDate}
        setShowModal={setShowModalSetDepartureDate}
        onSubmit={handleSetDepartureDate}
        title="Departure Date"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="depDateNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="depDateNumber"
              value={depDateNumber}
              onChange={(e) => setDepDateNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="depDate" className="form-label">
              Quantity:
            </label>
            <input
              type="text"
              className="form-control"
              id="depDate"
              value={depDate}
              onChange={(e) => setDepDate(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetArrivalDate}
        setShowModal={setShowModalSetArrivalDate}
        onSubmit={handleSetArrivalDate}
        title="Arrival Date"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="arrDateNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="arrDateNumber"
              value={arrDateNumber}
              onChange={(e) => setArrDateNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="arrDate" className="form-label">
              Amount:
            </label>
            <input
              type="text"
              className="form-control"
              id="arrDate"
              value={arrDate}
              onChange={(e) => setArrDate(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <br />
      <br />
      <br />

      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <input
            type="text"
            id="productionSearch"
            className="form-control form-control-sm me-2"
            style={{ width: "500px" }}
            placeholder="Enter Address"
            value={addressCompany}
            onChange={(e) => setAddressCompany(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => listProductionsByCompany(addressCompany)}
            style={{ verticalAlign: "middle" }}
          >
            Search
          </button>
        </div>
      </div>

      <br />

      <div
        className="table-responsive mt-2"
        style={{ width: "90%", margin: "0 auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Product Name</th>
              <th>Harvest</th>
              <th>Production Number</th>
              <th>Quantity Produced</th>
              <th>Departure Date</th>
              <th>Arrival Date</th>
            </tr>
          </thead>
          <tbody>
            <TableListCompany />
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <input
            type="text"
            id="productionSearch"
            className="form-control form-control-sm me-2"
            style={{ width: "200px" }}
            placeholder="Enter Address"
            value={addressWallet}
            onChange={(e) => setAddressWallet(e.target.value)}
          />
          <input
            type="text"
            id="productionSearch"
            className="form-control form-control-sm me-2"
            style={{ width: "200px" }}
            placeholder="Enter Number"
            value={addressNumber}
            onChange={(e) => setAddressNumber(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => listProductionByNumber(addressWallet, addressNumber)}
            style={{ verticalAlign: "middle" }}
          >
            Search
          </button>
        </div>
      </div>

      <br />

      <div
        className="table-responsive mt-2"
        style={{ width: "90%", margin: "0 auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Product Name</th>
              <th>Harvest</th>
              <th>Production Number</th>
              <th>Quantity Produced</th>
              <th>Departure Date</th>
              <th>Arrival Date</th>
            </tr>
          </thead>
          <tbody>
            <TableListNumber />
          </tbody>
        </table>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          &copy; 2024 Web Depp AgroSync, Inc
        </p>
        <ul className="nav col-md-4 justify-content-end ">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Back Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/web-depp"
              className="nav-link px-2 text-body-secondary"
            >
              GitHub
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
