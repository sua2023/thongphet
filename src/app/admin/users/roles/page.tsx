import dynamic from "next/dynamic";
import Roles from "./roles";
const Layout = dynamic(() => import("@/components/Layout"));

export default function page() {
  return (
    <Layout>
      <Roles />
    </Layout>
  );
}
