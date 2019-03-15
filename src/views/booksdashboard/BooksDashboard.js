import React, { Component } from "react";
import { FlatList, View, Text, Button } from "react-native";
import { connect } from "react-redux";

import { removeBook, listBooks } from "../../redux/actions";
import BookCard from "../../components/bookcard/BookCard";
import styles from "../../styles";

class BooksDashboard extends Component {
  static navigationOptions = {
    title: "Books Dashboard"
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.boundRenderItem = this.renderItem.bind(this);
    this.boundKeyExtractor = this.keyExtractor.bind(this);
  }

  componentDidMount() {
    this.props.listBooks();
  }

  keyExtractor(book) {
    return book.id;
  }

  renderItem({ index, item }) {
    return (
      <BookCard
        model={item}
        onDelete={this.props.removeBook}
        onUpdate={book => this.onUpdate(book)}
      />
    );
  }

  onUpdate(book) {
    this.props.navigation.push("Form", {
      book
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.textRegular}>Current books storage</Text>
        <FlatList
          style={{ flexGrow: 8 }}
          keyExtractor={this.boundKeyExtractor}
          data={this.props.books}
          renderItem={this.boundRenderItem}
        />
        {!this.props.books.length && <Text style={styles.textRegular}>Nothing Found '(</Text>}
        <Button
          style={{ flexGrow: 1 }}
          title="ADD A NEW BOOK"
          onPress={() => this.newBook()}
        />
      </View>
    );
  }

  newBook() {
    this.props.navigation.navigate("Form");
  }
}

function mapStateToProps(state, ownProps) {
  return {
    books: state.books,
    updateStatus: state.requestStatus.putBook
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  listBooks: () => dispatch(listBooks()),
  removeBook: aBook => dispatch(removeBook(aBook))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksDashboard);
