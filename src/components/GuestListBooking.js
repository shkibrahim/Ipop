import I18n from 'i18n-js';
import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Divider } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { callApi } from '../actions/auth.action';
import SubReccuringEvent from '../flatlistrow/SubReccuringEvent';
import { AQUWA_MARINE, PINK_RED, PINK_RED_ALPHA1, WHITE } from '../helper/Color';
import { BOLD, SEMI_BOLD } from '../helper/FontName';
import { showToastMessage } from '../helper/Helper';
import { GuestListType } from '../screens/GuestList';
import { RESULT_OK } from '../service/api';
import { BOOKEDSLOTGUESTLIST, MAKECALENDERMARKFORBOOKINGSLOT, POST_METHOD } from '../service/apiHelper';

class GuestListBooking extends Component {
    constructor(props) {
        super(props);
        let objDate = {}

        this.state = {
            objData: objDate,
            previousSel: undefined,
            arrBooking: [],   //store selected date booking slot and merge number of guest
            arrBookedSlot: [], //used for get all booked slot of event
            arrBookingSlot: [] //used for get booking slot of event which not passed
        };

        LocaleConfig.defaultLocale = I18n.currentLocale()

        const value = {
            id: this.props.event.id,
            current_date: moment().format('YYYY-MM-DDT00:00:00.000+0000')
        }
        this.fetchAllBookingSlotByDate(value)
    }


    async fetchAllBookingSlotByDate(values) {
        try {

            const {
                authData: { data },
            } = this.props;

            const response = await this.props.dispatch(
                callApi(values, MAKECALENDERMARKFORBOOKINGSLOT, data.token, POST_METHOD)
            );

            if (response.status === RESULT_OK) {
                if (response.data != undefined) {
                    let objDate = {}
                    if (response.data.subEvents != undefined && response.data.subEvents.length > 0) {
                        response.data.subEvents?.forEach((item) => {
                            this.makeArrayForSelectedDay(item.subSlotStartDate, item.subSlotEndDate, item.subSlotDays, objDate, item.subSlotId)
                        })
                        this.setState({
                            objData: objDate,
                            arrBookingSlot: response.data.subEvents ?? []
                        });
                        const values = {
                            id: this.props.event.id,
                            start_date: moment().startOf("month").format("YYYY-MM-DDT00:00:00.000+0000"),
                            end_date: moment().endOf('month').format('YYYY-MM-DDT00:00:00.000+0000')
                        }
                        this.fetchAllBookedSlot(values)
                    }


                }


            } else {
                throw response;
            }
        } catch (error) {
            console.log("Error in api: ", error);
            if (error.code != 204) showToastMessage(error.message);
        }
    }


    makeArrayForSelectedDay(strStartDate, strEndDate, arrDayIndex, result, subSlotId) {
        let startDate = moment(
            strStartDate,
            "YYYY-MM-DDTHH:mm:ss"
        );
        let endDate = moment(
            strEndDate,
            "YYYY-MM-DDTHH:mm:ss"
        );
        arrDayIndex.forEach((index) => {
            var current = startDate.clone();
            if (index == 7)
                index = 0
            current = current.day(index)
            if (current.isSameOrAfter(startDate)) {
                let item = current.format("YYYY-MM-DD")
                result[item] = { selectedColor: AQUWA_MARINE, selected: false, marked: true, dotColor: PINK_RED, subSlotId: subSlotId }
            }

            while (current.day(index + 7).isSameOrBefore(endDate)) {
                let item = current.format("YYYY-MM-DD")
                result[item] = { selectedColor: AQUWA_MARINE, selected: false, marked: true, dotColor: PINK_RED, subSlotId: subSlotId }

            }
        });

    }


    async fetchAllBookedSlot(values) {
        try {
            const {
                authData: { data },
            } = this.props;



            const response = await this.props.dispatch(
                callApi(values, BOOKEDSLOTGUESTLIST, data.token, POST_METHOD)
            );

            if (response.status === RESULT_OK) {
                this.setState({
                    arrBookedSlot: response.data ?? [],
                    arrBooking: []
                });

            } else {
                throw response;
            }
        } catch (error) {
            console.log("Error in api: ", error);
            if (error.code != 204) showToastMessage(error.message);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.arrBooking}
                    ListHeaderComponent={
                        <Calendar
                            ref={ref => this.calendar = ref}
                            // minDate={new Date()}
                            current={new Date()}
                            firstDay={1}
                            monthFormat={'MMM yyyy'}
                            onMonthChange={(month) => {
                                console.log('month changed', month)
                                const values = {
                                    id: this.props.event.id,
                                    start_date: moment(month.timestamp).startOf("month").format("YYYY-MM-DDT00:00:00.000+0000"),
                                    end_date: moment(month.timestamp).endOf('month').format('YYYY-MM-DDT00:00:00.000+0000')
                                }
                                this.fetchAllBookedSlot(values)
                            }}
                            hideExtraDays={true}
                            onDayPress={(date) => {

                                let strDate = date.dateString
                                let objDate = this.state.objData
                                let object = objDate[strDate]
                                if (this.state.previousSel != undefined) {
                                    let strPrevious = moment(this.state.previousSel).format("YYYY-MM-DD")
                                    let objPreviousSel = objDate[strPrevious]
                                    if (objPreviousSel != undefined) {
                                        objDate[strPrevious] = { selected: !objPreviousSel.selected, marked: objPreviousSel.marked, dotColor: PINK_RED, subSlotId: objPreviousSel.subSlotId != undefined ? objPreviousSel.subSlotId : undefined }
                                    }
                                }

                                if (object != undefined) {
                                    objDate[strDate] = { selected: !object.selected, marked: object.marked, dotColor: PINK_RED, subSlotId: object.subSlotId }
                                } else {
                                    objDate[strDate] = { selected: true }
                                }
                                if (object != undefined) {
                                    let objSubSlot = this.state.arrBookedSlot.find((item) => {
                                        // console.log(moment.utc(item.joiningDate, 'YYYY-MM-DDT00:00:00'))
                                        // console.log(moment(date.timestamp).local())
                                        return moment.utc(item.joiningDate, 'YYYY-MM-DDT00:00:00').isSame(moment(date.timestamp))
                                    })
                                    console.log("object", objSubSlot)

                                    var index = moment(date.timestamp).day()
                                    if (index == 0)
                                        index = 7
                                    let arrTempSubSlot = this.state.arrBookingSlot.filter((item) => {
                                        return item.subSlotDays.includes(index)
                                    })
                                    arrTempSubSlot.forEach((item) => {
                                        item.subSlotGuestCount = 0
                                    })
                                    
                                    if (objSubSlot != undefined) {
                                        let arrBooking = arrTempSubSlot
                                        objSubSlot.bookingSlots.forEach((obj) => {
                                            let index = arrBooking.findIndex((objActual) => {
                                                return objActual.subSlotId == obj.subSlotId
                                            })
                                            if (index != -1) {
                                                let objData = arrBooking[index]
                                                objData.subSlotGuestCount = obj.subSlotGuestCount
                                                arrBooking[index = objData]
                                            }
                                        })
                                        console.log("array:", arrBooking)
                                        this.setState({
                                            arrBooking: arrBooking,
                                            objData: objDate,
                                            previousSel: date.timestamp
                                        })
                                    } else {
                                        if (arrTempSubSlot.length > 0) {
                                            this.setState({
                                                arrBooking: arrTempSubSlot,
                                                objData: objDate,
                                                previousSel: date.timestamp
                                            })
                                        }
                                    }
                                } else {
                                    this.setState({
                                        objData: objDate,
                                        previousSel: date.timestamp,
                                        arrBooking: []
                                    })
                                }

                            }}
                            markedDates={this.state.objData}
                            theme={{
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 14,
                                textMonthFontFamily: BOLD,
                                textMonthFontSize: 20
                            }}
                        />
                    }
                    renderItem={({ item, index }) => {
                        item.url = item.images[0]?.preview_url ?? item.images[0]?.image_url 
                        return <SubReccuringEvent
                            event={item}
                            guestNumber={this.props.event.event_guests}
                            isFromCreateEvent={false}
                            isFromGuestList={true}
                            onMenuPress={() => {
                            }}
                            onPress={() => {
                                Actions.guestList({
                                    eventDate: moment(this.state.previousSel).format("YYYY-MM-DDT00:00:00.000+0000"),
                                    guestListType: GuestListType.bookingSlotGuestList,
                                    bookingSlot: item
                                })
                            }}
                        />
                    }}
                    keyExtractor={(item, index) => {
                        if (item == undefined || item.subSlotId == undefined) {
                            return index
                        } else {
                            return item.subSlotId
                        }
                    }}
                    ItemSeparatorComponent={() => {
                        return <Divider
                            style={{ height: 5, backgroundColor: 'transparent' }} theme={{
                                colors: {
                                    primary: 'transparent'
                                }
                            }} />
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
})

mapStateToProps = (state) => ({
    authData: state.authReducer.authData,
});

export default connect(
    mapStateToProps,
    null
)(GuestListBooking);