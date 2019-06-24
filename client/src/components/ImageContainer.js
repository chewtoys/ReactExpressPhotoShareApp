import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Image from './Image';
import Axios from '../Axios';
import {compose} from 'redux';
import moment from 'moment';
import Comment from './Comment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {connect} from 'react-redux';
import {postComment} from '../actions/imageActions';
import {withStyles} from '@material-ui/core/styles';
import imageStyles from '../styles/imageStyles';
class ImageContainer extends React.Component{
    state = {
      isComment: false,
      comment_body: ""
    }
    handleCommentChange = (e) => {
        this.setState({
           comment_body: e.target.value
        })             
    }
    writeComment = (id)  => {
        this.setState({
            isComment: this.state.isComment ? '' : id // check if you state is filled to toggle on/off comment
        })   
    }
    commentSubmit = (event, id) => {
        event.preventDefault();
        console.log(this.state.comment_body); // doesn't get console.log
        // note that commentBody is being used for the req.body as well so its called by req.body.commentBody
        const commentBody = this.state.comment_body
        const data = {   
            commentBody,
            id
        }   
        this.props.postComment(data);
        this.setState({
            comment_body: ''
        })
    
    }
    render(){
       const { img, deleteImg, classes } = this.props
       return(
           <Grid item sm={12} md={12} className={classes.imageGridItem}>
               <Paper className={classes.imageContainerPaper}>
         {/* // empty image_title */}
               <Typography className={classes.imageTypographyTitle} variant="h4" align="center">{img.image_title}</Typography> 
               <Divider className={classes.imageDivider} variant="middle" />
               <Image image_url={img.img_url} />   
               <Typography variant="h6" align="center">{img.user.username}</Typography> 
               <Typography variant="h6" align="center">{moment(img.created_at).calendar()}</Typography> 
               <Button onClick ={() => this.writeComment(img.id)} variant="outlined" component="span" color="primary"> 
            {this.state.isComment === img.id ? "Close" : "Write A Comment"}
               </Button>
            {/* here were prevent comments being selected for all items in the array, renders the comment form you clicked on.  */}
            {this.state.isComment === img.id ?
            // if you want to pass a paramter and need use e.preventDefault this is how you would do it. 
               <Comment onSubmit={(e) => this.commentSubmit(e, img.id)} 
                            commentBody={this.state.comment_body } 
                            commentChange={this.handleCommentChange}/> 
            : null}
            {/* hide delete button when user enters comment */}
            {!this.state.isComment ? <Button className={classes.deleteButton} onClick={deleteImg} variant="outlined" component="span" color="primary">
                Delete
            </Button> : null}
            {/* image comments */}
            {/* if have comments show Comments */}
            {img.comments.length > 0 ? <Typography className={classes.commentsTitle}  variant="h6" align="left">Commments </Typography> : null }
            <div className={classes.commentsBody}>
            {img.comments.length > 0 ? (
                img.comments.map( (comment, i) => (
                    <div  key={i}>  
                        <List>
                        <ListItem alignItems="center"> 
                                <Typography color="primary" variant="body1">
                                    {comment.comment_body}
                                </Typography>  
                        </ListItem>
                        <Typography className={classes.commentUsername} variant="caption" align="left">{comment.user.username}</Typography> 
                        <Typography className={classes.commentDate} variant="caption" align="right">{moment(comment.created_at).calendar()}</Typography> 
                        
                        <Divider variant="fullWidth" component="li" />
                        </List>
                    </div>       
                ))
            ):(
                <div>
                    <Typography className={classes.noCommentYet}>No Commments Yet</Typography>
                </div>
            )}
            </div>
           
            </Paper>                              
        </Grid>        
      )
   }
}
const mapStateToProps = (state) => ({
    image: state.image
 })
 const mapDispatchToProps = (dispatch) => ({
    postComment: (data) => dispatch(postComment(data))
 })
 export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(imageStyles))(ImageContainer)
 