import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');

  const addComment = () => {
    if (newComment) {
      setComments([
        ...comments,
        {id: comments.length + 1, text: newComment, replies: []},
      ]);
      setNewComment('');
    }
  };

  const addReply = commentId => {
    if (newReply) {
      const updatedComments = comments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {id: comment.replies.length + 1, text: newReply},
              ],
            }
          : comment,
      );
      setComments(updatedComments);
      setNewReply('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discussion Board</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={newComment}
        onChangeText={text => setNewComment(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addComment}>
        <Text style={styles.buttonText}>Post Comment</Text>
      </TouchableOpacity>

      <FlatList
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.text}</Text>
            <View style={styles.replyContainer}>
              <TextInput
                style={styles.replyInput}
                placeholder="Add a reply..."
                value={newReply}
                onChangeText={text => setNewReply(text)}
              />
              <TouchableOpacity
                style={styles.replyButton}
                onPress={() => addReply(item.id)}>
                <AntDesign name="arrowright" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={item.replies}
              keyExtractor={reply => reply.id.toString()}
              renderItem={({item: reply}) => (
                <View style={styles.replyItem}>
                  <Text style={styles.replyText}>{reply.text}</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#2F80ED',
    padding: 8,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  commentContainer: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  commentText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    marginBottom: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  replyButton: {
    backgroundColor: '#27AE60',
    padding: 6,
    alignItems: 'center',
    borderRadius: 4,
  },
  replyItem: {
    backgroundColor: '#F2F2F2',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  replyText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default Comment;
