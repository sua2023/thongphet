import dynamic from "next/dynamic";
import TimeTable from "./timeTable";

const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: false,
});
export default function DoctorPage() {
  return (
    <Layout>
      <TimeTable />
    </Layout>
  );
}
