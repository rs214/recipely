import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  onLoginPress = () => {
    dismissKeyboard();
    const { username, password } = this.state;
    fetch('https://jellyfiish-recipely.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    }).then(res => {
      if (res.status === 401) {
        res.text().then(error => this.setState({error}));
      } else {
        res.json().then(token => {
          this.setState({error: null});
          console.log(token);
        });
      }
    });
  };

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>recipely</Text>
          <Text>Shazam for food</Text>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <TextInput
              ref="1"
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
              onSubmitEditing={() => this.focusNextField('2')}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="2"
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              returnKeyType="done"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
            />
          </View>

          { this.state.error &&
            <Text style={styles.error}>{this.state.error}</Text>
          }

          <View style={styles.button}>
            <Button
              title="Login"
              onPress={this.onLoginPress}
            />
          </View>

          <View style={styles.button}>
            <Button
              title="Signup"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={{flex: 3}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginVertical: 5,
  },
  error: {
    color: 'red'
  },
});

export default AuthScreen;
