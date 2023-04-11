import "./TipCalc.scss";
import TipPercentage from "../UI/TipPercentage";
import { useState } from "react";
import WrapperCard from "../UI/WrapperCard";
import "../UI/WrapperCard";
import Button from "../UI/Button";
import "../UI/Button.scss";
// import logo from "../../img/splitter.svg";
// import dolarIcon from "../../img/dolarIcon.svg";
// import personIcon from "../../img/personIcon.svg";

const tipPercentages = [5, 10, 15, 25, 50];

function TipCalc() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState("");
  const [customPercentage, setCustomPercentage] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [numOfPeopleError, setNumOfPeopleError] = useState(false);

  const handleBillAmountChange = (e) => {
    const value = e.target.value;
    const min = 0;
    const max = 5000;
    if (value >= min && value <= max) {
      setBillAmount(value);
    }
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
    const value = parseInt(e.target.value);
    const min = 0;
    const max = 100;
    if (value >= min && value <= max) {
      setNumOfPeople(value);
    }
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
        {/* <img className="card-1__logo" src={logo} alt="logo" /> */}
        <svg
          className="card-1__logo"
          alt="logo"
          width="87"
          height="54"
          viewBox="0 0 87 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.264 17.112C8.512 17.352 7.664 17.472 6.72 17.472C5.616 17.472 4.644 17.316 3.804 17.004C2.964 16.692 2.264 16.26 1.704 15.708C1.144 15.156 0.72 14.508 0.432 13.764C0.144 13.02 0 12.208 0 11.328V10.608H3.168V11.184C3.168 12.192 3.46 12.996 4.044 13.596C4.628 14.196 5.536 14.496 6.768 14.496C7.728 14.496 8.44 14.288 8.904 13.872C9.368 13.456 9.6 12.96 9.6 12.384C9.6 12.112 9.552 11.852 9.456 11.604C9.36 11.356 9.192 11.132 8.952 10.932C8.712 10.732 8.384 10.552 7.968 10.392C7.552 10.232 7.024 10.096 6.384 9.984C5.536 9.84 4.76 9.652 4.056 9.42C3.352 9.188 2.74 8.88 2.22 8.496C1.7 8.112 1.296 7.632 1.008 7.056C0.72 6.48 0.576 5.776 0.576 4.944V4.8C0.576 4.112 0.716 3.476 0.996 2.892C1.276 2.308 1.668 1.8 2.172 1.368C2.676 0.936 3.284 0.6 3.996 0.36C4.708 0.12 5.504 0 6.384 0C7.376 0 8.256 0.14 9.024 0.42C9.792 0.7 10.436 1.08 10.956 1.56C11.476 2.04 11.868 2.592 12.132 3.216C12.396 3.84 12.528 4.496 12.528 5.184V6.048H9.36V5.472C9.36 4.8 9.1 4.216 8.58 3.72C8.06 3.224 7.328 2.976 6.384 2.976C5.584 2.976 4.952 3.14 4.488 3.468C4.024 3.796 3.792 4.24 3.792 4.8C3.792 5.088 3.848 5.348 3.96 5.58C4.072 5.812 4.268 6.02 4.548 6.204C4.828 6.388 5.196 6.552 5.652 6.696C6.108 6.84 6.688 6.976 7.392 7.104C9.152 7.424 10.496 7.96 11.424 8.712C12.352 9.464 12.816 10.576 12.816 12.048V12.336C12.816 13.12 12.676 13.828 12.396 14.46C12.116 15.092 11.712 15.632 11.184 16.08C10.656 16.528 10.016 16.872 9.264 17.112ZM28.72 10.8V17.136H25.552V0.336H32.128C32.992 0.336 33.744 0.476 34.384 0.756C35.024 1.036 35.556 1.404 35.98 1.86C36.404 2.316 36.724 2.836 36.94 3.42C37.156 4.004 37.264 4.6 37.264 5.208V5.784C37.264 6.408 37.156 7.02 36.94 7.62C36.724 8.22 36.404 8.756 35.98 9.228C35.556 9.7 35.024 10.08 34.384 10.368C33.744 10.656 32.992 10.8 32.128 10.8H28.72ZM31.816 7.776H28.72V3.36H31.816C32.52 3.36 33.076 3.552 33.484 3.936C33.892 4.32 34.096 4.816 34.096 5.424V5.712C34.096 6.32 33.892 6.816 33.484 7.2C33.076 7.584 32.52 7.776 31.816 7.776ZM61.28 14.112V17.136H50.48V0.336H53.648V14.112H61.28ZM86.16 17.136V14.112H82.128V3.36H86.16V0.336H74.928V3.36H78.96V14.112H74.928V17.136H86.16ZM8.064 39.36V53.136H4.896V39.36H0.432V36.336H12.528V39.36H8.064ZM32.752 53.136V39.36H37.216V36.336H25.12V39.36H29.584V53.136H32.752ZM61.376 50.112V53.136H50.48V36.336H61.088V39.36H53.648V43.2H60.8V46.224H53.648V50.112H61.376ZM78.12 53.136V46.8H81.768C82.232 46.8 82.564 46.92 82.764 47.16C82.964 47.4 83.064 47.712 83.064 48.096V53.136H86.232V47.328C86.232 46.768 86.068 46.304 85.74 45.936C85.412 45.568 84.968 45.352 84.408 45.288V44.856C85.176 44.536 85.744 44.076 86.112 43.476C86.48 42.876 86.664 42.232 86.664 41.544V40.968C86.664 40.328 86.548 39.728 86.316 39.168C86.084 38.608 85.748 38.116 85.308 37.692C84.868 37.268 84.32 36.936 83.664 36.696C83.008 36.456 82.248 36.336 81.384 36.336H74.952V53.136H78.12ZM78.12 43.776H81.144C81.912 43.776 82.496 43.596 82.896 43.236C83.296 42.876 83.496 42.368 83.496 41.712V41.424C83.496 40.864 83.296 40.38 82.896 39.972C82.496 39.564 81.912 39.36 81.144 39.36H78.12V43.776Z"
            fill="#3D6666"
          />
        </svg>

        <WrapperCard className="card">
          <div className="card-1">
            <p className="card-1__bill">Bill</p>
            <div className={`card-1__input-with-icon ${activeBillAmountState}`}>
              <input
                className="card-1__input"
                type="number"
                value={billAmount || ""}
                onChange={handleBillAmountChange}

                // placeholder="0"
              ></input>
              {/* <img src={dolarIcon} className="card-1__icon" alt="dolar-icon" /> */}
              <svg
                className="card-1__icon"
                alt="dolar-icon"
                width="11"
                height="17"
                viewBox="0 0 11 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.01598 16.328V14.864C7.24798 14.784 8.23598 14.42 8.97998 13.772C9.72398 13.124 10.096 12.264 10.096 11.192V11.048C10.096 10.056 9.74798 9.276 9.05198 8.708C8.35598 8.14 7.34398 7.776 6.01598 7.616V4.184C6.57598 4.328 7.02798 4.584 7.37198 4.952C7.71598 5.32 7.88798 5.768 7.88798 6.296V6.584H9.71198V6.152C9.71198 5.704 9.62398 5.276 9.44798 4.868C9.27198 4.46 9.02398 4.088 8.70398 3.752C8.38398 3.416 7.99598 3.132 7.53998 2.9C7.08398 2.668 6.57598 2.504 6.01598 2.408V0.872002H4.28798V2.36C3.79198 2.408 3.31998 2.516 2.87198 2.684C2.42398 2.852 2.03198 3.076 1.69598 3.356C1.35998 3.636 1.09198 3.972 0.891981 4.364C0.691981 4.756 0.591981 5.208 0.591981 5.72V5.864C0.591981 6.824 0.907981 7.572 1.53998 8.108C2.17198 8.644 3.08798 8.992 4.28798 9.152V13.064C3.58398 12.904 3.03998 12.592 2.65598 12.128C2.27198 11.664 2.07998 11.048 2.07998 10.28V9.992H0.255981V10.568C0.255981 11.032 0.335981 11.492 0.495981 11.948C0.655981 12.404 0.899981 12.828 1.22798 13.22C1.55598 13.612 1.97198 13.948 2.47598 14.228C2.97998 14.508 3.58398 14.704 4.28798 14.816V16.328H6.01598ZM4.28798 7.424C3.59998 7.296 3.12398 7.092 2.85998 6.812C2.59598 6.532 2.46398 6.168 2.46398 5.72C2.46398 5.256 2.63998 4.888 2.99198 4.616C3.34398 4.344 3.77598 4.168 4.28798 4.088V7.424ZM6.01598 9.344V13.136C6.70398 13.056 7.24398 12.848 7.63598 12.512C8.02798 12.176 8.22398 11.736 8.22398 11.192C8.22398 10.632 8.04798 10.216 7.69598 9.944C7.34398 9.672 6.78398 9.472 6.01598 9.344Z"
                  fill="#9EBBBD"
                />
              </svg>
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
                // min="1"
                onChange={handlnumOfPeopleChange}
                onInput={handleNumOfPeopleError}
                type="number"
              ></input>
              {/* <img
                src={personIcon}
                className="card-1__icon"
                alt="person-icon"
              ></img> */}
              <svg
                className="card-1__icon"
                alt="person-icon"
                width="13"
                height="16"
                viewBox="0 0 13 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.94468 6.5782C4.67424 7.32746 5.56715 7.70722 6.59831 7.70722C7.62924 7.70722 8.52203 7.32734 9.25171 6.57832C9.9814 5.82918 10.3514 4.91244 10.3514 3.85349C10.3514 2.79478 9.9814 1.87804 9.25183 1.1289C8.52227 0.379758 7.6296 0 6.59831 0C5.56727 0 4.67448 0.379758 3.94479 1.12878C3.21511 1.87816 2.84527 2.7949 2.84527 3.85349C2.84527 4.91244 3.21511 5.82906 3.94468 6.5782ZM0.157754 11.2922C0.0951042 11.6513 0.0525445 11.9914 0.0315027 12.3031C0.0106987 12.6078 0.000118872 12.9258 0 13.2482C0 14.0838 0.258564 14.76 0.768559 15.2583C1.27225 15.7505 1.93834 16 2.74862 16H10.2514C11.0617 16 11.728 15.7504 12.2316 15.2583C12.7414 14.7597 13 14.0835 13 13.2483C13 12.9274 12.9895 12.6096 12.9689 12.3035C12.9478 11.991 12.9053 11.6508 12.8426 11.2922C12.7794 10.9303 12.6979 10.5884 12.6006 10.2758C12.4998 9.95244 12.3628 9.63347 12.1936 9.32769C12.0182 9.01043 11.8117 8.73419 11.5802 8.50665C11.3378 8.26849 11.0412 8.07721 10.6986 7.93793C10.3571 7.79901 9.97855 7.72858 9.5734 7.72858C9.41434 7.72858 9.26039 7.79559 8.96367 7.9942C8.7781 8.11835 8.56411 8.25995 8.32766 8.4151C8.12378 8.54864 7.84727 8.67376 7.50608 8.78692C7.1725 8.89764 6.83429 8.95379 6.50036 8.95379C6.16642 8.95379 5.82809 8.89764 5.49487 8.78692C5.15333 8.67364 4.87681 8.54852 4.6727 8.41497C4.43399 8.25836 4.22012 8.11676 4.03728 7.99432C3.7402 7.79572 3.58637 7.7287 3.42731 7.7287C3.02228 7.7287 2.64365 7.79901 2.30199 7.93781C1.95914 8.07733 1.66266 8.26861 1.4205 8.50653C1.18892 8.73394 0.982543 9.01031 0.806838 9.32769C0.637553 9.63347 0.500603 9.95256 0.399912 10.2757C0.30243 10.5883 0.220998 10.9303 0.157754 11.2922Z"
                  fill="#9EBBBD"
                />
              </svg>
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