import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout({ children }) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="layoutContent">

                <Header />

                <main className="layoutMain">

                    {children}

                </main>

                <Footer />

            </div>

        </div>

    );

}

export default MainLayout;
