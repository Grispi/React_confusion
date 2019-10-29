import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});
export const postComment = (dishId, rating, author, comment) => dispatch => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();
  return (
    fetch(baseUrl + "comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            // When the response is an Error:
            var error = new Error("Error " + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
          }
        },
        // When the server doesn't even respond: -> error handler here:
        error => {
          // error.message throw some information about the error.
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then(response => response.json())
      .then(response => dispatch(addComment(response)))
      // An error will cause a rejected promise: Inside the catch we will receive the error.
      .catch(error => {
        console.log("Post comments ", error.message);
        alert("Your comment could not be posted\nError: " + error.message);
      })
  );
};
export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading(true));

  return (
    fetch(baseUrl + "dishes")
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            // When the response is an Error:
            var error = new Error("Error " + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
          }
        },
        // When the server doesn't even respond: -> error handler here:
        error => {
          // error.message throw some information about the error.
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then(response => response.json())
      .then(dishes => dispatch(addDishes(dishes)))
      // An error will cause a rejected promise: Inside the catch we will receive the error.
      .catch(error => dispatch(dishesFailed(error.message)))
  );
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          // When the response is an Error:
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      },
      // When the server doesn't even respond: -> error handler here:
      error => {
        // error.message throw some information about the error.
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          // When the response is an Error:
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      },
      // When the server doesn't even respond: -> error handler here:
      error => {
        // error.message throw some information about the error.
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
