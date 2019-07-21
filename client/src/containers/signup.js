import SignUp from '../components/SignUp';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);