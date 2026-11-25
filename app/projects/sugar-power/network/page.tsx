import type { Metadata } from "next";
import NetworkExplorer, { type NetworkDataset } from "./NetworkExplorer";
import researchNetwork from "../network.json";

export const metadata: Metadata = {
  title: "Explore the Sugar Power Network | Civic Intelligence Lab",
  description:
    "Explore sourced relationships among U.S. sugar-policy institutions, producers, trade advocates, and economic groups. Every connection is linked to evidence.",
};

export default function SugarNetworkPage() {
  return <NetworkExplorer dataset={researchNetwork as unknown as NetworkDataset} />;
}
