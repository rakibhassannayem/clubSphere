import { FcGoogle } from "react-icons/fc";
import Logo from "../../../components/Shared/Logo/Logo";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Registration = () => {
  const { registerUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const { name, email, image, password } = data;
    const imageFile = image[0];

    registerUser(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl my-5">
        <div className="card-body">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Create Account</h3>
            <p className="text-accent text-lg">
              Join ClubSphere and start connecting
            </p>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="btn border-2 bg-white border-primary mt-2 rounded-xl text-lg py-6 text-primary hover:text-white hover:bg-primary"
          >
            <FcGoogle />
            Continue with Google
          </button>
          <div className="divider mb-0">OR</div>
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset text-lg ">
              <label>Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input w-full pl-11 py-6 rounded-xl focus:border-0 outline-primary text-lg"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot exceed 20 characters",
                    },
                  })}
                />
                <FiUser
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
              </div>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}

              <label>Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@exampl.com"
                  className="input w-full pl-11 py-6 rounded-xl focus:border-0 outline-primary text-lg"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <MdOutlineEmail
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <label>Photo (Optional)</label>

              <input
                type="file"
                className="file-input w-full rounded-xl text-gray-400 text-lg border focus:border-0 outline-primary"
                {...register("image")}
              />

              <label>Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="input w-full pl-11 py-6 rounded-xl focus:border-0 outline-primary text-lg"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message:
                        "Password must be at least 6 characters with upper & lower case letters.",
                    },
                  })}
                />
                <GoLock
                  size={24}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                />
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}

              <button
                type="submit"
                className="btn btn-primary text-white rounded-xl text-lg mt-4 py-6"
              >
                Create Account
              </button>
            </fieldset>
          </form>

          <p className="text-center text-lg text-accent">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
