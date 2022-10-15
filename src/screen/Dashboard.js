import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import Videocard from '../components/Videocard';

import {channalLogoUrl, firstData} from '../constants/index';

const Dashboard = () => {
  const [videoDetails, setvideoDetails] = useState(firstData);
  const [videoList, setvideoList] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const apiCall = async () => {
    const response = await fetch(
      `http://wisdomapp.in/api/v1/content/?page=${pageNo}&limit=10`,
    );
    const data = await response.json();
    setvideoList([...videoList, ...data?.results]);
  };

  useEffect(() => {
    apiCall();
  }, []);

  const loadMore = () => {
    setPageNo(setPageNo + 1);
    apiCall();
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setvideoDetails(item?.item);
        }}
        key={item?.item?.id}>
        <Videocard {...item} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={300}
          play={false}
          videoId={videoDetails?.video_id}
        />
      </View>
      <View style={styles.videoName}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: channalLogoUrl,
          }}
        />
        <View>
          <Text style={styles.titleTxt} numberOfLines={2}>
            {videoDetails?.title} | {videoDetails?.channel?.channel_name}
          </Text>
        </View>
      </View>
      <Text style={[styles.whiteTxt, styles.nextTxt]}>Up Next</Text>
      <FlatList
        data={videoList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.05}
        style={styles.content}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListTxt}>No suggestation found !!</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  playerWrapper: {
    height: 300,
    marginBottom: -50,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  videoName: {
    width: '99%',
    paddingLeft: 15,
    paddingRight: 50,
    flexDirection: 'row',
  },
  titleTxt: {
    color: '#c3c4c7',
    fontSize: 16,
    marginLeft: 10,
  },
  whiteTxt: {
    color: '#c3c4c7',
  },
  nextTxt: {
    marginTop: 30,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  emptyList: {
    marginTop: 60,
  },
  emptyListTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
});
