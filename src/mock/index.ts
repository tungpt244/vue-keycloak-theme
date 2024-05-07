export const MOCK_CONTEXT = {
  urls: {
    loginResetCredentials:
      '/realms/test-theme/login-actions/reset-credentials?client_id=account-console&amp;tab_id=dtIwwCO_Jkk',
    login: '/realms/test-theme/login-actions/authenticate?client_id=account-console&amp;tab_id=dtIwwCO_Jkk',
    registration: '/realms/test-theme/login-actions/registration?client_id=account-console&amp;tab_id=dtIwwCO_Jkk',
    loginAction:
      'http://localhost:8080/realms/test-theme/login-actions/authenticate?session_code=4g0b_PzpVHGza0I5XjDchhiO69hZ3OonarqtiyC6uqo&amp;execution=19763e57-0942-4647-8cfc-cce1eae957e6&amp;client_id=account-console&amp;tab_id=dtIwwCO_Jkk',
    registrationAction:
      'http://localhost:8080/realms/test-theme/login-actions/authenticate?session_code=4g0b_PzpVHGza0I5XjDchhiO69hZ3OonarqtiyC6uqo&amp;execution=19763e57-0942-4647-8cfc-cce1eae957e6&amp;client_id=account-console&amp;tab_id=dtIwwCO_Jkk',
    resourcesPath: '/resources/ithev/login/test',
  },
  titles: {
    loginProfileTitle: 'Update Account Information',
    loginAccountTitle: 'Sign in to your account',
    registerTitle: 'Register',
    emailForgotTitle: 'Forgot Your Password?',
    confirmLinkIdpTitle: 'Account already exists',
    emailLinkIdpTitle: 'Link null',
  },
  permissions: {
    usernameEditDisabled: false,
    loginWithEmailAllowed: true,
    registrationEmailAsUsername: false,
    rememberMe: false,
    resetPasswordAllowed: true,
    password: true,
    registrationAllowed: true,
    registrationDisabled: false,
    passwordRequired: false,
  },
  labels: {
    firstName: 'First name',
    lastName: 'Last name',
    username: 'Username',
    usernameOrEmail: 'Username or email',
    email: 'Email',
    password: 'Password',
    passwordConfirm: 'Confirm password',
    rememberMe: 'Remember me',
    doForgotPassword: 'Forgot Password?',
    doLogIn: 'Sign In',
    doSubmit: 'Submit',
    noAccount: 'New user?',
    doRegister: 'Register',
    backToLogin: '« Back to Login',
    confirmLinkIdpContinue: 'Add to existing account',
    doClickHere: 'Click here',
  },
  forms: {
    loginUsername: '',
    loginRememberMe: false,
    selectedCredential: '',
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerUsername: '',
  },
  user: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  validations: {
    firstName: '',
    lastName: '',
    email: '',
    usernameOrPassword: '',
    username: '',
    password: '',
    passwordConfirm: '',
  },
  message: {
    type: '',
    sumary: '',
  },
  social: [
    {
      alias: 'google',
      displayName: 'Google',
      loginUrl:
        '/realms/test-theme/broker/google/login?client_id=account-console&amp;tab_id=dtIwwCO_Jkk&amp;session_code=4g0b_PzpVHGza0I5XjDchhiO69hZ3OonarqtiyC6uqo',
    },
  ],
}