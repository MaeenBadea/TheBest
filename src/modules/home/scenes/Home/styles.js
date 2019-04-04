import {StyleSheet} from 'react-native';
import {theme} from "../../index"
const { normalize } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#0076FF',
        height: 100,
        flexDirection: 'column',
        position: 'relative',
        paddingLeft: 15
      },
      opponents: {
        color: '#fff',
        fontWeight: '200',
        fontSize: 25
      },

    activityIndicator:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    } ,
    //floating point btn
    addButton:{
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    } ,
    //dialog styles
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
      }, 
      button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
      } ,

           
    addOpponentInput:{
        
        textAlign: 'center',
        height: 50,
        borderWidth: 2,
        borderColor: 'lightblue',
        borderRadius: 20 ,
        backgroundColor : "#FFFFFF", 

        
    }, 
    errorTxt:{
        backgroundColor: 'red' ,
        
    }
});

export default styles;