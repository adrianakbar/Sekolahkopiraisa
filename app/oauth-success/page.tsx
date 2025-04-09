import { Suspense } from "react";
import OAuthSuccess from "../components/OAuthSuccess"; // atau sesuai path kamu

export default function Page() {
  return (
    <Suspense fallback={<p>Memuat...</p>}>
      <OAuthSuccess />
    </Suspense>
  );
}
