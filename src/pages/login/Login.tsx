import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientContext } from "../../context/client/ClientContext";

export function LoginPage() {
  const [data, setData] = useState({ username: "Whilinora", password: "mobil28!" });
  const [loading, setLoading] = useState(false);
  const { login } = useClientContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { username, password } = data;
    setLoading(true);
    await login({ username, password });
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className={`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-col gap-4">
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="username"
                className="grow"
                placeholder="Username"
                value={data.username}
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
              />
            </label>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                name="password"
                type="password"
                className="grow"
                placeholder="Password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </label>
          </div>

          <div>
            <button type="button" disabled={loading} className="btn btn-primary w-full" onClick={handleSubmit}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
