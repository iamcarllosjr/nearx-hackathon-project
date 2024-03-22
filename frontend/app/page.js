"use client";
import Head from "next/head";
import { useState } from "react";
import { doLogin } from "@/services/Harvesting.services";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  const [message, setMessage] = useState("");

  const btnLoginClick = async () => {
    try {
      await doLogin();
      setMessage("Carregando...");
      setTimeout(() => {
        push("/defi");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Web Depp AgroSync - Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://media.istockphoto.com/id/1294890443/pt/foto/smart-farmer-holding-smartphone-rice-fields-production-control-concept-agricultural-product.jpg?s=1024x1024&w=is&k=20&c=GcTGlZZBuHG_mnSJO3KQ3h4zZc1pmzFLwjBYDITqQqg="
              className="d-block mx-lg-auto img-fluid"
              alt="Image AgroSync"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-8 fw-bold text-body-emphasis lh-1 mb-3">
              Web Depp AgroSync
            </h1>
            <p className="lead">On-chain AgroSync</p>
            <p className="lead mb-3">
              Authenticate with your wallet and leave your vote
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4"
                onClick={btnLoginClick}
              >
                <img
                  className="me-3"
                  src="/metamask.svg"
                  alt="Metamask"
                  width="64"
                  height="64"
                />
                Connect with MetaMask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
        </div>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          &copy; 2024 Web Depp AgroSync, Inc
        </p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Home
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
