import './styles.css';
import { useReducer } from 'react'
import DigitButton from './DigitButton.js'
import OperationButton from './OperationButton.js'

export const ACTIONS = { //action break into actions with types and parameters
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload }){ //this includes all the excepions and logic when clicking buttons
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state
      if (payload.digit === "." && state.currentOperand.includes(".")) return state

      return {
        ...state,
        currentOperand: `${state.currentOperand || "" }${payload.digit}`,
      }
    
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION: //if no number before operation
      if (state.currentOperand == null && state.previousOperand == null)
        return state //return state
      if (state.previousOperand == null){ //after typing numbers, we need to add operation and place it in 
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      if (state.currentOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      return{ //default action
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      }
    case ACTIONS.DELETE_DIGIT:
      return {}
    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null){
        return state
      }
      return{
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}){ // state -> {currentOperand, previousOperand, operation}; this function implements all the logic for making the operations
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return "" //return empty string
  let computation = ""
  switch (operation){
    case "+":
      computation = prev + current; break
    case "-":
      computation = prev - current; break
    case "/":
      computation = prev / current; break
    case "*":
      computation = prev * current; break
  }

  return computation.toString()
}

function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {}) //for doing the state much easier

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button className="span-one" onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
