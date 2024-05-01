import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Signinscreen from './src/screens/signinscreen'; // Utilisez Signinscreen au lieu de signinscreen

import react from 'react';


const app = () =>{
return(
<SafeAreaView style={styles.root}>
<Signinscreen />
</SafeAreaView>


)


}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#d3e1e2'
   
  },
});
export default app