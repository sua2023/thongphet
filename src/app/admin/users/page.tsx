import dynamic from "next/dynamic";
const Layout = dynamic(() => import("@/components/Layout"));
const AllStaff = dynamic(() => import("@/app/admin/users/staff/allStaff"));
export default function DoctorPage() {
  return (
    <Layout>
      <AllStaff />
    </Layout>
  );
}
