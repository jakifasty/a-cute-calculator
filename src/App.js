import './styles.css';
import { useReducer } from 'react'

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, action){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${currentOperand}${payload.digit}`
      }
    }
  }
}

function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {}) //for doing the state much easier

  dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{currentOperand}{operation}</div>
        <div className="current-operand">{previousOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button className="span-one">DEL</button>
      <button className="span-one">/</button>

      <button className="span-one">1</button>
      <button className="span-one">2</button>
      <button className="span-one">3</button>
      <button className="span-one">*</button>

      <button className="span-one">4</button>
      <button className="span-one">5</button>
      <button className="span-one">6</button>
      <button className="span-one">+</button>

      <button className="span-one">7</button>
      <button className="span-one">8</button>
      <button className="span-one">9</button>
      <button className="span-one">-</button>

      <button className="span-two">.</button>
      <button className="span-one">0</button>
      <button className="span-one">=</button>
    </div>
  );
}

export default App;
