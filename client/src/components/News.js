import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import moment from "moment";

const News = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    axios("/news").then((res) => {
      console.log(res);
      setTitle(res.data.articles[0].title);
      setDescription(res.data.articles[0].description);
      setImage(res.data.articles[0].urlToImage);
      setSource(res.data.articles[0].source.name);
      setUrl(res.data.articles[0].url);
      setAuthor(res.data.articles[0].author);
      setTime(
        moment(res.data.articles[0].publishedAt).format(
          "dddd, MMMM Do YYYY"
        )
      );
    });
  }, []);

  return (
    <div>
      <Container className="">
        <Row>
          <Col>
            <Jumbotron>
              <p className="lead">
                <i>By: {author}</i>
              </p>
              <p className="lead">
                <i>{time}</i>
              </p>
              <h1 className="display-3">{title}</h1>
              <img
                src={image}
                alt="alternatetext"
                className="img-fluid mb-3 mt-4 text-center"
              />
              <p className="lead">{description}</p>
              <hr className="my-2" />
              <p>
                <i>{source}</i>
              </p>
              <p className="lead">
                <a href={url}>
                  <Button color="primary">Learn More</Button>
                </a>
              </p>
            </Jumbotron>
            <Card>
              <CardImg
                top
                width="100%"
                src="/assets/318x180.svg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg
                top
                width="100%"
                src="/assets/318x180.svg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg
                top
                width="100%"
                src="/assets/318x180.svg"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default News;
