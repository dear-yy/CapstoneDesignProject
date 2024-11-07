// ChatbotStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20 },
   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
   chatDiv: { flex: 1, marginBottom: 20 },
   userMessage: { alignSelf: 'flex-end', backgroundColor: '#d1e7dd', padding: 10, borderRadius: 5, marginBottom: 5 },
   botMessage: { alignSelf: 'flex-start', backgroundColor: '#f8d7da', padding: 10, borderRadius: 5, marginBottom: 5 },
   loading: { fontStyle: 'italic', marginBottom: 5 },
   inputDiv: { flexDirection: 'row', alignItems: 'center' },
   input: { flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, marginRight: 10 },
});

export default styles;
