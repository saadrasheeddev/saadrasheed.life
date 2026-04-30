import realestateBg from "@/assets/realestate-bg.jpg";

const RealEstateBanner = () => {
  return (
    <section
      aria-hidden="true"
      className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden -mt-24 sm:-mt-32 md:-mt-40 -mb-16 sm:-mb-24 md:-mb-32 z-0 pointer-events-none"
    >
      <img
        src={realestateBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default RealEstateBanner;
