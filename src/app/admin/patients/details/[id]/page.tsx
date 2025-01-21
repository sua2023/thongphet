"use client";
import Layout from "@/components/Layout";
import DetailsPatient from "../details";
import { useParams } from "next/navigation";

export default function DetialPage() {
  const params = useParams();
  let id = params.id;
  if (Array.isArray(id)) {
    id = id[0]; 
  }
  return (
    <Layout>
      <DetailsPatient id={id}/>
    </Layout>
  );
}
