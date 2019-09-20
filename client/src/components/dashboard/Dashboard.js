import React ,{Fragment,useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profile';
import {getPosts} from '../../actions/post';
import {setAlert} from '../../actions/alert'
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';


const Dashboard = ({setAlert, getCurrentProfile, getPosts, auth, profile, post}) => {

    useEffect(() => {
        getCurrentProfile();
        getPosts();
    }, [getCurrentProfile, getPosts]);

    if(auth && auth.user && !auth.loading && auth.user.admin){
        return <Redirect to="/admindash"/>
    }
    
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
                    
                <div className="user">
                    <h1>Welcome</h1>
                    <h1 className="heading">{auth.user && auth.user.name }</h1>
                    {auth && !profile.loading && profile.profile !== null?
                        (<Fragment>
                            {auth.user && <Link to={`/profile/${auth.user._id}`} className="dash-link">View Profile</Link>}
                            <img src={`./public/profile-pictures/${profile.profile.picture}`} alt=""/>
                            {!profile.loading && profile.profile.position === 'Placement Officer' && <button className="btn btn-light"><Link to="po_form">Create Eligibility List</Link></button>}
                        </Fragment>) :
                        auth.user && auth.user.approved && (<Fragment className="user-switch">
                            <Link to="/create_profile" className="dash-link">Create Profile</Link>
                            <p style={{padding:'5px'}}>You have not yet set up a profile, please add some information about yourself</p>
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
       
export default connect(mapStateToProps, {setAlert, getPosts, getCurrentProfile})(Dashboard);