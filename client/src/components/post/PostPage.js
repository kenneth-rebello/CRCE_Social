import React ,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {deletePost, addLike, removeLike} from '../../actions/post';
import {approvePost} from '../../actions/admin';
import PostImage from '../posts/PostImage'


const PostPage = ({auth, post, addLike, removeLike, approvePost, deletePost}) => {

    useEffect(() => {
        window.$('.modal').modal();
    },[])


    let { _id, text, upload, approved, name, picture, user, likes, date } = post;

    return (
        <Fragment>
        {auth && !auth.loading &&  post? 
        (<Fragment>
            <div className="post">
                <div>
                    <Link to={`/profile/${user}`} className="post-user">
                    <div>
                        {picture && <img className="item-img" src={require(`../../../public/profile-pictures/${picture}`)} alt=""/>}
                    </div>
                    <h1 className="heading">{name}</h1>
                    </Link>
                </div>
        
                <div className="post-data">
                    <p className="post-text">{text}</p>
                    {upload && <PostImage upload={upload}/>}
                    <p className="post-date">
                        Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
                    </p>
                    <div>
                        { approved && auth && auth.user && (<Fragment>
                            { likes.filter(like => like.user._id === auth.user._id).length>0 ? (
                                <button type="button" className="btn btn-red" onClick={() => removeLike(_id)}>
                                <span><i class="fa fa-thumbs-down"></i></span>{` `}
                                </button>
                            ):(
                                <button type="button" className="btn btn-green" onClick={() => addLike(_id)}>
                                <span><i class="fa fa-thumbs-up"></i></span>{ ` `}
                                </button>)
                            }
                            <span className="likes">{likes.length} Likes</span>
                        </Fragment>)}
                        {auth && auth.user && !auth.loading && (user === auth.user._id || ( auth.user && auth.user.admin)) &&
                            <Fragment>
                                <button data-target="modal1" class="btn btn-light modal-trigger">Show all likes</button>
                                <button type="button" className="btn btn-red" style={{float:'right'}} onClick={e => deletePost(_id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </Fragment>
                        }
                        {auth.user.admin && !approved &&
                            <button onClick={() => approvePost(_id)} className="btn btn-green">Approve</button>
                        }
                    </div>
                </div>
            </div>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4 className='heading'>Likes</h4>
                    <table>
                        {likes.length> 0 && likes.map((like) => (
                            <Fragment>
                                <tr>
                                    <td><Link to={`/profile/${like.user._id}`}>{like.user.name}</Link></td>
                                </tr>
                            </Fragment>
                        ))}
                    </table>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        </Fragment>
        ) :
        (<Fragment>
            <Spinner/>
        </Fragment>)}
        </Fragment>
    )
}

PostPage.propTypes = {
    post:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    approvePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike, approvePost})(PostPage)
