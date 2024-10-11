import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Middle from "./Middle";


function Dashboard(){
    return(
        <div className="Dashboard">
            <Header/>
            <Hero/>
            <Middle/>
            
        </div>
    )
}

export default Dashboard;