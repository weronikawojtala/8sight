import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Opening = () => {
  const Relocate = () => {
    let history = useHistory();
    const location = {
      pathname: "/home",
    };
    history.push(location);
  };
  return (
    <div>
      <div className="opening">
        <span className="opening_brackets">[</span>
        <span>8SIGHT</span>
        <span className="opening_brackets">]</span>
      </div>
      <Button className="btn login_btn" onClick={Relocate}>
        Click to sign in
      </Button>
    </div>
  );
};

export default Opening;
