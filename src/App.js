import React from "react";
import "./App.css";
import moment from "moment";
import Input from "./input";
import Axios from "axios";

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00");

function App() {
  const [name, setName] = React.useState(" ");
  const [email, setEmail] = React.useState(" ");
  const [selected, setSelected] = React.useState(" ");
  const [isChecked, setIsChecked] = React.useState(false);
  const [timer, setTimer] = React.useState(" ");
  const [message, setMessage] = React.useState(" ");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    Axios.get(
      "http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR1-hZxURQj4VjQ032K3Z21HTQ5uGgHnex2GuGAYhDyXlk3Eqid7R_6j1Yw"
    ).then(response => {
      const { data } = response;
      setMessage(data.response);
      setIsLoading(false);
    });
  };

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMin = targetDate.diff(moment(), "minutes") % 60;
    const diffSec = targetDate.diff(moment(), "seconds") % 60;
    setTimer(`${diffHours} hours ${diffMin} minutes ${diffSec} seconds `);
  };

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);              //every 1000 ms, updateTimer will be run
    Axios.get(
      "http://www.mocky.io/v2/5dfde8a6310000551ec96e5b?fbclid=IwAR2ZPP0lgEBouptqJwAFIU3IZdr1VpH2bF6ENjwSkC0cOtPbd1Ixm1zOBBM"
    ).then(response => {
      setSelected(response.data.subject);
    });
    return () => clearInterval(interval);
  }, []);

  //console.log("State:", { name, email, selected, isChecked });    //ขึ้นทุกครั้งที่มีค่าอะไรสักอย่างเปลี่ยน

  return (
    <div className="App">
      <div className="title">Season change Registration form</div>
      <p>Form ends in</p>
      <p>{timer}</p>

      <Input
        label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={email}
        onChangeFromComponent={value => setEmail(value)}
      />

      {/* <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </div>
      </div> */}

      {/* <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className="input is-danger"
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p className="help is-danger">This email is invalid</p>
      </div> */}

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={selected}
              onChange={event => setSelected(event.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={isChecked}
              onChange={event => setIsChecked(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-warning is-rounded ${isLoading && "is-loading"}`} onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-danger is-rounded">Cancel</button>
        </div>
      </div>
      {message}
      <progress class="progress is-medium is-link" max="100">45%</progress>
    </div>
  );
}

export default App;
