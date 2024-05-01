import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Logo.png'
import AdminInput from '../../components/Admininput'
import AdminButton from '../../components/AdminButton/AdminButton'

const signinscreen = () => {
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const onSignInPressed = () => {
        console.warn("Sign in")
    }
  return (
    <View style={styles.root}>
      <Image source={Logo} style={styles.Logo} resizeMode='contain'/>
      <AdminInput placeholder="username" value={username} setvalue={setUsername}/>
      <AdminInput placeholder="password" value={password} setvalue={setPassword} secureTextEntry={true}/>
      <AdminButton text="Se Connecter" onPress={onSignInPressed}/>
    </View>
  );
}
const styles = StyleSheet.create({
    root: {
          alignItems:'center',
          padding:20, 
    },
Logo: {
width: 100,
maxWidth: 500,
height: 100,


}



})
export default signinscreen