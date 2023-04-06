import "./Button.scss";

function Button(props) {
  return (
    <div>
      <button className="reset-button" onClick={props.onClick}>
        reset
      </button>
    </div>
  );
}

export default Button;
