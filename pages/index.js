import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("happy");
  };

  return (
    <form onSubmit={submitHandler}>
      <button>send</button>
    </form>
  );
}
