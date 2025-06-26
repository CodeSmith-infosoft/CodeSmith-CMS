import login_img from "@/assets/image/login-bg.png";
import ErrorMessage from "@/components/ErrorMessage";
import loginFormSchema, {
  loginFormDataType,
} from "@/service/form-schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { loginAdmin } from "@/service/asyncStore/action/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<loginFormDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("login");
    if (data) {
      const credentials = JSON.parse(data);
      setValue("email", credentials.email || "");
      setValue("password", credentials.password || "");
      setRememberMe(true);
    }
  }, []);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = (data: loginFormDataType) => {
    setLoading(true);
    loginAdmin(data)
      .then((res) => {
        const toast2 = res.success ? toast.success : toast.error;
        toast2(res.message);
        if (res.success) {
          if (rememberMe) {
            localStorage.setItem("login", JSON.stringify(data));
          } else {
            localStorage.removeItem("login");
          }
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data._id);
          reset();
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setRememberMe(checked);
  };

  return (
    <section className="login">
      <Container>
        <Row>
          <Col
            md={6}
            sm={12}
            className="d-flex justify-content-center align-items-center"
          >
            <img src={login_img} alt="login" className="img-fluid" />
          </Col>
          <Col md={6} sm={12}>
            <Card>
              <p>WELCOME BACK</p>
              <h2>Login your Account</h2>
              <form>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Example@email.com"
                  {...register("email")}
                />
                <ErrorMessage message={errors.email?.message} />
                <label htmlFor="">Password</label>
                <div
                  className="password-input-wrapper"
                  style={{ position: "relative" }}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    {...register("password")}
                  />
                  <span className="eye-icon" onClick={togglePassword}>
                    <Icon
                      width={22}
                      height={22}
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    />
                  </span>
                  <ErrorMessage message={errors.password?.message} />
                </div>
                <div className="login-for">
                  <div className="d-flex align-items-center radio-box">
                    <input
                      className="mb-0 w-auto"
                      type="checkbox"
                      name="remember"
                      checked={rememberMe}
                      onChange={handleCheck}
                    />
                    <span>Remember me</span>
                  </div>
                </div>

                <button className="btn-all" onClick={handleSubmit(onSubmit)}>
                  {loading ? (
                    <>
                      <span className="spinner"></span>CONTINUE...
                    </>
                  ) : (
                    "CONTINUE"
                  )}
                </button>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
