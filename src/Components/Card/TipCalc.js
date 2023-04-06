import "./TipCalc.scss";
import TipPercentage from "../UI/TipPercentage";
import { useState } from "react";
import WrapperCard from "../UI/WrapperCard";
import "../UI/WrapperCard";
import Button from "../UI/Button";
import "../UI/Button.scss";

const tipPercentages = [5, 10, 15, 25, 50];

function TipCalc() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState("");
  const [customPercentage, setCustomPercentage] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [numOfPeopleError, setNumOfPeopleError] = useState(false);

  const handleBillAmountChange = (e) => {
    setBillAmount(e.target.value);
  };

  const handleTipPercentageChange = (e) => {
    setTipPercentage(parseInt(e.target.innerText));
  };
  const tip =
    numOfPeople > 0
      ? (billAmount * (tipPercentage || customPercentage)) / 100 / numOfPeople
      : 0;

  const total = numOfPeople > 0 ? billAmount / numOfPeople + tip : 0;
  const tipAmount = isNaN(tip) ? "0.00" : tip.toFixed(2);
  const totalAmount = isNaN(total) ? "0.00" : total.toFixed(2);
  const activeBillAmountState = billAmount ? "card-1__input--green-border" : "";
  const activeCustomAmountState = customPercentage ? "green-border" : "";

  const handleCustomPercentageChange = (e) => {
    setCustomPercentage(e.target.value);
    setTipPercentage("");
  };
  const handlnumOfPeopleChange = (e) => {
    setNumOfPeople(e.target.value);
  };
  function handleNumOfPeopleError(e) {
    const value = e.target.value;
    setNumOfPeople(value);
    if (value === "0") {
      setNumOfPeopleError(true);
    } else {
      setNumOfPeopleError(false);
    }
  }

  const handleReset = (e) => {
    setBillAmount(0);
    setTipPercentage("");
    setCustomPercentage("");
    setNumOfPeople(1);
  };

  return (
    <div className="container">
      <span className="font-link">
        <img className="card-1__logo" src="../image/SPLITTER.SVG" alt="logo" />
        <WrapperCard className="card">
          <div className="card-1">
            <p className="card-1__bill">Bill</p>
            <div className={`card-1__input-with-icon ${activeBillAmountState}`}>
              <input
                className="card-1__input"
                type="number"
                value={billAmount || ""}
                onChange={handleBillAmountChange}
              ></input>
              <img
                src="../image/dolarIcon.svg"
                className="card-1__icon"
                alt="dolar-icon"
              />
            </div>

            <p className="card-1__select-tip">Select Tip %</p>
            <div className="card-1__tip-percentage-container">
              {tipPercentages.map((element) => (
                <TipPercentage
                  onClick={handleTipPercentageChange}
                  className={element === tipPercentage && "active"}
                  percentages={element}
                  key={Math.random()}
                />
              ))}
              <input
                onChange={handleCustomPercentageChange}
                className={`card-1__custom-input ${activeCustomAmountState} `}
                value={customPercentage || ""}
                placeholder="Custom"
              ></input>
            </div>
            <div className="card-1__num-of-people__error-message">
              <p className="card-1__num-of-people">Number of People</p>
              <p
                className="card-1__error-message"
                style={{
                  visibility: numOfPeopleError ? "visible" : "hidden",
                }}
              >
                Can't be 0
              </p>
            </div>
            <div className="card-1__input-with-icon">
              <input
                className="card-1__input "
                value={numOfPeople || ""}
                min="1"
                onChange={handlnumOfPeopleChange}
                onInput={handleNumOfPeopleError}
                type="number"
              ></input>
              <img
                src="../image/personIcon.svg"
                className="card-1__icon"
                alt="person-icon"
              ></img>
            </div>
          </div>
          <div className="card-2">
            <div className="card-2__tip-total-per-person">
              <div className="card-2__amount">
                <div>
                  <p>tip Amount</p>
                  <p className="card-2__per-person">/person</p>
                </div>
                <div className="card-2__tip-amount-value">${tipAmount}</div>
              </div>
              <div className="card-2__amount">
                <div>
                  <p>Total</p>
                  <p className="card-2__per-person">/person</p>
                </div>
                <div className="card-2__total-amount-value">${totalAmount}</div>
              </div>
            </div>
            <Button onClick={handleReset} />
          </div>
        </WrapperCard>
      </span>
    </div>
  );
}

export default TipCalc;
