import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getUserById, editProfile } from '../../actions/user';
import Loader from '../shared/Loader';
import ProfileImage from '../shared/ProfileImage';
import Subscription from './Subscription';
import "./user.css"

class UserProfile extends Component {
  constructor() {
    super()
    this.state = { 
      isLookPosts: false,
      isChanges: false,
      user: {
        name: "",
        dateOfBirth: "",
        website: "",
        bio: "",
        phoneNumber: "",
        gender: ""
      }
    }
  }

  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.user && prevProps.user.user !== this.props.user.user) {
      this.setState({ user: this.props.user.user })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.isLoading && nextProps.user.user === null) {
      this.props.history.push('/404')
    }
  }

  onBodyChange = (data) => {
    const key = data.target.id;
    const { user } = this.state;
    user[key] = data.target.value;
    this.setState({ user, isChanges: true });
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.editProfile( this.state.user )
    this.setState({ isChanges: false })
  }

  render() {
    const { user: { user, isLoading }, auth } = this.props
    return !isLoading && user !== null ? (
      <>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="row">
                <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                      <label className="col-sm-2 col-form-label registered-date"><ProfileImage user={user} /></label>
                      <div className="col-sm-10 input-wrapper">
                      <input
                        className="form-control name-input"
                        placeholder="Name"
                        id="name"
                        value={this.state.user.name}
                        onChange={this.onBodyChange}
                      />
                      </div>
                      <label className="col-sm-2 col-form-label registered-date">Date Of Birth</label>
                      <div className="col-sm-10 input-wrapper">
                        <input
                          className="form-control"
                          placeholder="Date Of Birth"
                          id="dateOfBirth"
                          type="date"
                          value={moment(this.state.user.dateOfBirth).format('YYYY-MM-DD')}
                          onChange={this.onBodyChange}
                        />
                      </div>
                      <label className="col-sm-2 col-form-label registered-date">Website</label>
                      <div className="col-sm-10 input-wrapper">
                        <input
                          className="form-control"
                          placeholder="Website"
                          id="website"
                          value={this.state.user.website}
                          onChange={this.onBodyChange}
                        />
                      </div>
                      <label className="col-sm-2 col-form-label registered-date">Bio</label>
                      <div className="col-sm-10 input-wrapper">
                        <textarea 
                          className="form-control"
                          placeholder="Bio"
                          id="bio"
                          value={this.state.user.bio}
                          onChange={this.onBodyChange}
                        />
                      </div>
                      <label className="col-sm-2 col-form-label registered-date">Phone Number</label>
                      <div className="col-sm-10 input-wrapper">
                        <input
                          className="form-control"
                          placeholder="Phone Number"
                          type="tel"
                          id="phoneNumber"
                          value={this.state.user.phoneNumber}
                          onChange={this.onBodyChange}
                        />
                      </div>
                      <label className="col-sm-2 col-form-label registered-date">Gender</label>
                      <div className="col-sm-10 input-wrapper">
                        <input
                          className="form-control"
                          placeholder="Gender"
                          id="gender"
                          value={this.state.user.gender}
                          onChange={this.onBodyChange}
                        />
                      </div>
                    {this.state.isChanges && <div className="col-md-4 mx-auto buttons-wrapper"><button type="submit" className="btn btn-outline-success submit-edit">Save</button>
                    </div>}
                    </div>
                  </form>
                <div className="text-center registered">
                  <p className="registered-date">
                    <strong>Registered: </strong>
                    {new Date(user.createdDate).toDateString()}
                  </p>
                </div>
            </div>
          </div>
        </div>
        {!(auth.user.id === user._id) && (
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <div className="col-4 mx-auto">
                <Subscription userId={user._id} />
              </div>
            </div>
          </div>
        )}
      </>
    ) : <Loader />
  }
}

UserProfile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, { getUserById, editProfile })(UserProfile)
