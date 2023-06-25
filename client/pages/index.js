

const LandingPage = ({ currentUser }) => {
  // console.log(currentUser);
  // axios.get('/api/users/currentuser');

    return currentUser? <h1>You are Signed in</h1> : <h1>Please Sign in</h1>


};

LandingPage.getInitialProps = async (context) => {
    return {};
};

export default LandingPage;
