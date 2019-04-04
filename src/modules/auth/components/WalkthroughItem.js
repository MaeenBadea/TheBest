import React from 'react';
import {
  Image,
  View,
  Dimensions
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from '../../../utils/scale';
import {normalize} from '../../../styles/theme';

export default class WalkthroughItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {


    let contentHeight = normalize(200);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;


    image = <Image style={[styles.image, {height, width}]} source={this.props.pic}/> ;

   
    return (
      <View style={styles.screen}>
        {image}
        <RkText rkType='header2' style={styles.text}>{this.props.text}</RkText>
      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  text: {
    marginTop: 20
  }
}));
