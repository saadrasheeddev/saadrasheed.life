import realestateBg from "@/assets/realestate-bg.jpg";

const RealEstateBanner = () => {
  return (
    <section
      aria-hidden="true"
      className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden"
    >
      <img
        src={realestateBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Top + bottom fades into background so it blends seamlessly */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default RealEstateBanner;
