import PurchaseComponent from "@/components/PurchaseComponent";
import TopNav from "@/components/TopNav";
import { Suspense } from "react";

export default async function Purchase() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopNav />
      <PurchaseComponent />
    </Suspense>
  );
}
