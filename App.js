import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { ToolbarAndroid } from 'react-native';
import { KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Dialogflow_V2 } from 'react-native-dialogflow-text';

const BOT_USER = {
  _id: 2,
  name: 'CESI'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let firstMsg = {
      _id: 1,
      text: 'Hi, Im CESI, Whats up',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'CESI'
      }
    };
    this.state = {
      messages: [firstMsg]
    };
  }
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      'dialogflow-ohprpm@chatty-46836.iam.gserviceaccount.com',
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDXeR5AgPeXdr+2\nd7r7QAZvkX9sYRc5YpUng24O4KtApOkju9bQ0rBb9+gZCxZ+3Rmywqu71u5bru/l\n8wJZEOO943Ft1HvfDyj2MtZWTJdfgLX2e1gW2sLIwAM//QjI0I2fqiaOnKMflXtC\nX+kj9LVPXvlgk2XDbq3oV26fzRj4d56S0pUJihXzCr7AZL6E/phBzB9J5uwXxTWu\nqX91J/rhAG7cuD3TAQXHRzvuVn5AgOq5ohmCVkjnboQBPxYhVJYQei1gJ/++ecHD\nsGjXxYv5D6wqNSLO5C858BRvhBKcvPMy5HkVn9x1a24Gtrv0ILw/VvCwOKyTXelQ\nHt4vKz2JAgMBAAECggEAGAGE9s/HhebzfftB6DseXHC73xHEGh8bGf9hFCRAwB9/\nX/1N9g77Ggv5Hk0ncPPmKI3avz83aByJ2rcjxFOG5AGCgieBs3zHZgKM8alv1fKL\nk03zpvwxZldKJWdmAqWFmcvFpu7Zl6u6Q09XNKvPRWwB4ZoaZNcgZfnTt9cMWKYa\nmlfLeqsJF0VgHqbFe0QKju//YtV+6vqBneEiCEYRdwUYUljkG+uJR58fZZOiglYP\nzGpZOrQThIgrKzNpbHPUW/x7vz0hNjSE2WocTTnxEFNkij5+VkyaMqslpG/QpuPh\nNHGKylwyU7rtLQM+7Wn/EnNIocbuzZcT9PUpzf5IQQKBgQD8lfmzBlAu9Ytrkdhe\nBVrnm3+JkbDXEssBXhF436eo9mt4J6X63FgjOeYArnu12EqXC0SMEA/1BQ+I3U3T\nRJJzn4P9fJwMpj286PcVFNhbP1lbbyHOKKk7tfcpF/1I9djgwBzzH6VyFL+5vJco\nEQecK2icsWyIVmzzFKjRX+pEuQKBgQDaYriq8zzbHHmmGdA7wMhRVhO0Pw+lZxla\nXD4zqJauQ8IX153lCntVVl8/9Uux2J3AwfEnzUh554k5C7HZNbwpxojFJ41oB6Ry\ndVP+E83sS0DLbEYqq7Oz0TNElmSVEgCFXjCTg/WWijWfAmz+v5Dyn21npSA7tfWf\nk7lFVyX3UQKBgQDib5DqbT502quiQ500rJhSCZTMP0/Jf49+KlZ/hgFH96Fgliq2\nOdLJwZ3v/nvpCX3U6sUIy12Cyoaiq8KZI2AnR1mMZal/rYirUi4vOAC9zIzO61Hi\n/5C3dumcbWUjg0JqOc+6JSSsoO1AFVFtGdc4qbGex3AEyXXidSLikJn0AQKBgAr2\njcK3N0TgpxK5lQSK5wN+SLrxt31cMZ+hpdW+DuJssF+2CU0oO4zLKzjwvX4OG81D\nbzHKUmscPn1IowL+eZW3S8Jp++VPDOhaD39fyySjmnsb0mHuALV0ORimXCJHpxMK\n6XFeXIPUKGD1JDedsk8bxchAN+AHgG8kYVajy1ohAoGBAKrRpPDMdzOoF3LaPCMJ\nH+JJbfpykGI/i7x8yPADIUm9SXjvVJkfBKq/2zu2a/HRGJWMBCZIJ7JmbRzvIDd6\nr5RsV8muRRre3qbKbWPibwAmIqUAlPaM5kQhuXSZtCNkmH6/fkNo0JT19LswoKEp\nqO3FrH6TEti5z4GgMkUaOWS0\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_ENGLISH_US,
      'chatty-46836'
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }
  handleGoogleResponse(result) {
    console.log(result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          // logo={require('')}
          style={styles.toolbar}
          title="CESI"
          actions={[{ title: 'Settings', show: 'never' }]}
        />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1
          }}
        />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={5} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  toolbar: {
    backgroundColor: '#1976D2',
    height: 80,
    alignSelf: 'stretch'
  }
});
