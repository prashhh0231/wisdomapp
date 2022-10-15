import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {thumbnailImageUrl, channalLogo} from '../constants/index';

const Videocard = props => {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.videoImage}
        source={{
          uri: props?.item?.thumbnail
            ? props?.item?.thumbnail
            : thumbnailImageUrl,
        }}
      />
      <View style={styles.videoTtl}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: props?.item?.channel?.logo
              ? props?.item?.channel?.logo
              : channalLogo,
          }}
        />
        <Text style={[styles.whiteTxt, styles.videoTitle]}>
          {props?.item?.title}
        </Text>
      </View>
      <View style={styles.channalName}>
        <Text style={[styles.whiteTxt, {fontSize: 12}]}>
          {props?.item?.channel?.channel_name}
        </Text>
      </View>
    </View>
  );
};

export default Videocard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 30,
    borderBottomColor: '#c3c4c7',
    borderBottomWidth: 0.5,
    marginVertical: 15,
  },
  videoImage: {
    width: 350,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  videoTtl: {
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  whiteTxt: {color: '#c3c4c7'},
  channalName: {
    width: '100%',
    marginLeft: '15%',
    marginTop: -25,
    marginBottom: 30,
  },
  videoTitle: {
    marginRight: 30,
    marginLeft: 0,
    fontSize: 16,
  },
});
