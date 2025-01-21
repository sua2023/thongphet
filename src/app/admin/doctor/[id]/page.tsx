import dynamic from "next/dynamic";
const Layout = dynamic(() => import("@/components/Layout"), {
  ssr: true,
});
const MainDoctor = dynamic(() => import("../mainDotor"), {
  ssr: true,
});
export default function DoctorPage() {
  
  return (
    <Layout>
      <MainDoctor />
    </Layout>
  );
}
