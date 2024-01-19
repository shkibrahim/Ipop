import React from "react";
import { useEffect } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_ADDED } from "../actions/ActionConst";
import { COOL_GREY, PINK_RED } from "../helper/Color";
import { WEBSOCKET } from "../service/api";
import ProgressiveImage from "./LoadImage";

const rotateValue = new Animated.Value(0);

const rotationData = rotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

const AnimationWraper = (props) => {
  return (
    <Animated.View style={styles.addedMediaStyle}>
      {props.children}
    </Animated.View>
  );
};
const NormalWraper = (props) => {
  return (
    <Animated.View style={styles.normalStyle}>{props.children}</Animated.View>
  );
};

const RenderRecentPopup = ({ item , onPress}) => {
  const isAnimated = item?.hasRecentMediaPost ?? false;

  useEffect(() => {
    if (isAnimated) {
      rotateValue.setValue(0);
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimated]);

  const middleContent = (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        Actions.newEventDetails({
          eventId: item.eventId,
        });
      }}
      onLongPress={() => {
        Actions.exitPopup({
          title: item?.eventTitle,
          eventImageUrl: item?.preview_eventImageUrl ?? item?.eventImageUrl,
          exitParty: onPress,
          eventId: item.eventId,
        });
      }}
    >
      <ProgressiveImage
        style={{
          height: 40,
          width: 40,
          resizeMode: "cover",
          borderRadius: 40 / 2,
          backgroundColor: "#D3D3D3",
        }}
        source={{ uri: item?.preview_eventImageUrl ?? item?.eventImageUrl }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {isAnimated ? (
        <AnimationWraper>{middleContent}</AnimationWraper>
      ) : (
        <NormalWraper>{middleContent}</NormalWraper>
      )}
    </>
  );
};

const RecentpopupVisits = (props) => {
  const { data } = useSelector((state) => state.recentpopupReducer.recentPopup);
  const token = useSelector((state) => state.authReducer.authData.data.token);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [data]);

  useEffect(() => {
    const ws = new WebSocket(
      WEBSOCKET
    );

    ws.onopen = () => {
      console.log("Socket Connected to server");
      ws?.send(
        JSON.stringify({
          apiNo: 201,
          apiName: "loginApi",
          accessToken: token,
          data: {},
        })
      );
    };
    ws.onclose = (e) => {
      console.log("Socket Disconnected to server");
    };
    ws.onerror = (e) => {
      console.log("Socket Error occured", e);
    };
    ws.onmessage = (e) => {
      console.log("Socket Message Received", e);
      try {
        const dataFromMessage = JSON.parse(e?.data);
        if (dataFromMessage?.apiNo === 204) {
          dispatch({
            type: MEDIA_ADDED,
            payload: dataFromMessage?.data,
          });
        } else if (dataFromMessage?.apiNo === 205) {
          // 
        }
      } catch (e) {
        console.log("Error in parsing", e);
      }
    };

    return () => ws?.close();
  }, []);

  return (
    <View>
      {data && (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <RenderRecentPopup item={item} onPress={props.onPress}/>}
          keyExtractor={(item, index) => item.eventId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  normalStyle: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    justifyContent: "center",
    marginHorizontal: 2,
    alignItems: "center",
    marginBottom: 10,
  },
  addedMediaStyle: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    borderWidth: 2,
    borderColor: PINK_RED,
    justifyContent: "center",
    marginHorizontal: 2,
    alignItems: "center",
    marginBottom: 10,
    borderStyle: "dashed",
    transform: [
      {
        rotate: rotationData,
      },
    ],
  },
});

export default RecentpopupVisits;
