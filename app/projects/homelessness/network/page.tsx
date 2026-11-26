import type { Metadata } from "next";
import NetworkExplorer, { type NetworkDataset } from "./NetworkExplorer";
import network from "../network.json";

export const metadata: Metadata = {
  title: "Explore the Homelessness Network | Civic Intelligence Lab",
  description: "Explore source-backed public funding, governance, service-provider, and oversight connections in Alameda County's homelessness response system.",
};

export default function HomelessnessNetworkPage() {
  return <NetworkExplorer dataset={network as unknown as NetworkDataset} />;
}
