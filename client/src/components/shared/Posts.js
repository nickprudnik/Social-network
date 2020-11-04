import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "./../layout/index.css";

import { UPDATE_POSTS } from '../../actions/types';
import { getAll } from '../../actions/post';

import Post from './Post';
import Loader from './Loader';

const LIMIT = 10;

class Posts extends React.Component {

  constructor() {
    super()
    this.state = { activePage: 1 }
  }

  componentDidMount() {
    this.props.getAll()
  }

  onPageChange = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.getAll(this.getQueryParams())
    })
  }

  render() {
    const { isLoading, posts, totalCount } = this.props.post;
    return (
      <>
        {isLoading && <Loader />}
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
