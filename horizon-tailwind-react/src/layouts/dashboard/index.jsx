import React from "react";
import Navbar from "components/navbar";
import Footer from "components/footer/Footer";
import Marketplace from "views/admin/marketplace";

export default function Dashboard(props) {
  const { ...rest } = props;
  const [open, setOpen] = React.useState(true);


  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <div
            className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
              open ? "translate-x-0" : "-translate-x-96"
            }`}
          >

      
            <div className={`mx-[56px] mt-[50px] flex items-center`}>
              <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                Public <span class="font-medium">Pulse</span>
              </div>
            </div>
            <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
            {/* Nav item */}
      
            {/* Nav item end */}
          </div>
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routes */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"PublicPulse"}
              brandText={"Dashboard"}
              secondary={""}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Marketplace/>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
