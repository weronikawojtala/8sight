import Slideshow from "./Slideshow";

const Greeting = (props) => {
  console.log(props.user);
  return (
    <div className="cards">
      <div className="card">
        <div className="card-info">
          <h2 className="subheader">Welcome in 8SIGHT</h2>
          <p className="welcome-page">
            8SIGHT is an app that allows users to train their eyesight right in
            front of the screen. Are your eyes already tired? Feel free and
            navigate to page with exercises and train with us!
          </p>
        </div>
      </div>
      <div className="card">
        <div className="card-info">
          <h2 className="subheader">Curious about eyesight?</h2>
          <p className="welcome-page">
            Below you can find some interesting scientific facts about eye's
            nature and more.
          </p>
          <Slideshow />
        </div>
      </div>
    </div>
  );
};

export default Greeting;
