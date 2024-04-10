
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // state for mortgage amount from user
  const [mortgageAmount , setMortgageAmount] = useState("");
   // state for user down payment
  const [downpayment , setDownPayment] = useState("");
   // state for user mortgage term
  const [mortgageTerm , setMortgageTerm] = useState("");
   // state for user interest rate
  const [interestRate , setInterestRate] = useState("");
   // state for calculating the amouth
  const [calculateAmount , setCalculateAmount] = useState("No data");
   // state for showing results modal
  const [showResults , setShowResults] = useState(false);

  const [showCalculateBtn , setShowCalculateBtn] = useState(false);


  useEffect(() => {

    if(mortgageAmount  && mortgageTerm  && interestRate ){
      setShowCalculateBtn(false)
  
    }else{
      setShowCalculateBtn(true)
    }

    


  }, [mortgageAmount, mortgageTerm , interestRate, showCalculateBtn])

  // Method for user calculations
  const handleCalculation = () => {


    // Converting User Inputs Into Numbers
    const mortgage = Number(mortgageAmount);
    const downpay = Number(downpayment);
    const intRate = Number(interestRate / 100.0);
    const loanTerm = Number(mortgageTerm * 12)


    const m = (mortgage - downpay) * (intRate / 12);
    const n = (1 + intRate / 12);
    const months = Math.pow(n, loanTerm)

    const payments = m * months;



    const rates = ( 1 +  intRate / 12);
    const ratesSum = Math.pow(rates, loanTerm) - 1

    const estimateMonthlyPayments = payments / ratesSum

    setCalculateAmount(`${estimateMonthlyPayments.toFixed(0).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`)
    setShowResults(true)

    console.log(calculateAmount)



  }

  // Method for showing results modal
  const handleCloseResults = () => {
    setShowResults(false)

    // Reset User Inputs
    setMortgageAmount("")
    setInterestRate("")
    setMortgageTerm("")
    setDownPayment("")
  }




  return (
    <div className="App">
      <div className='backgroundAppCover'></div>
        <div className='line1 shadow-lg'></div>
        <div className='line2 shadow-lg'></div>

      <nav className=''>
        <h1 style={{ marginTop: "40px", fontSize: "22px"}}>Mortgage Payment Calculator</h1>
      </nav>

      <div className='mortgagePriceContainer container'>
        <div className={showResults ? "resultsBackgroundCover" : "resultsBackgroundCover active"}>
          <div className='resultsBox '>
            <div className='resultsHeaderBox'>
            <p>Estimated Total Monthly Payment</p>
            </div>
            <p className='monthlyAmountText'>${calculateAmount}</p>
            <button className='reCalculateBtn' onClick={handleCloseResults}>Re-Calculate</button>
          </div>
        </div>
        <div className='userInfoContainer container'>
          <label style={{ margin: "10px"}}>Price of the Home</label>
          <input type='number' onChange={(e) => setMortgageAmount(e.target.value)} value={mortgageAmount} className='form-control' placeholder='$0' />
        </div>
        <div className='userInfoContainer container'>
          <label style={{ margin: "10px"}}>Down Payment </label>
        <input type='number' onChange={(e) => setDownPayment(e.target.value)} value={downpayment} className='form-control' placeholder='$0' />
        </div>
        <div className='userInfoContainer container'>
          <label style={{ margin: "10px"}}>Loan Term</label>
        <select onChange={(e) => setMortgageTerm(e.target.value)} value={mortgageTerm} className='form-control'>
          <option  selected value="">Choose Your Loan Term</option>
          <option value="10">10 Year</option>
          <option value="15">15 Year</option>
          <option value="20">20 Year</option>
          <option value="25">25 Year</option>
          <option value="30">30 Year</option>
        </select>
        </div>
        <div className='userInfoContainer container'>
          <label style={{ margin: "10px"}}>Interest Rate %</label>
        <input  maxLength="5" type='number' onChange={(e) => setInterestRate(e.target.value)} value={interestRate} className='form-control' placeholder='0.0%' />
        </div>
        <button disabled={showCalculateBtn} onClick={handleCalculation} className={showCalculateBtn ? "calculateBtn active " : "calculateBtn" }>Calculate</button>

      </div>
      <footer> &copy; 2024 Designed & Developed by Qunnderrie </footer>
    </div>
  );
}

export default App;
