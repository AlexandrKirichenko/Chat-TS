import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import Avatar from "./components/Avatar ";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  return (
   <>
       <Layout>
           <Input value={""} type={"text"} id={"b34234"} name={"Password"} />
           <Button id={"Register"} buttonName={"Register"} color={""}/>
           <Button id={"Login"} buttonName={"Login"} color={"secondary"}/>
           <Avatar size={"large"} img={""} name={"Alex"} color={""}/>
           <Avatar size={""} img={""} name={"Alex"} color={""}/>
       </Layout>
       
   </>
  );
}

export default App;
