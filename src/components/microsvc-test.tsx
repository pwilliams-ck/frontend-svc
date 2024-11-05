"use client";

import Link from "next/link";
import { useState } from "react";

export default function MicroservicesTest() {
  const [output, setOutput] = useState<JSX.Element[]>([]);
  const [sent, setSent] = useState("Nothing sent yet...");
  const [received, setReceived] = useState("Nothing received yet...");

  const updateOutput = (message: string, isError = false) => {
    const timestamp = new Date().toLocaleTimeString();
    setOutput((prev) => [
      ...prev,
      <div
        key={timestamp}
        className={`mb-2 ${isError ? "text-red-400" : "text-green-400"}`}
      >
        <span className="text-gray-500">[{timestamp}]</span> {message}
      </div>,
    ]);
  };

  const handleBroker = async () => {
    const body = {
      method: "POST",
    };

    try {
      const response = await fetch("http://localhost:8080", body);
      const data = await response.json();

      setSent("Empty post request");
      setReceived(JSON.stringify(data, undefined, 4));

      if (data.error) {
        console.log(data.message);
      } else {
        updateOutput(`Response from logger service: ${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        updateOutput(`Error: ${error.message}`, true);
      } else {
        updateOutput(`Unknown error occurred`, true);
      }
    }
  };

  const handleAuth = async () => {
    const payload = {
      action: "auth",
      auth: {
        email: "admin@example.com",
        password: "verysecret",
      },
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    };

    try {
      const response = await fetch("http://localhost:8080/handle", body);
      const data = await response.json();

      setSent(JSON.stringify(payload, undefined, 4));
      setReceived(JSON.stringify(data, undefined, 4));

      if (data.error) {
        updateOutput(`Error: ${data.message}`, true);
      } else {
        updateOutput(`Response from authentication service: ${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        updateOutput(`Error: ${error.message}`, true);
      } else {
        updateOutput(`Unknown error occurred`, true);
      }
    }
  };

  const handleLog = async () => {
    const payload = {
      action: "log",
      log: {
        name: "event",
        data: "Some kind of data",
      },
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers,
    };

    try {
      const response = await fetch("http://localhost:8080/handle", body);
      const data = await response.json();

      setSent(JSON.stringify(payload, undefined, 4));
      setReceived(JSON.stringify(data, undefined, 4));

      if (data.error) {
        updateOutput(`Error: ${data.message}`, true);
      } else {
        updateOutput(`Response from broker service: ${data.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        updateOutput(`Error: ${error.message}`, true);
      } else {
        updateOutput(`Unknown error occurred`, true);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="row">
        <div className="col">
          <h1 className="text-3xl font-bold mt-5">Test Microservices</h1>
          <hr className="my-4" />

          <div className="space-x-4">
            <button
              id="brokerBtn"
              onClick={handleBroker}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Test Broker
            </button>

            <button
              id="authBrokerBtn"
              onClick={handleAuth}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Test Auth
            </button>

            <button
              id="logBtn"
              onClick={handleLog}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
            >
              Test Log
            </button>
          </div>

          <div className="mt-5 border border-gray-300 p-8" id="output">
            {output.length === 0 ? (
              <span className="text-gray-500">Output shows here...</span>
            ) : (
              output
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="text-xl font-semibold mt-5">Sent</h4>
          <div className="mt-1 border border-gray-300 p-8">
            <pre id="payload">
              <span className="text-gray-500">{sent}</span>
            </pre>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mt-5">Received</h4>
          <div className="mt-1 border border-gray-300 p-8">
            <pre id="received">
              <span className="text-gray-500">{received}</span>
            </pre>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-200 py-8">
        <div className="text-center">
          <small className="text-gray-500">
            Runs on{" "}
            <Link className="text-sky-600" href="cloudkey.io">
              Cloudkey.io
            </Link>
          </small>
        </div>
      </footer>
    </div>
  );
}
