import { type AppType } from "next/app";
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>
    <ToastContainer />
    <Component {...pageProps} />
  </>;
};

export default api.withTRPC(MyApp);
