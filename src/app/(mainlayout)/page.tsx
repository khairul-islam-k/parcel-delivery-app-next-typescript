import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Banner from "@/components/home/Banner";
import Works from "@/components/works/Works";
import OurServices from "@/components/home/ourServices/OurServices";
import ClientSlider from "@/components/home/ClientSlider";


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className='w-11/12 mx-auto'>
      <Banner />
      <Works />
      <OurServices />
      <ClientSlider />
    </div>
  );
}
