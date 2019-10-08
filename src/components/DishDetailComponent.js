import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }
  renderDish(selectedDish) {
    if (selectedDish != null) {
      return (
        <Card>
          <CardImg width="100%" src={selectedDish.image} alt={selectedDish.name} />
          <CardBody>
            <CardTitle>{selectedDish.name}</CardTitle>
            <CardText>{selectedDish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
  renderComments(selectedDish) {
    if (selectedDish != null) {
      const commentsDish = selectedDish.comments.map(comment => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, {comment.date}
            </p>
          </li>
        );
      });
      return (
        <div>
          <h3>Comments</h3>
          <ul className="list-unstyled">{commentsDish}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">{this.renderDish(this.props.selectedDish)}</div>
        <div className="col-12 col-md-5 m-1">{this.renderComments(this.props.selectedDish)}</div>
      </div>
    );
  }
}

export default DishDetail;
