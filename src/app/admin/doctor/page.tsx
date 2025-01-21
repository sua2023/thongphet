import dynamic from "next/dynamic";
import AllDoctors from "./allDoctor";
const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: false,
});
export default function DoctorPage() {
  
  return (
    <Layout>
      <AllDoctors />
    </Layout>
  );
}
