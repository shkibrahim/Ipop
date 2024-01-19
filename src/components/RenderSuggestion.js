import React, { useEffect, useState } from "react";
import FastImage from "react-native-fast-image";
import { connect, useDispatch, useSelector } from "react-redux";
import { callApi } from "../actions/auth.action";
import { showToastMessage } from "../helper/Helper";
import { RESULT_OK } from "../service/api";
import { GETTAGGEDUSER, POST_METHOD } from "../service/apiHelper";
import ProgressiveImage from "./LoadImage";
import { StyleSheet, Text, FlatList, Platform } from "react-native";
import { normalize } from "../helper/FontSIze";
import { MEDIUM } from "../helper/FontName";
import { TouchableOpacity } from "react-native-gesture-handler";

export function renderSuggestion(props, isFromPartyRoom) {
  // FIX: Throttling the value of `keyword` into `calmKeyword` and using it later in the function
  const [calmKeyword, setCalmKeyword] = useState("");
  const [taggingData, setTaggingData] = useState([]);

  const authData = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();
  let controller = new AbortController();

  let timerID = undefined;

  const getAllTaggedUser = async (serach) => {
    try {
      const values = {
        search_key: serach,
        record_count: 0,
        user_id: authData.data.id,
        media_request: false,
      };

      const response = await dispatch(
        callApi(
          values,
          GETTAGGEDUSER,
          authData.data.token,
          POST_METHOD,
          true,
          controller.signal
        )
      );

      if (response.status === RESULT_OK) {
        if (timerID != undefined) {
          clearTimeout(timerID);
        }
        timerID = undefined;
        setTaggingData(response.data);
      } else {
        if (timerID != undefined) {
          clearTimeout(timerID);
        }
        timerID = undefined;
        controller = new AbortController();
        throw response;
      }
    } catch (error) {
      if (timerID != undefined) {
        clearTimeout(timerID);
      }
      timerID = undefined;
      controller = new AbortController();
      setTaggingData([]);
      if (error.message != "Aborted" && error.code != 204) {
        showToastMessage(error.message);
      }
    }
  };
  useEffect(() => {
    controller.signal.addEventListener("abort", () => {
      console.log("cancel api");
    });
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCalmKeyword(props.keyword);
      if (props.keyword != null && props.keyword != "")
        getAllTaggedUser(props.keyword);
    }, 10);
    return () => clearTimeout(timeout);
  }, [props.keyword]);

  if (calmKeyword == null) {
    return null;
  }

  console.log("Got keyword:", calmKeyword);
  if (calmKeyword == undefined || calmKeyword == "") {
    return <></>;
  }
  console.log("Got keyword1:", calmKeyword, taggingData);

  if (taggingData != undefined && taggingData.length > 0) {
    return (
      <FlatList
        data={taggingData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.rowContainer}
            onPress={() => {
              props.onSuggestionPress({ id: item.id, name: item.userName });
            }}
          >
            <ProgressiveImage
              style={styles.prflImage}
              source={{ uri: item.preview_profile_picture ?? item.profile_picture }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.nameLbl} numberOfLines={1}>
              {item.userName}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{
          position: "absolute",
          bottom: isFromPartyRoom == false ? 40 : 0,
          width: "100%",
          // left: 15,
          // right: 15,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 20 : 0,
  },
  prflImage: {
    height: 50,
    width: 50,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  nameLbl: {
    fontFamily: MEDIUM,
    fontSize: normalize(13),
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 5,
  },
});

mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  null
)(renderSuggestion);
