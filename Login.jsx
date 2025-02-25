import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { GiHealing } from "react-icons/gi";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";
import { apiRquest } from "../utils";
import { UserLogin } from "../redux/userSlice";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRquest({
        url: "/auth/login",
        method: "POST",
        data: data,
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg("");

        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (e) {
      console.log(e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FFFAF0] w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div
          className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center "
          style={{ backgroundColor: "#008B8B" }}
        >
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#FFFAF0] rounded text-[#008B8B]">
              <GiHealing />
            </div>
            <span className="text-2xl text-[#FFFAF0] font-semibold">
              wellnessHub
            </span>
          </div>

          <p className="text-ascent-1 text-[#F0FFF0] text-base font-semibold">
            Log in to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2 text-[#F0FFF0]">
            Welcome back
          </span>

          <form
            className="py-8 flex flex-col gap-5="
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register("email", {
                required: "Email Address is required",
              })}
              styles="w-full rounded-full"
              labelStyle="ml-2  "
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              styles="w-full rounded-full"
              labelStyle="ml-2"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to="/reset-password"
              className="text-xs text-right text-[#F0FFF0] font-semibold"
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md px-8 py-3 text-sm font-medium text-[#333333] bg-[#FFFAF0] outline-none`}
                title="Login"
              />
            )}
          </form>

          <p className="text-ascent-2 text-sm text-center text-[#F0FFF0]">
            Dont have an account?
            <Link
              to="/register"
              className="text-[#F0FFF0] font-semibold ml-2 cursor-pointer"
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div
          className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center "
          style={{ backgroundColor: "#FFFAF0" }}
        >
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="Bg Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />

            <div
              className="absolute flex items-center gap-1 right-10 top-10 py-2 px-5 rounded-full"
              style={{ backgroundColor: "#008B8B" }}
            >
              <BsShare size={14} />
              <span className="text-[#FFFAF0] text-xs  font-medium">Share</span>
            </div>

            <div
              className="absolute flex items-center gap-1 left-10 top-6 py-2 px-5 rounded-full"
              style={{ backgroundColor: "#008B8B" }}
            >
              <ImConnection />
              <span className="text-[#FFFAF0] text-xs  font-medium">
                Connect
              </span>
            </div>

            <div
              className="absolute flex items-center gap-1 left-12 bottom-6 py-2 px-5 rounded-full"
              style={{ backgroundColor: "#008B8B" }}
            >
              <AiOutlineInteraction />
              <span className="text-[#FFFAF0] text-xs  font-medium">
                Interact
              </span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-[#008B8B] text-base">
              Connect with health enthusiasts & share wellness insights{" "}
            </p>
            <span className="text-sm text-[#008B8B]/80">
              Discover, share, and connect health and wellness.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
