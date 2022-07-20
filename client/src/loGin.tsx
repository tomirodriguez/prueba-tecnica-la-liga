import { Component } from 'react';

export class LogiN extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: null,
      password: null,
    };
  }
  componentWillReceiveProps(nextProps, nextState) {}
  render() {
    console.log('state', this.state);
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '30px',
          backgroundColor: '#e4e4e4',
        }}
      >
        <div>
          <u>
            <strong>
              <span
                style={{
                  fontWeight: 'bolder',
                }}
              >
                LOGIN
              </span>
            </strong>
          </u>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch('http://localhost:4000/login', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.token) {
                  alert('El usuario es correcto');
                } else {
                  alert(JSON.stringify(data));
                }
              });
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            padding: '30px',
            backgroundColor: '#e4e4e4',
            rowGap: '15px',
          }}
        >
          <span>Email</span>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              let _email_input = e.target.value;
              this.setState({
                email: _email_input,
              });
            }}
          />
          <span>Password</span>
          <input
            type="text"
            name="password"
            onChange={(e) => {
              let _password_input = e.target.value;
              this.setState({
                password: _password_input,
              });
            }}
          />
          <input
            type="submit"
            style={{
              padding: '5px',
              border: '1px solid black',
              width: '80px',
            }}
          />
        </form>
      </div>
    );
  }
}
