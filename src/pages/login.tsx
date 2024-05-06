import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_1.png";
import { loginUser } from "../services/api/authApi";
import { useState } from "react";
import useAuth from "../hooks/authUser";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthInputTyping } from "../contracts/users";
import TextInput, { InputType } from "../components/TextInput";
import Button from "../components/Button";
import { BeatLoader } from "react-spinners";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const { saveUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AuthInputTyping>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const mutation = useMutation({
    mutationFn: loginUser,
  });
  const onSubmit = (data: AuthInputTyping) => {
    setIsBusy(true);
    mutation.mutate(data, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast.success(data.message);
        sessionStorage.setItem("fantrip_admin_token", data.accessToken);
        saveUser({
          name: `${data.data.firstName} ${data.data.lastName}`,
          email: data.data.email,
          token: data.accessToken,
          image: data.data.picture,
          address: data.data.address,
          phone: data.data.phone,
          id: data.data.id,
          account: data.data.role,
          joined: data.data.createdDate,
        });
        navigate("/");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
        setIsBusy(false);
      },
    });
  };
  return (
    <div>
      <div className="lg:fixed top-0 left-0 bg-gradient h-screen w-full">
        <div className="h-full w-full place-center">
          <div className="w-[95vw] md:w-[450px] lg:w-[500px] xl:w-[600px] bg-white p-6 drop-shadow rounded-lg">
            <div>
              <img src={logo} alt="hello" className="w-[200px] mx-auto" />
              <p className="text-center fw-500 mt-4">Admin Login</p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      placeholder="email@domain.com"
                      type={InputType.email}
                      error={errors.email?.message}
                      {...field}
                      ref={null}
                    />
                  )}
                />
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter your password",
                      },
                      minLength: {
                        value: 5,
                        message: "Password is too short",
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        label="Password"
                        placeholder="Password"
                        type={InputType.password}
                        error={errors.password?.message}
                        {...field}
                        ref={null}
                      />
                    )}
                  />
                </div>
                <div className="mt-9">
                  <Button
                    title={
                      isBusy ? <BeatLoader size={12} color="white" /> : "Login"
                    }
                    type="int"
                    disabled={!isValid || isBusy}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
