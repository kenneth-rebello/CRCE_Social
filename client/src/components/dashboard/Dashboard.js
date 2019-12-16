import React ,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profile';
import {getConnectionPosts} from '../../actions/post';
import {setAlert} from '../../actions/alert'
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';

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
                    
                {!auth.loading && !profile.loading && <div className="user">
                    <h1 className="heading">{auth.user && auth.user.name }</h1>
                    {auth && !profile.loading && profile.profile !== null?
                        (<Fragment>
                            {auth.user && <Link to={`/profile/${auth.user._id}`} className="dash-link">View Profile</Link>}
                            <div className="dash-img">
                                {profile.profile.picture && <img src={require(`../../../public/profile-pictures/${profile.profile.picture}`)} alt=""/>}
                            </div>
                            {!profile.loading && profile.profile.position === 'Placement Officer' && <button className="btn btn-light"><Link to="/po_form">Create Eligibility List</Link></button>}
                            {!profile.loading && profile.profile.position === 'Faculty' && <button className="btn btn-light"><Link to="/add_event">Add Event</Link></button>}
                            {!auth.loading && auth.user && auth.user.admin && <button className="btn btn-light"><Link to="/admindash">Check Admin Dashboard</Link></button>}
                        </Fragment>) :
                        (<Fragment className="user-switch">
                            <Link to="/create_profile" className="dash-link">Create Profile</Link>
                            <p style={{padding:'5px'}}>You have not yet set up a profile, please add some information about yourself to get approved by an admin</p>
                        </Fragment>)
                    }
                </div>}
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