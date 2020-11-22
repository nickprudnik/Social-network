import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Quill from 'react-quill'

import { remove } from '../../../actions/post'
import { edit } from '../../../actions/post'

import Like from './Like'
import PostImage from '../PostImage'
import "./post.css"

class Post extends React.Component {
  constructor() {
    super()
    this.state = { isEdit: false }
  }

  onDelete = () => this.props.remove(this.props.post._id)

  onEdit = () => this.setState({ isEdit: true })

  onChangeBody = (data) => this.props.post.body = data

  onSubmit = (e) => {
    e.preventDefault()
    this.props.edit(this.props.post)
    this.setState({ isEdit: false })
  }

  onCancelEdit = (e) => {
    e.preventDefault()
    this.setState({ isEdit: false })
  }

  render() {
    const { post, auth, TYPE } = this.props
    return (
      <div className="card mb-4">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="mr-2">
                <Link to={'/user/' + post.user._id}>
                  <PostImage user={post.user} width="50" />
                </Link>
              </div>
              <div className="ml-2">
                <div className="h5 m-0">{post.user.name}</div>
                <div className="h7 text-muted">
                  <i className="fa fa-clock-o"></i> {new Date(post.createdDate).toDateString()}
                </div>
              </div>
            </div>
            {auth.isAuthenticated && auth.user.name === post.user.name && (
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle" type="button" id="drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop">
                  <a className="dropdown-item" role="button" onClick={this.onDelete}>Remove</a>
                  <a className="dropdown-item" role="button" onClick={this.onEdit}>Edit</a>
                </div>
              </div>
            )}
          </div>
        </div>
        {!this.state.isEdit && <div className="card-body">{this.props.post.body.replace(/<[^>]+>/g, '')}</div>}
        {this.state.isEdit && <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Quill
                theme="snow"
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'image', 'video'],
                    ['clean']
                  ]
                }}
                autoFocus
                defaultValue={this.props.post.body}
                value={this.props.post.body}
                onChange={this.onChangeBody}
              />
            </div>
            <div className="btn-group float-right">
              <button onClick={this.onCancelEdit} className="btn btn-outline-secondary submit-edit">Cancel</button>
              <button type="submit" className="btn btn-outline-success submit-edit">Save</button>
            </div>
          </form>}
        <div className="card-footer">
          <Like postId={post._id} likes={post.likes} TYPE={TYPE} />
          <Link to={'/post/' + post._id} className="card-link">
            <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { remove, edit })(Post)