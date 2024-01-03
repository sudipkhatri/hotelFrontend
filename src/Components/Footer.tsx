const Footer = () => {
  return (
    <div className="bg-indigo-600 py-10">
      <div className="container w-[80vw] xl:w-[60vw] mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-wider">
          Holi - Days
        </span>
        <span className="flex gap-4 font-bold tracking-tight">
          <p className="cursor-pointer text-white">Privacy Policy</p>
          <p className="cursor-pointer text-white">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
