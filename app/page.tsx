import DownloadMobileApps from "@/components/DownloadMobileApps/DownloadMobileApps";
import FastShipping from "@/components/FastShipping/FastShipping";
import HowToWork from "@/components/HowToWork/HowToWork";
import Landing from "@/components/Landing/Landing";
import Navbar from "@/components/Navbar/page";
import SectionBox from "@/components/SectionBox/SectionBox";
import Spotlight from "@/components/Spotlight/Spotlight";
import Transporting from "@/components/Transporting/Transporting";
import TransportRequest from "@/components/TransportRequest/TransportRequest";
import Script from "next/script";

export default async function Home() {


  return (
    <>
    <Script strategy="lazyOnload" async={true} src="https://www.google.com/recaptcha/enterprise.js?render=AIzaSyAOTdQMFGP6LiOk5QDPBdQSK5zJ8rJvQPs"/>
    {/* <Script async={true} src="https://www.google.com/recaptcha/api.js"/> */}
    <div className="py-20 w-full bg-gradient-to-t dark:to-sky-500/10 dark:from-transparent to-amber-500/15 from-transparent from-90%">
      <Navbar/>
      <Landing/>
      <Transporting/>
      <Spotlight/>
      <FastShipping/>
      <TransportRequest/>
      <HowToWork/>
      <SectionBox/>
      <DownloadMobileApps/>
    </div>
  </>
  );
}
