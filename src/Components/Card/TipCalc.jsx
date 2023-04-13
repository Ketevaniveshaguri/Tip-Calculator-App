import "./TipCalc.scss";
import TipPercentage from "../UI/TipPercentage";
import { useState } from "react";
import WrapperCard from "../UI/WrapperCard";
import "../UI/WrapperCard";
import logo from "../../img/splitter.svg";
import dolarIcon from "../../img/dolarIcon.svg";
import personIcon from "../../img/personIcon.svg";

const tipPercentages = [5, 10, 15, 25, 50];

function TipCalc() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [numOfPeopleError, setNumOfPeopleError] = useState(false);

  const handleBillAmountChange = (e) => {
    const value = e.target.value;
    const min = 0;
    const max = 1000;
    if (value >= min && value <= max) {
      setBillAmount(value);
    }
  };

  const handleTipPercentageChange = (percentage) => {
    setTipPercentage(percentage);
  };
  const tip =
    numOfPeople > 0 ? (billAmount * tipPercentage) / 100 / numOfPeople : 0;

  const total = numOfPeople > 0 ? billAmount / numOfPeople + tip : 0;
  const tipAmount = isNaN(tip) ? "0.00" : tip.toFixed(2);
  const totalAmount = isNaN(total) ? "0.00" : total.toFixed(2);
  const activeBillAmountState = billAmount ? "card-1__input--green-border" : "";
  const activeCustomAmountState = tipPercentage ? "green-border" : "";

  const handleNumOfPeopleChange = (e) => {
    const value = e.target.value;
    const min = 0;
    const max = 100;
    if (value >= 1 && value <= max) {
      setNumOfPeople(value);
      setNumOfPeopleError(false);
    } else if (value == min) {
      setNumOfPeople(value);
      setNumOfPeopleError(true);
    }
  };

  const handleReset = (e) => {
    setBillAmount(0);
    setTipPercentage("");
    setNumOfPeople("");
  };

  return (
    <div className="container">
      <span className="font-link">
        <img className="card-1__logo" src={logo} alt="logo" />

        <WrapperCard className="card">
          <div className="card-1">
            <p className="card-1__bill">Bill</p>
            <div className="card-1__input-with-icon">
              <input
                className={`card-1__input ${activeBillAmountState}`}
                type="number"
                value={billAmount || ""}
                onChange={handleBillAmountChange}
                placeholder="0"
              ></input>
              <img src={dolarIcon} className="card-1__icon" alt="dolar-icon" />
            </div>

            <p className="card-1__select-tip">Select Tip %</p>
            <div className="card-1__tip-percentage-container">
              {tipPercentages.map((element) => (
                <TipPercentage
                  onClick={(e) => handleTipPercentageChange(element)}
                  className={element === tipPercentage && "active"}
                  percentages={element}
                  key={Math.random()}
                />
              ))}
              <input
                onChange={(e) => handleTipPercentageChange(e.target.value)}
                className={`card-1__custom-input ${activeCustomAmountState} `}
                value={tipPercentage || ""}
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
                className={numOfPeopleError ? "error" : "card-1__input"}
                style={{ borderColor: numOfPeopleError ? "red" : "initial" }}
                value={numOfPeople || ""}
                onChange={handleNumOfPeopleChange}
                placeholder="0"
                type="number"
              ></input>
              <img
                src={personIcon}
                className="card-1__icon"
                alt="person-icon"
              />
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
            <div>
              <button className="reset-button" onClick={handleReset}>
                reset
              </button>
            </div>
          </div>
        </WrapperCard>
      </span>
    </div>
  );
}

export default TipCalc;
