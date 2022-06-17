import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [logo, setLogo] = useState([]);
  const onLoad = async () => {
    axios({
      method: "GET",
      url: "https://keeper-react-backend.herokuapp.com/transactions"
    }).then((res) => {
      setTransactions(res.data.transactions);
    });
  };

  const merchantLogo = async () => {
    axios({
      method: "GET",
      url: "https://keeper-react-backend.herokuapp.com/merchants"
    }).then((res) => {
      setLogo(res.data.merchants);
    });
  };

  useEffect(() => {
    onLoad();
    merchantLogo();
  }, []);

  const topTen = transactions
    .map((obj) => {
      return { ...obj, date: new Date(obj.date).toLocaleDateString("en-US") };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // const returnLogo = (name) => {
  //   switch (name) {
  //     case "Masterclass":
  //       return logo[1].logo;
  //     case "Amazon":
  //       return logo[2].logo;
  //     case "USPS":
  //       return logo[3].logo;
  //     case "GoDaddy":
  //       return logo[0].logo;
  //     case "Verizon":
  //       return logo[4].logo;
  //     default:
  //       return "NaN";
  //   }
  // };

  const returnLogo = (name) => {
    for (let i = 0; i < logo.length; i++) {
      if (name === logo[i].name) {
        return logo[i].logo;
      }
    }
  };

  const renderedList = topTen.map((data) => {
    return (
      <li key={data.id} className="listOrder">
        <img
          className="image"
          alt="images of logo"
          src={returnLogo(data.merchantName)}
        />
        <div className="merchantName">{data.merchantName} </div>
        <div className="date">{data.date}</div>
      </li>
    );
  });
  return <div className="transactions">{<ul>{renderedList}</ul>}</div>;
};

export default Transactions;
