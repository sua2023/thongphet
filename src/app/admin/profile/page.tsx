import dynamic from "next/dynamic";
import MyProfile from "./myprofile";
const Layout = dynamic(() => import("@/components/Layout"));
export default function MyProfilePage() {
  return (
    <>
      <Layout>
        <MyProfile />
      </Layout>
    </>
  );
}
