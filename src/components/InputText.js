import '../css/InputText.css'

function InputText(props){
    return (
        <input  className="input-text" name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} required></input>
    );
}

export default InputText;