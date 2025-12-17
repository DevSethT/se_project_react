import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalwithForm";
// import ItemModel from "../ItemModal/ItemModal";

function App() {
  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
