import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";

export default function HomeLayout (){
    return (
        <>
        <Header />
        <main>
            <Home />
        </main>
        <Footer/>
                
        </>
    )

}