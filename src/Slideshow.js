import Carousel from "react-bootstrap/Carousel";
import i1 from "./img/2.jpg";

const Slideshow = () => {
  return (
    <div>
      <div className="container-fluid">
        <Carousel prevLabel="" nextLabel="">
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={i1}
              alt=""
            />
            <Carousel.Caption className="note">
              <h3>Rods and cones </h3>
              <p>
                Rods and cones are photoreceptor cells - rods are responsible
                for monochrome vision, while cones for colour vision.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img1.jpg"}
            />
            <Carousel.Caption>
              <h3>Red eyes</h3>
              <p>
                The red eyes in the photos are the result of intense light
                reflecting off the blood vessels.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img3.jpg"}
            />
            <Carousel.Caption>
              <h3>Irises are like fingerprints</h3>
              <p>No two irises are the same, and neither are fingerprints.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img3.jpg"}
            />
            <Carousel.Caption>
              <h3>Babies eyes</h3>
              <p>
                Babies don't start blinking their eyes until a few months after
                birth. The secretion of tears also begins later - about 50 days
                after birth.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{ height: "300px" }}>
            <img
              style={{ height: "300px" }}
              className="d-block w-100"
              src={"assets/img/img3.jpg"}
            />
            <Carousel.Caption>
              <h3>Eye size</h3>
              <p>
                Single eyeball weighs between 7 and 8 grams and is about 25mm in
                diameter.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Slideshow;
