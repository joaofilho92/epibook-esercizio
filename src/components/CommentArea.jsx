import { Component } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { Alert } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: []
  };

  request = async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJiNWVkMDBlNzg3MDAwMTRkODkyNGYiLCJpYXQiOjE2ODA1NjM5MjAsImV4cCI6MTY4MTc3MzUyMH0.eAjGNey-Ewqk5QFIG3GBI8-ryINKnyYxFfNu8aaCLh4"
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({ comments: data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.request();
  }

  render() {
    return (
      <>
        <AddComment asin={this.props.asin} />
        {this.state.comments.length > 0 ? (
          <CommentsList comments={this.state.comments} />
        ) : (
          <Alert variant="warning">Nessun commento trovato</Alert>
        )}
      </>
    );
  }
}

export default CommentArea;
