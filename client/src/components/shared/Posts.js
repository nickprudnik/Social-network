import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from "socket.io-client";
import "./../layout/index.css";

import { UPDATE_POSTS } from '../../actions/types';
import { getAll } from '../../actions/post';

import Post from './Post';
import Loader from './Loader';

let socket;
class Posts extends React.Component {

  constructor() {
    super()
    this.state = { 
      activePage: 1, 
      postCollectionHasUpdated: false,
      ENDPOINT: 'http://localhost:3000/'
    }
    socket = io(this.state.ENDPOINT);
    socket.on('RefreshPostsPage',  (data) => {
      this.updateCodeFromSockets(data);
    });
  };

  updateCodeFromSockets(data) {
    this.setState({postCollectionHasUpdated: true})
  };

  componentDidMount() {
    this.props.getAll()
  };

  onPageChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.getAll(this.getQueryParams())
    })
  };

  updatePosts = () => {
    this.props.getAll()
    this.setState({postCollectionHasUpdated: false})
  };

  render() {
    const { isLoading, posts, totalCount } = this.props.post;
    return (
      <>
        {isLoading && <Loader />}
        {this.state.postCollectionHasUpdated && 
          <button type="button" className="btn btn-outline-success mb-4 update-button" onClick={this.updatePosts}>We have new posts for you!</button>
        }
        {!isLoading && totalCount === 0 && posts.length === 0 && (
            <div className="text-center info-message">
              <h2>There is nothing</h2>
          </div>
        )}
        {posts.map((p) => <Post post={p} key={p._id} TYPE={UPDATE_POSTS} />)}
      </>
    )
  }
}

Posts.propTypes = {
  getAll: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  queryParams: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getAll })(Posts)
