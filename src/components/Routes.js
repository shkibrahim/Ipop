import React, { useState } from "react";
import {
  Actions,
  Lightbox,
  Router,
  Scene,
  Tabs,
} from "react-native-router-flux";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import Chat from "../screens/Chat";
import AddEvent from "../screens/AddEvent";
import EventMenu from "../screens/EventMenu";
import { BOLD } from "../helper/FontName";
import { normalize } from "../helper/FontSIze";
import { DUSK, WHITE } from "../helper/Color";
import { StyleSheet, View, Image } from "react-native";
import { StackViewStyleInterpolator } from "react-navigation-stack";
import NotificationListing from "../screens/NotificationListing";
import GuestList from "../screens/GuestList";
import MenuList from "../screens/MenuList";
import AddMenu from "../screens/AddMenu";
import SearchScreen from "../screens/SearchScreen";
import AllLiveEvent from "../screens/AllLiveEvent";
import AllFriends from "../screens/AllFriends";
import { IconButton } from "react-native-paper";
import MoreMenu from "../screens/Moremenu";
import InviteFriend from "../screens/InviteFriend";
import FriendListTabView from "../screens/FriendListTabView";
import MyEvent from "../screens/MyEvent";
import ChatDetails from "../screens/ChatDetails";
import OrderList from "../screens/OrderList";
import OrderDetail from "../screens/OrderDetail";
import AttendingEvent from "../screens/AttendingEvent";
import Collaborator from "../screens/Collaborator";
import AllUpcoming from "../screens/AllUpcoming";
import AllPeople from "../screens/AllPeople";
import SearchCollaborotors from "../screens/SearchCollaborotors";
import ForgotPassword from "../screens/ForgotPassword";
import VerifyAccount from "../screens/VerifyAccount";
import ResetPassword from "../screens/ResetPassword";
import LocationPicker from "../screens/LocationPicker";
import EditProfile from "../screens/EditProfile";
import EditEvent from "../screens/EditEvent";
import Favourite from "../screens/Favourite";
import MyProfileUpdated1 from "../screens/MyProfileUpdated1";
import OtherUserProfileUpdated from "../screens/OtherUserProfileUpdated";
import AddCollaborator from "../screens/AddCollaborator";
import FavouriteUserList from "../screens/FavouriteUserList";
import AddCard from "../screens/AddCard";
import PartyRoomStory from "../screens/PartyRoomStory";
import ShowMedia from "../screens/ShowMedia";
import ScanQRCode from "../screens/ScanQRCode";
import MenuDesc from "../screens/MenuDesc";
import ProfileInfoModel from "../screens/ProfileInfoModel";
import AdvanceUser from "../screens/AdvanceUser";
import UpList from "../screens/UpList";
import ImageZoom from "./ImageZoom";
import PartyMenu from "../screens/PartyMenu";
import PartyStoryPreview from "../screens/PartyStoryPreview";
import PartyRoomTextStory from "../screens/PartyRoomTextStory";
import TermAndCondition from "../screens/TermAndCondition";
import MediaDetail from "../screens/MediaDetail";
import Settings from "../screens/Settings";
import NotificationTab from "./NotificationTab";
import MediaLikeList from "../screens/MediaLikeList";
import ContactUs from "../screens/ContactUs";
import CommentMediaList from "../screens/CommentMedia";
import FAQ from "../screens/FAQ";
import PartyOrderStatus from "../screens/PartyOrderStatus";
import AddNewEventUpdate from "../screens/AddNewEventUpdate";
import SelectNewEvent from "../screens/SelectNewEvent";
import SelectCategory from "../screens/SelectCategory";
import SimpleTicket from "../screens/SimpleTicket";
import ManageTicket from "../screens/ManageTicket";
import AddTicket from "../screens/AddTicket";
import { translate } from "../helper/Language";
import PartyOrderConfirmation from "../screens/PartyOrderConfirmation";
import SelectCalender from "./SelectCalender";
import AddCollaboratorNew from "../screens/AddCollaboratorNew";
import CollaboratorNew from "../screens/CollaboratorNew";
import NotificationCenter from "../screens/NotificationCenter";
import UpdateTermsCondition from "../screens/UpdateTermsCondition";
import SelectTicket from "../screens/SelectTicket";
import TicketConfirmation from "../screens/TicketConfirmation";
import MyTicket from "../screens/MyTicket";
import MyTicketDetails from "../screens/MyTicketDetails";
import BlockUserList from "../screens/BlockUserList";
import TicketManagement from "../screens/TicketManagement";
import Friend from "../screens/Friend";
import ProfileInfoGuestModal from "../screens/ProfileInfoGuestModal";
import PrivateAccount from "../screens/PrivateAccount";
import GreenPass from "../screens/GreenPass";
import GreenPassView from "../screens/GreenPassView";
import IntroScreenFirst from "../screens/IntroScreenFirst";
import IntroScreenSecond from "../screens/IntroScreenSecond";
import IntroScreenThird from "../screens/IntroScreenThird";
import NewEventDetails from "../screens/NewEventDetails";
import ExitPopup from "../screens/ExitPopup";
import ManageSubEvent from "../screens/ManageSubEvent";
import AddSubEvent from "../screens/AddSubEvent";
import NewGuestListProfessionalUser from "./NewGuestListProfessionalUser";
import BookingSlotDetail from "../screens/BookingSlotDetail";
import SubEventDetail from "../screens/SubEventDetail";
import BookingSlotConfirmation from "../screens/BookingSlotConfirmation";
import FetchAllSubEvent from "../screens/FetchAllSubEvent";
import BookingSlotManagement from "../screens/BookingSlotManagement";
import BookingSlotHostConfirmation from "../screens/BookingSlotHostConfirmation";
import MyBookingSlot from "../screens/MyBookingSlot";
import FriendList from "../screens/FriendList";
import UpdateRequire from "../screens/UpdateRequire";
import MenuParentHost from "../screens/MenuParentHost";
import AddEditSubMenu from "../screens/AddEditSubMenu";
import AddEditCategory from "../screens/AddEditCategory";
import IntroPartyPeopleFirstScreen from "../screens/IntroPartyPeopleFirstScreen";
import TerminatePropleTutorial from "../screens/TerminatePropleTutorial";
import IntroPartyPeopleSecondScreen from "../screens/IntroPartyPeopleSecondScreen";
import IntroPartyPeopleFinalScreen from "../screens/IntroPartyPeopleFinalScreen";
import IntroPartyPeopleLocation from "../screens/IntroPartyPeopleLocation";

// ..
const getSceneStyle = (
  /* NavigationSceneRendererProps */ props,
  computedProps
) => {
  const style = {
    backgroundColor: WHITE,
  };
  return style;
};

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.transitionConfig = () => ({
      screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
    });
  }
  render() {
    return (
      <Router
        backAndroidHandler={() => false}
        // uriPrefix={"popupapp.page.link"}
        getSceneStyle={getSceneStyle}
        on
      >
        <Lightbox key="lightbox" modal={true} hideNavBar>
          <Scene key="modal" modal hideNavBar>
            <Scene
              headerLayoutPreset="left"
              titleStyle={{
                color: DUSK,
                fontFamily: BOLD,
                fontSize: normalize(18),
                paddingLeft: 10,
              }}
              navBarButtonColor={DUSK}
              renderBackButton={() => (
                <IconButton
                  icon={require("../images/ic_back.png")}
                  onPress={() => Actions.pop()}
                />
              )}
            >
              <Scene
                key="root"
                initial={!this.props.isLoggedIn}
                hideNavBar
                back
                navBarButtonColor={DUSK}
                renderBackButton={() => (
                  <IconButton
                    icon={require("../images/ic_back.png")}
                    onPress={() => Actions.pop()}
                    color={DUSK}
                  />
                )}
                navigationBarStyle={{ elevation: 0, borderBottomWidth: 0 }}
              >
                <Scene key="login" component={Login} hideNavBar initial />
                <Scene
                  key="forgotPassword"
                  component={ForgotPassword}
                  title={translate("ForgotPassword_title")}
                  hideNavBar={false}
                />
                <Scene
                  key="signUp"
                  component={SignUp}
                  hideNavBar={false}
                  title={translate("Sign_Up")}
                />

                <Scene
                  key="verifyAccount"
                  component={VerifyAccount}
                  hideNavBar={false}
                  title={translate("OTP_Verification")}
                />
                <Scene
                  key="resetPassword"
                  component={ResetPassword}
                  hideNavBar={false}
                  title={translate("Reset_Password")}
                />
                <Scene
                  key="webContent"
                  component={TermAndCondition}
                  hideNavBar={false}
                />
              </Scene>

              <Scene
                key="app"
                hideNavBar
                initial={this.props.isLoggedIn}
                back
                navBarButtonColor={DUSK}
              >
                <Tabs
                  tabs
                  key="Tabbar"
                  showLabel={false}
                  tabBarStyle={styles.tabBar}
                >
                  <Scene
                    key="home"
                    component={Home}
                    hideNavBar={true}
                    icon={this.HomeTab}
                  />
                  <Scene
                    key="notificationListing"
                    component={NotificationListing}
                    hideNavBar={true}
                    icon={NotificationTab}
                  />
                  <Scene
                    key="balloon"
                    component={AttendingEvent}
                    hideNavBar={true}
                    title={translate("Events")}
                    icon={this.BalloonTab}
                  />
                  <Scene
                    key="search"
                    component={SearchScreen}
                    hideNavBar={true}
                    icon={this.SearchTab}
                  />
                  <Scene
                    key="myProfile"
                    component={MyProfileUpdated1}
                    hideNavBar={false}
                    navTransparent
                    back={false}
                    title={" "}
                    icon={this.ProfileTab}
                    renderRightButton={() => (
                      <IconButton
                        icon={"menu"}
                        size={30}
                        color={DUSK}
                        onPress={() => {
                          Actions.moreMenu();
                        }}
                      />
                    )}
                  />
                </Tabs>

                <Scene key="chat" component={Chat} hideNavBar={true} />

                <Scene key="addEvent" component={AddEvent} hideNavBar={true} />

                <Scene
                  key="addEventUpdate"
                  component={AddNewEventUpdate}
                  hideNavBar={true}
                />

                <Scene
                  key="selectAddEventType"
                  component={SelectNewEvent}
                  hideNavBar={true}
                />

                <Scene
                  key="selectCategory"
                  component={SelectCategory}
                  hideNavBar={false}
                  title={translate("Select_category")}
                />


                <Scene
                  key="simpleTicket"
                  component={SimpleTicket}
                  hideNavBar={true}
                />


                <Scene
                  key="manageTicket"
                  component={ManageTicket}
                  hideNavBar={true}
                />

                <Scene
                  key="addTicket"
                  component={AddTicket}
                  hideNavBar={false}
                  title={translate("Add_ticket")}
                  navigationBarStyle={{ elevation: 1, borderBottomWidth: 1 }}
                />

                <Scene
                  key="editEvent"
                  component={EditEvent}
                  hideNavBar={true}
                />

                <Scene
                  key="searchCollaborators"
                  component={SearchCollaborotors}
                  title={translate("Add_Collaborators")}
                  hideNavBar={false}
                />

                {/* <Scene
                  key="search"
                  component={SearchScreen}
                  hideNavBar={true}
                /> */}

                <Scene
                  key="eventMenu"
                  component={EventMenu}
                  hideNavBar={true}
                  title={translate("Event_Menu")}
                />

                <Scene
                  key="guestList"
                  component={GuestList}
                  hideNavBar={false}
                  title={translate("Guest_List")}
                />

                <Scene
                  key="newGuestListProfessionalUser"
                  component={NewGuestListProfessionalUser}
                  hideNavBar={false}
                  title={translate("Guest_List")}
                />

                <Scene
                  key="menuList"
                  component={MenuList}
                  hideNavBar={false}
                  title={translate("Event_Menu")}
                />

                <Scene
                  key='menuParentHost'
                  component={MenuParentHost}
                  hideNavBar={false}
                  title={translate("Event_Menu")}
                />

                <Scene
                  key='addEditSubMenu'
                  component={AddEditSubMenu}
                  hideNavBar={false}
                  title={translate("addSubMenu")}
                />

                <Scene
                  key='addEditCategory'
                  component={AddEditCategory}
                  hideNavBar={false}
                  title={translate("addCategoryMenu")}
                />
                <Scene
                  key="verifyAccount"
                  component={VerifyAccount}
                  hideNavBar={false}
                  title={translate("OTP_Verification")}
                />

                <Scene
                  key="menuAdd"
                  component={AddMenu}
                  hideNavBar={false}
                  title={translate("Add_Menu")}
                />

                <Scene
                  key="liveEvent"
                  component={AllLiveEvent}
                  hideNavBar={false}
                  title={translate("Live_Now")}
                />

                <Scene
                  key="allFriends"
                  component={AllFriends}
                  hideNavBar={false}
                  title={translate("Friends")}
                />

                <Scene
                  key="allUpcoming"
                  component={AllUpcoming}
                  hideNavBar={false}
                  title={translate("Upcoming")}
                />

                <Scene
                  key="allPeople"
                  component={AllPeople}
                  hideNavBar={false}
                  title={translate("People")}
                />

                <Scene
                  key="location"
                  component={LocationPicker}
                  hideNavBar={false}
                  title={translate("Location")}
                />

                {/* <Scene
                  navTransparent
                  key="newEventDetails"
                  path={"/popup/:eventId/"}
                  component={PartyDetails}
                  hideNavBar={false}
                  title={" "}
                  renderBackButton={() => (
                    <IconButton
                      icon={require("../images/ic_back.png")}
                      onPress={() => Actions.pop()}
                      color={WHITE}
                    />
                  )}
                /> */}

                <Scene
                  key="newEventDetails"
                  component={NewEventDetails}
                  path={"/popup/:eventId/"}
                  hideNavBar={true}
                />

                <Scene
                  key="selectTicket"
                  component={SelectTicket}
                  hideNavBar={false}
                  title={translate("Select_ticket")}
                />

                <Scene
                  key="ticketConfirmation"
                  component={TicketConfirmation}
                  hideNavBar={false}
                  title={translate("Confirmation")}
                />

                <Scene
                  key="chatDetails"
                  component={ChatDetails}
                  hideNavBar={true}
                />

                <Scene
                  key="showMedia"
                  component={ShowMedia}
                  hideNavBar={false}
                  title={" "}
                  navTransparent
                />

                <Scene
                  key="invite"
                  component={InviteFriend}
                  title={translate("Invite_Your_Friend")}
                  hideNavBar={false}
                />

                <Scene
                  key="editProfile"
                  component={EditProfile}
                  title={translate("Edit_Profile")}
                  hideNavBar={false}
                />

                <Scene
                  key="friendList"
                  component={FriendListTabView}
                  title={translate("Friends_List")}
                  hideNavBar={false}
                />

                <Scene
                  key="otherUserFriendList"
                  component={FriendList}
                  title={translate("Friends_List")}
                  hideNavBar={false}
                />

                <Scene
                  key="favourite"
                  component={Favourite}
                  title={translate("Favourite")}
                  hideNavBar={false}
                />

                <Scene
                  key="myEvent"
                  component={MyEvent}
                  title={translate("My_Events")}
                  hideNavBar={false}
                />

                <Scene
                  key="moreMenu"
                  component={MoreMenu}
                  hideNavBar={false}
                  animationEnabled={false}
                  title={" "}
                  navigationBarStyle={{ elevation: 0, borderBottomWidth: 0 }}
                />

                <Scene
                  key="orderList"
                  component={OrderList}
                  hideNavBar={false}
                  title={translate("My_Order")}
                />

                <Scene
                  key="orderDetail"
                  component={OrderDetail}
                  hideNavBar={false}
                  title={translate("Order_Details")}
                  gestureEnabled={false}
                />

                <Scene
                  key="otherUserProfile"
                  component={OtherUserProfileUpdated}
                  hideNavBar={true}
                />


                <Scene
                  key="collaborator"
                  component={Collaborator}
                  hideNavBar={false}
                  title={translate("Collaborators")}
                />

                <Scene
                  key="addCollaborator"
                  component={AddCollaborator}
                  hideNavBar={false}
                  title={translate("Add_Collaborators")}
                />
                <Scene
                  key="addCollaboratorNew"
                  component={AddCollaboratorNew}
                  animationEnabled={false}
                  hideNavBar={false}
                  title={translate("Add_Collaborators")}
                />

                <Scene
                  key="notificationCenter"
                  component={NotificationCenter}
                  hideNavBar={false}
                  title={translate("notification_center")}
                />

                <Scene
                  key="collaboratorNew"
                  component={CollaboratorNew}
                  hideNavBar={false}
                  title={translate("Collaborators")}
                />
                <Scene
                  key="favouriteUserList"
                  component={FavouriteUserList}
                  hideNavBar={false}
                  title={translate("Interested_User")}
                />

                <Scene
                  key="addCard"
                  component={AddCard}
                  hideNavBar={false}
                  title={translate("Card_Detail")}
                />

                <Scene
                  key="scanQRCode"
                  component={ScanQRCode}
                  hideNavBar={false}
                  title={translate("Scan")}
                />

                <Scene
                  key="menuDesc"
                  component={MenuDesc}
                  hideNavBar={false}
                  title={" "}
                />

                <Scene
                  key="upList"
                  component={UpList}
                  hideNavBar={false}
                  title={" "}
                />

                <Scene
                  key="advanceUser"
                  path={"/bankAccount/:userId"}
                  component={AdvanceUser}
                  hideNavBar={false}
                  title={translate("advance_account")}
                />

                <Scene
                  key="partyMenu"
                  component={PartyMenu}
                  hideNavBar={false}
                  title={" "}
                // title={translate('Gift')}
                />

                <Scene
                  key="partyRoomStory"
                  component={PartyRoomStory}
                  hideNavBar={true}
                  navTransparent
                />

                <Scene
                  key="partyStoryPreview"
                  component={PartyStoryPreview}
                  hideNavBar={true}
                  navTransparent
                />

                <Scene
                  key="partyRoomTextStory"
                  component={PartyRoomTextStory}
                  hideNavBar={true}
                  navTransparent
                />

                <Scene
                  key="setting"
                  component={Settings}
                  hideNavBar={false}
                  title={translate("Setting")}
                />

                <Scene
                  key="resetPassword"
                  component={ResetPassword}
                  hideNavBar={false}
                  title={translate("Reset_Password")}
                />

                <Scene
                  key="mediaLikeList"
                  component={MediaLikeList}
                  hideNavBar={false}
                  title={translate("Likes")}
                />

                <Scene
                  key="contactUs"
                  component={ContactUs}
                  hideNavBar={false}
                  title={translate("Contact_Us")}
                />

                <Scene
                  key="faq"
                  component={FAQ}
                  hideNavBar={false}
                  title={translate("FAQ")}
                />

                <Scene
                  key="partyOrderStatus"
                  component={PartyOrderStatus}
                  hideNavBar={false}
                  title={translate("Order")}
                />

                <Scene
                  key="partyOrderConfirmation"
                  component={PartyOrderConfirmation}
                  hideNavBar={false}
                  title={translate("Order")}
                />

                <Scene
                  key="myTicket"
                  component={MyTicket}
                  hideNavBar={false}
                  title={translate("my_ticket")}
                />

                <Scene
                  key="myTicketDetails"
                  component={MyTicketDetails}
                  hideNavBar={false}
                  title={translate("detail")}
                />

                <Scene
                  key="blockUserList"
                  component={BlockUserList}
                  hideNavBar={false}
                  title={translate("block_user")}
                />

                <Scene
                  key="webContent"
                  component={TermAndCondition}
                  hideNavBar={false}
                />

                <Scene
                  key="ticketManagement"
                  component={TicketManagement}
                  hideNavBar={false}
                  title={translate("ticketConfirmation")}
                />

                <Scene
                  key="inviteFriend"
                  component={Friend}
                  hideNavBar={false}
                  title={translate("inviteTicket")}
                />

                <Scene
                  key="privateProfile"
                  component={PrivateAccount}
                  hideNavBar={false}
                  title={translate("privateProfile")}
                />

                <Scene
                  key="greenPass"
                  component={GreenPass}
                  hideNavBar={false}
                  title={translate("uploadGreenPass")}
                />

                <Scene
                  key="manageSubEvent"
                  component={ManageSubEvent}
                  hideNavBar={false}
                  title={translate("Add")}
                // headerLayoutPreset="center"
                // titleStyle={{
                //   color: DUSK,
                //   fontFamily: BOLD,
                //   fontSize: normalize(18),
                //   textAlign: 'center',
                // }}
                />

                <Scene
                  key="addSubEvent"
                  component={AddSubEvent}
                  hideNavBar={true}
                />

                <Scene
                  key="bookingSlotDetail"
                  component={BookingSlotDetail}
                  hideNavBar={false}
                  headerLayoutPreset="left"
                  titleStyle={{
                    color: DUSK,
                    fontFamily: BOLD,
                    fontSize: normalize(18),
                    textAlign: "left",
                  }}
                />

                <Scene
                  key="subEventDetail"
                  component={SubEventDetail}
                  hideNavBar={false}
                  headerLayoutPreset="left"
                  titleStyle={{
                    color: DUSK,
                    fontFamily: BOLD,
                    fontSize: normalize(18),
                    textAlign: "left",
                  }}
                />

                <Scene
                  key="bookingSlotConfirmation"
                  component={BookingSlotConfirmation}
                  title={translate("bookingDetials")}
                  hideNavBar={false}
                  headerLayoutPreset="left"
                  titleStyle={{
                    color: DUSK,
                    fontFamily: BOLD,
                    fontSize: normalize(18),
                    textAlign: "left",
                  }}
                />

                <Scene
                  key="bookingSlotHostConfirmation"
                  component={BookingSlotHostConfirmation}
                  title={translate("bookingDetials")}
                  hideNavBar={false}
                  headerLayoutPreset="left"
                  titleStyle={{
                    color: DUSK,
                    fontFamily: BOLD,
                    fontSize: normalize(18),
                    textAlign: "left",
                  }}
                />

                <Scene
                  key="myBookingslot"
                  component={MyBookingSlot}
                  title={translate("bookingDetials")}
                  hideNavBar={false}
                  headerLayoutPreset="left"
                  titleStyle={{
                    color: DUSK,
                    fontFamily: BOLD,
                    fontSize: normalize(18),
                    textAlign: "left",
                  }}
                />

                <Scene
                  key="fetchAllSubEvent"
                  component={FetchAllSubEvent}
                  hideNavBar={false}
                />

                <Scene
                  key="bookingSlotManagement"
                  component={BookingSlotManagement}
                  hideNavBar={false}
                  title={translate("bookingSlotManagement")}
                />
              </Scene>
            </Scene>

            <Scene
              key="mediaDetail"
              component={MediaDetail}
              hideNavBar={true}
            />

            <Scene
              key="mediaLikeList"
              component={MediaLikeList}
              hideNavBar={false}
              title={translate("Likes")}
              renderLeftButton={() => (
                <IconButton
                  icon={"close"}
                  size={24}
                  color={DUSK}
                  onPress={() => Actions.pop()}
                />
              )}
            />
            <Scene
              key="commentMediaList"
              component={CommentMediaList}
              hideNavBar={false}
              title={translate("Comment")}
              renderLeftButton={() => (
                <IconButton
                  icon={"close"}
                  size={24}
                  color={DUSK}
                  onPress={() => Actions.pop()}
                />
              )}
            />

            <Scene
              key="otherUserProfile"
              component={OtherUserProfileUpdated}
              hideNavBar={true}
            />

            <Scene key="imageZoomModel" component={ImageZoom} hideNavBar />

            <Scene
              key="chatDetails"
              component={ChatDetails}
              hideNavBar={true}
            />

            <Scene
              key="partyMenu"
              component={PartyMenu}
              hideNavBar={false}
              title={" "}
              renderLeftButton={() => (
                <IconButton
                  icon={"close"}
                  onPress={() => Actions.pop()}
                  color={DUSK}
                />
              )}
            // title={translate('Gift')}
            />

            <Scene
              key="greenPassView"
              component={GreenPassView}
              hideNavBar={true}
            />
          </Scene>
          <Scene key="profileInfoModal" component={ProfileInfoModel} />
          <Scene
            key="profileInfoGuestModal"
            component={ProfileInfoGuestModal}
          />
          <Scene key="introScreenFirst" component={IntroScreenFirst} />
          <Scene key="introScreenSecond" component={IntroScreenSecond} />
          <Scene key="introScreenThird" component={IntroScreenThird} />
          <Scene key="introPartyPeopleFirstScreen" component={IntroPartyPeopleFirstScreen} />
          <Scene key="introPartyPeopleSecondScreen" component={IntroPartyPeopleSecondScreen} />
          <Scene key="introPartyPeopleLocation" component={IntroPartyPeopleLocation} />
          <Scene key="introPartyPeopleFinalScreen" component={IntroPartyPeopleFinalScreen} />
          <Scene key="terminatePropleTutorial" component={TerminatePropleTutorial} />
          <Scene key="selectCalender" component={SelectCalender} />
          <Scene key="updateApp" component={UpdateRequire} />
          <Scene key="updateTermsCondition" component={UpdateTermsCondition} />
          <Scene key="exitPopup" component={ExitPopup} />
        </Lightbox>
      </Router>
    );
  }

  HomeTab = (props) => {
    const imageFocused = require("../images/ic_home_selected.png");
    const imageUnfocused = require("../images/ic_home_de_selected.png");
    let image = props.focused ? imageFocused : imageUnfocused;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={image}
          style={{ width: 24, height: 24 }}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  // ChatTab = props => {
  //   const imageFocused = require('../images/ic_chat_selected.png');
  //   const imageUnfocused = require('../images/ic_chat_de_selected.png');
  //   let image = props.focused ? imageFocused : imageUnfocused;
  //   let [totalBadgeCount, setBadgeCount] = useState(0)
  // firestore()
  //   .collection(CHAT_PATH + 'Users')
  //   .doc(this.props.userId + '')
  //   .onSnapshot(qSnap => {
  //     const userDetail = qSnap._data
  //     if (userDetail) {
  //       setBadgeCount(userDetail.totalBadgeCount ? userDetail.totalBadgeCount : 0)
  //     }
  //   }, err => {
  //     console.log("error while get status of user", err)
  //   })
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         padding: 20,
  //       }}>
  //       {totalBadgeCount > 0 && <Badge
  //         theme={{
  //           colors: {
  //             primary: WHITE
  //           },
  //           fonts: {
  //             regular: {
  //               fontFamily: MEDIUM
  //             }
  //           }
  //         }}
  //         style={{
  //           position: 'absolute',
  //           top: 10,
  //           right: 8
  //         }}
  //       >
  //         {totalBadgeCount}
  //       </Badge>}
  //       <Image
  //         source={image}
  //         style={{ width: 24, height: 24 }}
  //         resizeMode={'contain'}
  //       />
  //     </View>
  //   );
  // };

  SearchTab = (props) => {
    const imageFocused = require("../images/ic_search_selected.png");
    const imageUnfocused = require("../images/ic_search_de_selected.png");
    let image = props.focused ? imageFocused : imageUnfocused;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={image}
          style={{ width: 24, height: 24 }}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  BalloonTab = (props) => {
    const imageFocused = require("../images/ic_tab_balloon.png");
    // const imageUnfocused = require('../images/balloon_unselected.png')
    // let image = props.focused ? imageFocused : imageUnfocused

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={imageFocused}
          style={{ width: 64, height: 64 }}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  ProfileTab = (props) => {
    const imageFocused = require("../images/ic_profile_selected.png");
    const imageUnfocused = require("../images/ic_profile_de_selected.png");
    let image = props.focused ? imageFocused : imageUnfocused;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Image
          source={image}
          style={{ width: 24, height: 24 }}
          resizeMode={"contain"}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    opacity: 0.98,
    justifyContent: "space-between",
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    borderWidth: 1,
    shadowColor: "#000000",
    elevation: 4,
    // shadowOpacity: 0.15,
    // borderTopStartRadius: 15,
    // borderTopEndRadius: 15,
  },
});
