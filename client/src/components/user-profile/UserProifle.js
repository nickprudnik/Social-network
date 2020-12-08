import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { getUserById, editProfile, uploadImage } from '../../actions/user';
import Loader from '../shared/Loader';
import ProfileImage from '../shared/ProfileImage';
import Subscription from './Subscription';
import "./user.css";

class UserProfile extends Component {
  constructor() {
    super()
    this.state = { 
      isLookPosts: false,
      isChanges: false,
      isProfileImageChanged: false,
      user: {
        name: "",
        dateOfBirth: "",
        website: "",
        bio: "",
        phoneNumber: "",
        gender: "",
        avatarUrl: "",
      },
      userImage: ""
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.user.isLoading && nextProps.user.user == null) {
      this.props.history.push('/404')
    }
  }

  onBodyChange = (data) => {
    const key = data.target.id;
    const { user } = this.state;
    user[key] = data.target.value;
    this.setState({ user, isChanges: true });
  };

  handleOnChange = (phoneNumber) => {
    const { user } = this.state;
    user.phoneNumber = phoneNumber;
    this.setState({ user, isChanges: true });
  };

  onRadioChange = (data) => {
    const { user } = this.state;
    user.gender = data.target.value;
    this.setState({ user, isChanges: true });
  };

  onChangeHandler = event => {
    this.setState({ isProfileImageChanged: true })
    const { user } = this.state;
    user.avatarUrl = event.target.files[0].name;
    let userImage = this.state;
    userImage = event.target.files[0];
    this.setState({ userImage, user, isChanges: true });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.isProfileImageChanged) {
      this.props.uploadImage(this.state.userImage);
    }
    this.props.editProfile(this.state.user);
    this.setState({ isChanges: false, isProfileImageChanged: false });
  };

  render() {
    const { user: { user, isLoading }, auth } = this.props
    return !isLoading && user !== null ? (
      <>
        {(auth.user.id == user._id) && (
          <div className="row mt-5">
          <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                  <div className="upload-image">
                    <div className="col-sm-12 col-form-label image-container"><ProfileImage user={user} width="50" /></div>
                      {auth.user.id == user._id && (
                          <div className="profile-image-input">
                            <input type="file" id="avatarUrl" accept="png jpg jpeg" onChange={this.onChangeHandler}></input>
                          </div>
                      )}
                  </div>
                  <div className="row">
                    <label className="col-sm-2 col-form-label registered-date">Name</label>
                    <div className="col-sm-10 input-wrapper">
                      <input
                        className="form-control name-input"
                        placeholder="Name"
                        id="name"
                        value={this.state.user.name}
                        onChange={this.onBodyChange}
                      />
                    </div>
                  </div>
                  <div className="row">
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
                  </div>
                  <div className="row">
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
                  </div>
                  <div className="row">

                  </div>
                  <div className="row">
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
                  </div>
                  <div className="row">
                  <label className="col-sm-2 col-form-label registered-date">Phone Number</label>
                      <div className="col-sm-10 input-wrapper">
                        <PhoneInput
                          className="custom-tel-input"
                          name="phoneNumber"
                          type="text"
                          country={"by"}
                          id="phoneNumber"
                          enableAreaCodes={true}
                          onlyCountries={["by"]}
                          value={this.state.user.phoneNumber}
                          onChange={this.handleOnChange}
                        />
                      </div>
                  </div>
                  <div className="row">
                    <label className="col-sm-2 col-form-label registered-date">Gender</label>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="genderMale" name="gender" className="custom-control-input" 
                          value="Male" onChange={this.onRadioChange} checked={this.state.user.gender == "Male"}/>
                        <label className="custom-control-label registered-date" htmlFor="genderMale">Male</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="genderFemale" name="gender" className="custom-control-input" 
                          value="Female" onChange={this.onRadioChange} checked={this.state.user.gender == "Female"}/>
                        <label className="custom-control-label registered-date" htmlFor="genderFemale">Female</label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="genderOther" name="gender" className="custom-control-input" 
                          value="Other" onChange={this.onRadioChange} checked={this.state.user.gender == "Other"}/>
                        <label className="custom-control-label registered-date" htmlFor="genderOther">Other</label>
                      </div>
                  </div>
                    {this.state.isChanges && <div className="col-md-12 col-lg-6 mx-auto buttons-wrapper"><button type="submit" className="btn btn-outline-success submit-edit edit-button-profile">Save</button>
                    </div>}
                  </form>
                <div className="text-center registered">
                  <p className="registered-date">
                    <strong>Registered: </strong>
                    {new Date(user.createdDate).toDateString()}
                  </p>
                </div>
          </div>
        </div>
        )}
        {!(auth.user.id == user._id) && (
          <div className="row mt-5">
            <div className="col-md-6 mx-auto">
              <div className="row">
                <div className="col-8">
                  <h2 className="profile-username">{user.name}</h2>
                  <p className="profile-username">
                    <strong>Registered: </strong>
                    {new Date(user.createdDate).toDateString()}
                  </p>
                </div>
                <div className="col-4 text-center">
                  <div className="col-sm-2 col-form-label image-container"><ProfileImage user={user} /></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!(auth.user.id == user._id) && (
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
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth
})

export default connect(mapStateToProps, { getUserById, editProfile, uploadImage })(UserProfile)
