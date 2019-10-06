import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import LazyLoad from 'react-lazyload';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Comment from './Comment/Comment';
import Image from './Image/Image';
import CommentList from './CommentList';
class ImageContainer extends React.Component {
    state = {
      isComment: false,
      comment_body: '',
      heart: false,
    }
    handleCommentChange = (e) => {
      this.setState({
        comment_body: e.target.value,
      });
    }
    // handles opening up the comment component when writeComment is executed
    writeComment = (id) => {
      this.setState({
        isComment: this.state.isComment ? '' : id, // check if state is filled to toggle on/off comment section 
      });
    }
    postLike = (e, id) => {
      e.preventDefault();
      this.setState({
        heart: !this.state.heart,
      });
      const newHeart = true;
      const newData = {
        id, newHeart,
      };
      if (this.state.heart) {
        this.props.postLike(newData);
      } else {
        this.props.postDislike(newData)
      }
    }
    commentSubmit = (event, id) => {
      event.preventDefault();
      console.log(this.state.comment_body); // doesn't get console.log
      // note that commentBody is being used for the req.body as well so its called by req.body.commentBody
      const commentBody = this.state.comment_body;
      const data = {
        commentBody,
        id,
      };
      if(this.props.postComment(data)){
          this.setState({
            isComment: false, // hides comment component when data is submitted
            comment_body: ''
          })
      }
    }
    render() {
      const {
        img, deleteImg, postLike, classes,  user:{ username }, liked
      } = this.props;
      return (
        <Grid item sm={12} md={12} className={classes.imageGridItem}>
          <LazyLoad throttle={200} height={600}>
            <Paper className={classes.imageContainerPaper}>
              {/* // empty image_title */}
              <Typography className={classes.imageTypographyTitle} variant="h4" align="center">{img.image_title}</Typography>
              <Divider className={classes.imageDivider} variant="middle" />
              <Image image_url={img.img_url} />
              <Typography variant="h6" align="center">{username}</Typography>
              <Typography variant="h6" align="center">{moment(img.created_at).calendar()}</Typography>
              <Button onClick={() => this.writeComment(img.id)} variant="outlined" component="span" color="primary">
                {this.state.isComment === img.id ? 'Close' : 'Write A Comment'} 
              </Button>
              {/* here were prevent comments being selected for all items in the array, renders the comment form you clicked on.  */}
              {this.state.isComment === img.id
              // if you want to pass a paramter and need use e.preventDefault this is how you would do it.
                ? (
                  <Comment
                    onSubmit={e => this.commentSubmit(e, img.id)}
                    commentBody={this.state.comment_body}
                    commentChange={this.handleCommentChange}
                  />
                )
                : null}
              {/* hide delete button when user enters comment */}
              {/* if user_id is equal too the current_user id, user can delete there post. */}
              {this.props.auth.current_user.user.id === img.user_id ? (
                <span>
                  {!this.state.isComment ? (
                    <Button className={classes.deleteButton} onClick={deleteImg} variant="outlined" component="span" color="primary">
                    Delete
                    </Button>
                  ) : null}
                </span>
              ) : (
                null
              )}
              <span className={classes.likeButton} onClick={e => this.postLike(e, img.id)} style={{ cursor: 'pointer' }}>
                {this.state.heart
                  ? (
                    <span>
                      <Favorite style={{ color: 'tomato' }} />
                    </span>
                  )
                  : (
                    <span>
                      <FavoriteBorder />
                    </span>
                  ) }
                  {img.likeCount === '0' ? 'No Likes' : img.likeCount}
              </span>
              {/* image comments */}
              {/* if have comments show Comments */}
              {img.comments.length > 0 ? <Typography className={classes.commentsTitle} variant="h6" align="left">Commments </Typography> : null }
              <CommentList comments ={img.comments} classes={classes} />
            </Paper>
          </LazyLoad>
        </Grid>
      );
    }
}
ImageContainer.propTypes = {
  postComment: PropTypes.func.isRequired,
  postLike: PropTypes.func.isRequired,
};
export default ImageContainer;
