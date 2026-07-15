import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";


function App() {


  const path = window.location.pathname;



  if (path === "/login") {


    return (

      <Login />

    );


  }



  return (

    <>

      <Header />

      <Home />

      <Footer />

    </>

  );


}


export default App;