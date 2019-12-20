import React ,{Fragment,useEffect} from 'react';
import './dashboard.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import {getConnectionPosts} from '../../actions/post';
import {setAlert} from '../../actions/alert'
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';
import UserBox from './UserBox';

const Dashboard = ({getCurrentProfile, getConnectionPosts, auth, profile, post}) => {

    useEffect(() => {
        document.title = 'Edu-Social'
    },[]);

    useEffect(() => {
        getCurrentProfile();
        getConnectionPosts();
    }, [getCurrentProfile, getConnectionPosts]);

    
    return (
        profile.loading && profile.profile === null ? <Spinner /> : 
        
        <Fragment>
            <div className="dashboard">
                {auth.user && auth.user.approved ? (<Fragment>
                    {post.loading? (<Spinner/>):
                    <div className="posts">
                        <PostForm />
                        {post.posts.map(post => (
                            <PostItem key={post._id} post={post}/>
                        ))}
                    </div>}
                </Fragment>) : (<Fragment>
                    <h1 className="heading">You are not yet approved by admin, please wait while your account is reviewed</h1>
                </Fragment>)}

                <UserBox/>  
                
            </div>
        </Fragment>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getConnectionPosts: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
});
       
export default connect(mapStateToProps, {setAlert, getConnectionPosts, getCurrentProfile})(Dashboard);