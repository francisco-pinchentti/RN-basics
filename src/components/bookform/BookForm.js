import React, { Component } from "react";
import { View, Text, Alert, TextInput, Button } from "react-native";

import { connect } from "react-redux";
import { addBook, updateBook } from "../../redux/actions";

class BookForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const book = navigation.getParam("book");
    return {
      title: !!book ? `Updating ${book.title}` : "Creating a new book"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      isbn: {
        value: "",
        isValid: false
      },
      title: {
        value: "",
        isValid: false
      },
      summary: {
        value: "",
        isValid: true
      },
      isFormValid: false,
      isBusy: false
    };

    this.boundOnFormSubmit = this.onFormSubmit.bind(this);
    this.boundOnInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const targetBook = this.props.navigation.getParam("book");
    if (!!targetBook) {
      this.setState({
        id: targetBook.id,
        title: {
          value: targetBook.title,
          isValid: this.validateFormField("title", targetBook.title)
        },
        summary: {
          value: targetBook.summary,
          isValid: this.validateFormField("summary", targetBook.summary)
        },
        isbn: {
          value: targetBook.isbn,
          isValid: this.validateFormField("isbn", targetBook.isbn)
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const saveFinished =
      prevProps.saveStatus.pending &&
      !this.props.saveStatus.pending &&
      !this.props.saveStatus.error;
    const updateFinished =
      prevProps.updateStatus.pending &&
      !this.props.updateStatus.pending &&
      !this.props.updateStatus.error;
    if (saveFinished) {
      Alert.alert("Book created!");
    } else if (updateFinished) {
      Alert.alert("Book updated!");
    }
  }

  onFormSubmit() {
    if (this.state.id) {
      this.props.updateBook({
        id: this.state.id,
        isbn: this.state.isbn.value,
        title: this.state.title.value,
        summary: this.state.summary.value
      });
    } else {
      this.props.addBook({
        isbn: this.state.isbn.value,
        title: this.state.title.value,
        summary: this.state.summary.value
      });
    }
  }

  onInputChange(fieldName, value) {
    this.setState(
      {
        [fieldName]: {
          value,
          isValid: this.validateFormField(fieldName, value)
        }
      },
      () => this.validateForm()
    );
  }

  validateFormField(key, value) {
    switch (key) {
      case "isbn":
        return value && value.length < 14;
      case "title":
        return value && value.length < 25;
      case "summary":
        return !value || value.length < 200;
      default:
        return false;
    }
  }

  validateForm() {
    const isFormValid =
      this.state.isbn.isValid &&
      this.state.title.isValid &&
      this.state.summary.isValid;
    this.setState({
      isFormValid
    });
  }

  render() {
    return (
      <View style={{ padding: 8, height: "100%" }}>
        <Text>Title</Text>
        <TextInput
          name="title"
          value={this.state.title.value}
          onChangeText={text => this.onInputChange("title", text)}
        />
        <Text>ISBN</Text>
        <TextInput
          value={this.state.isbn.value}
          onChangeText={text => this.onInputChange("isbn", text)}
        />
        <Text>Summary</Text>
        <TextInput
          rows="3"
          value={this.state.summary.value}
          onChangeText={text => this.onInputChange("summary", text)}
        />
        <View style={{ flexGrow: 1, justifyContent: "flex-end" }}>
          {!this.state.id && (
            <Button
              disabled={!this.state.isFormValid}
              onPress={() => this.onFormSubmit()}
              title="Add book to store"
            />
          )}
          {this.state.id && (
            <Button
              disabled={!this.state.isFormValid}
              onPress={() => this.onFormSubmit()}
              title="Update Book"
            />
          )}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    saveStatus: state.requestStatus.postBook,
    updateStatus: state.requestStatus.putBook
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addBook: aBook => dispatch(addBook(aBook)),
  updateBook: aBook => dispatch(updateBook(aBook))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
