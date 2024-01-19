import React, { useState, useEffect } from 'react';
import {
  View,
  Text,ScrollView,
  StyleSheet,
  Image,
  Pressable,Keyboard,
  TextInput,Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { useDispatch } from 'react-redux';
const Regular= 'Montserrat-Regular'
const Bold = 'Montserrat-Bold'
const Semi = 'Montserrat-SemiBold'

const Pink = 'rgb(252,16,85)'
const Black = 'rgb(66,67,106)'

// const dispatch = useDispatch();

// const [arrNotification, setArrNotification] = useState([]);
// const [currentPage, setCurrentPage] = useState(0);
// const [totalCount, setTotalCount] = useState(0);
// const [currentCount, setCurrentCount] = useState(0);
// const [isRefresh, setIsRefresh] = useState(false);
// const [isLoadMore, setIsLoadMore] = useState(false);

// const getAllNotification = async (operation) => {
//   try {
//     const { authData: { data } } = this.props;
//     const values = {
//       id: data.id,
//       offset: getOffSet(),
//       record_count: (
//         operation === TagOperation.NormalCalling
//           ? 0
//           : operation === TagOperation.PullToRefresh
//             ? 0
//             : currentPage + 1
//       ),
//     };

//     const response = await dispatch(callApi(values, GETNOTIFICATION, data.token, POST_METHOD, operation !== TagOperation.NormalCalling));

//     if (response.status === RESULT_OK) {
//       if (operation === TagOperation.PullToRefresh) {
//         setArrNotification(response.data || []);
//         setCurrentPage(0);
//         setTotalCount(response.total_records);
//         setCurrentCount(response.data ? response.data.length : 0);
//         setIsRefresh(false);
//       } else if (operation === TagOperation.LoadMore) {
//         if (response.data) {
//           const count = arrNotification.length + response.data.length;
//           setArrNotification([...arrNotification, ...response.data]);
//           setCurrentPage(currentPage + 1);
//           setTotalCount(response.total_records);
//           setCurrentCount(count);
//         }
//         setIsLoadMore(false);
//       } else {
//         setArrNotification(response.data || []);
//         setCurrentCount(response.data ? response.data.length : 0);
//         setTotalCount(response.total_records);
//       }
//     } else {
//       if (operation === TagOperation.PullToRefresh) {
//         setIsRefresh(false);
//       } else if (operation === TagOperation.LoadMore) {
//         setIsLoadMore(false);
//       }
//       throw response;
//     }
//   } catch (error) {
//     console.log('Error in API: ', error);
//     if (operation === TagOperation.PullToRefresh) {
//       setIsRefresh(false);
//     } else if (operation === TagOperation.LoadMore) {
//       setIsLoadMore(false);
//     }
//     if (error.code !== 204) {
//       showToastMessage(error.message);
//     }
//   }
// };
const renderItem = ({item}) => (
    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
      <View style={{height:20,width:20,borderRadius:8,overflow:'hidden'}}>
      <Image source={{uri: item.image}} style={{resizeMode:'cover',}} />
      </View>


     
    </TouchableOpacity>
  );
const Notification = ({ navigation }) => {
 

  return (
    <SafeAreaView style={{ flex:1 }}>
   
<View>
    <Text style={{fontFamily:Semi,fontSize:28,color:"black",padding:20}}>
        Notification
    </Text>

    <View style={{width:'100%',height:0.2,backgroundColor:'lightgray'}}>
        <Text></Text>
    </View>
</View>

{/* <FlatList
  data={data}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ index, item }) => renderitem({ index, item })}
/> */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  

});

export default Notification;
