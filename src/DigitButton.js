export default function DigitButton({dispatch, digit}){
    return <button onClick={() => dispatch({type: null})}>{digit}</button>
}