import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <img className="w-10 rounded-xl" src={logo} alt="" />
      <p className="text-3xl font-bold">
        Club<span className="text-primary">Sphere</span>
      </p>
    </div>
  );
};

export default Logo;
