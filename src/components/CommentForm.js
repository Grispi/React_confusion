import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const DishDetail = props => {
  if (typeof props.dish !== "undefined") {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <RenderCard dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 mt-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
              <RenderComments comments={props.comments} />
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

function RenderComments({ comments }) {
  if (comments != null) {
    var i = 0;
    const toReturn = comments.map(comment => {
      return (
        <div>
          <li key={i++}>
            <div className="comment">{comment.comment}</div>
            <div className="name-date">
              {comment.author} , {formatDate(comment.date)}
            </div>
          </li>
        </div>
      );
    });
    return (
      <div>
        {toReturn}
        <br />
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderCard({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function formatDate(date) {
  // var dateformat = require("dateformat");
  const dateToParse = new Date(date);
  return dateToParse, "mmm dd, yyyy";
}

export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    const required = val => val && val.length;
    const maxLength = len => val => !val || val.length <= len;
    const minLength = len => val => val && val.length >= len;
    return (
      <div>
        <Button className="glyphicon glyphicon-pencil" onClick={this.toggleModal}>
          Submit Comment
        </Button>
        <div className="col-12 col-md-19">
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody className="">
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={3}>
                    Rating
                  </Label>
                  <Col md={12}>
                    <Control.select model=".rating" type="select" name="select" id="select" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="name" md={3}>
                    Your Name
                  </Label>
                  <Col md={12}>
                    <Control.text
                      model=".author"
                      name="name"
                      id="name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required, ",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={3}>
                    Comment
                  </Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".comment"
                      className="form-control"
                      type="textarea"
                      name="comment"
                      id="comment"
                      rows="6"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={2}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DishDetail;
