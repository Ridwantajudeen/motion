import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Middle from "./Middle";
import Footer from "./Footer";

function Dashboard(){
    return(
        <div className="Dashboard">
            <Header/>
            <Hero/>
            <Middle/>
            <Footer/>
        </div>
    )
}

export default Dashboard;