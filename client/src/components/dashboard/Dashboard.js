import React ,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profile';
import {getPosts} from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';


const Dashboard = ({getCurrentProfile, getPosts, auth, profile, post}) => {

    useEffect(() => {
        getCurrentProfile();
        getPosts();
    }, [getCurrentProfile, getPosts]);


    
    return (
        profile.loading && profile.profile === null ? <Spinner /> : 
        
        <Fragment>
            <div className="dashboard">
                {post.loading? (<Spinner/>):
                <div className="posts">
                    <PostForm />
                    {post.posts.map(post => (
                        <PostItem key={post._id} post={post}/>
                    ))}
                </div>}
                <div className="user">
                    <h1>Welcome</h1>
                    <h1 className="heading">{auth.user && auth.user.name }</h1>
                    {profile.profile !== null?
                        (<Fragment>
                            <img src={profile.profile.photo} alt=""/>
                            {auth.user && <Link to={`/profile/${auth.user._id}`} className="dash-link">View Profile</Link>}
                        </Fragment>) :
                        (<Fragment>
                            <p>You have not yet set up a profile, please add some information about yourself</p>
                            <Link to="/create_profile" className="btn btn-primary">Create Profile</Link>
                        </Fragment>)
                    }
                </div>
            </div>
        </Fragment>
    );
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
});
       
export default connect(mapStateToProps, {getPosts, getCurrentProfile})(Dashboard);