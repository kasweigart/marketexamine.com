import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
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

  const [title2, setTitle2] = useState("");
  const [description2, setDescription2] = useState("");
  const [image2, setImage2] = useState("");
  const [source2, setSource2] = useState("");
  const [url2, setUrl2] = useState("");
  const [author2, setAuthor2] = useState("");
  const [time2, setTime2] = useState("");

  const [title3, setTitle3] = useState("");
  const [description3, setDescription3] = useState("");
  const [image3, setImage3] = useState("");
  const [source3, setSource3] = useState("");
  const [url3, setUrl3] = useState("");
  const [author3, setAuthor3] = useState("");
  const [time3, setTime3] = useState("");

  useEffect(() => {
    axios("/news").then((res) => {
      setTitle(res.data.articles[0].title);
      setDescription(res.data.articles[0].description);
      setImage(res.data.articles[0].urlToImage);
      setSource(res.data.articles[0].source.name);
      setUrl(res.data.articles[0].url);
      setAuthor(res.data.articles[0].author);
      setTime(
        moment(res.data.articles[0].publishedAt).format("dddd, MMMM Do YYYY")
      );

      setTitle2(res.data.articles[1].title);
      setDescription2(res.data.articles[1].description);
      setImage2(res.data.articles[1].urlToImage);
      setSource2(res.data.articles[1].source.name);
      setUrl2(res.data.articles[1].url);
      setAuthor2(res.data.articles[1].author);
      setTime2(
        moment(res.data.articles[1].publishedAt).format("dddd, MMMM Do YYYY")
      );

      setTitle3(res.data.articles[2].title);
      setDescription3(res.data.articles[2].description);
      setImage3(res.data.articles[2].urlToImage);
      setSource3(res.data.articles[2].source.name);
      setUrl3(res.data.articles[2].url);
      setAuthor3(res.data.articles[2].author);
      setTime3(
        moment(res.data.articles[2].publishedAt).format("dddd, MMMM Do YYYY")
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
                <i>{author}</i>
              </p>
              <p className="lead">
                <i>{time}</i>
              </p>
              <h1 className="display-3">{title}</h1>
              <img
                src={image}
                alt=""
                className="img-fluid mb-3 mt-4 text-center"
              />
              <p className="lead">{description}</p>
              <hr className="my-2" />
              <p>
                <i>{source}</i>
              </p>
              <p className="lead">
                <a href={url}>
                  <Button color="secondary">View Source</Button>
                </a>
              </p>
            </Jumbotron>
            <Card className="p-5 mb-4">
              <h3 className="mb-4">{title2}</h3>
              <CardText>
                <i>{author2}</i>
              </CardText>
              <CardText>
                <i>{time2}</i>
              </CardText>
              <CardImg src={image2} className="img-fluid w-75" />
              <CardBody>
                <CardSubtitle></CardSubtitle>
                <CardText>{description2}</CardText>
                <CardText>
                  <i>{source2}</i>
                </CardText>
                <a href={url2}>
                  <Button>View Source</Button>
                </a>
              </CardBody>
            </Card>
            <Card className="p-5">
              <h3 className="mb-4">{title3}</h3>
              <CardText>
                <i>{author3}</i>
              </CardText>
              <CardText>
                <i>{time3}</i>
              </CardText>
              <CardImg src={image3} className="img-fluid w-75" />
              <CardBody>
                <CardSubtitle></CardSubtitle>
                <CardText>{description3}</CardText>
                <CardText>
                  <i>{source3}</i>
                </CardText>
                <a href={url3}>
                  <Button>View Source</Button>
                </a>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default News;
