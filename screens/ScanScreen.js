import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted"
        });
    }

    handleBarCodeScanned = async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        });
    }


    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState==="clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            );
        }

        else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                     <Text style={styles.displayText}>{
             hasCameraPermissions===true? this.state.scannedData:"REQUEST CAMERA PERMISSIONS"
   
            }</Text>
 
           <TouchableOpacity style={styles.scanButton}
            onPress={this.getCameraPermissions}
            >
                <Text>SCAN QR CODE</Text>
            </TouchableOpacity>
                </View>
            );
        }
      
       
    }
} 

const styles=StyleSheet.create({
    container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
    },
    scanButton:{
        backgroundColor:"#2196F3",
        padding:10,
        margin:10
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    }
})