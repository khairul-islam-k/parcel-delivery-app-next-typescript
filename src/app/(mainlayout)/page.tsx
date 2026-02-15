import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Banner from "@/components/home/Banner";
import Works from "@/components/works/Works";
import OurServices from "@/components/home/ourServices/OurServices";
import ClientSlider from "@/components/home/ClientSlider";
import Question from "@/components/home/Question";


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const items = [
    {
      title: "How long does delivery take?",
      content:
        "Delivery usually takes 24–72 hours depending on your location.",
    },
    {
      title: "Do you offer cash on delivery?",
      content:
        "Yes, we provide secure cash on delivery across the country.",
    },
    {
      title: "Can I track my parcel?",
      content:
        "Yes, you can track your parcel using the tracking ID provided.",
    },
  ];
  return (
    <div className='w-11/12 mx-auto'>
      <Banner />
      <Works />
      <OurServices />
      <ClientSlider />

      <section className='lg:px-28'>
        <h3 className='lg:text-4xl text-2xl lg:font-extrabold font-semibold text-center'>Frequently Asked Question (FAQ)</h3>
        <p className='text-center mt-6 mb-10'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

        <Question items={items}></Question>

        <div className='text-center mt-10 mb-24'>
          <button className='btn bg-[#CAEB66]'>See More FAQ’s</button>
        </div>
      </section>
    </div>
  );
}
