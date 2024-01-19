import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import {
    AQUWA_MARINE,
    PINK_RED,
} from '../helper/Color';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { translate } from '../helper/Language';
import I18n from 'i18n-js';
import CustomButton from './CustomButton';
import { connect } from 'react-redux';
import { MAKECALENDERMARKFORBOOKINGSLOT, POST_METHOD } from '../service/apiHelper';
import { callApi } from '../actions/auth.action';
import { RESULT_OK } from '../service/api';
import { showToastMessage } from '../helper/Helper';
import moment from "moment";

class SelectCalender extends Component {
    constructor(props) {
        super(props);
        let objDate = {}
        this.state = {
            objData: objDate,
            previousSel: undefined
        };

        LocaleConfig.defaultLocale = I18n.currentLocale()
        let eventId = props.eventId

        const value = {
            id: eventId,
            current_date: moment().format('YYYY-MM-DDT00:00:00.000+0000'),
            start_date: moment().startOf("month").format("YYYY-MM-DDT00:00:00.000+0000"),
            end_date: moment().endOf('month').format('YYYY-MM-DDT00:00:00.000+0000')
        }
        this.fetchAllBookingSlotByDate(value)
    }


    async fetchAllBookingSlotByDate(values, isFromMonthChange = false) {
        try {

            const {
                authData: { data },
            } = this.props;

            const response = await this.props.dispatch(
                callApi(values, MAKECALENDERMARKFORBOOKINGSLOT, data.token, POST_METHOD)
            );

            if (response.status === RESULT_OK) {
                if (response.data != undefined) {
                    let objDate = this.state.objData
                    if (response.data.subEvents != undefined && response.data.subEvents.length > 0 && isFromMonthChange == false) {
                        let arrSubSlotEvents = response.data.subEvents
                        arrSubSlotEvents.forEach((item) => {
                            this.makeArrayForSelectedDay(item.subSlotStartDate, item.subSlotEndDate, item.subSlotDays, objDate, item.subSlotId)
                        })
                    } 
                    if (response.data.monthEvents != undefined && response.data.monthEvents.length > 0) {
                        let arrSubEvents = response.data.monthEvents
                        arrSubEvents.forEach((objData) => {
                            let startDate = moment(
                                objData.subEventStartDate,
                                "YYYY-MM-DDTHH:mm:ss"
                            );
                            let item = startDate.format("YYYY-MM-DD")
                            objDate[item] = { selectedColor: AQUWA_MARINE, selected: false, marked: true, dotColor: PINK_RED, subEventId: objData.subEventId, disabled: false }
                        })

                    }
                    this.setState({
                        objData: objDate,
                    });
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
            
            if (current.isSameOrAfter(startDate) && current.isAfter(moment())) {
                let item = current.format("YYYY-MM-DD")
                result[item] = { selectedColor: AQUWA_MARINE, selected: false, marked: true, dotColor: PINK_RED, subSlotId: subSlotId, disabled: false }
            } 

            while (current.day(index + 7).isSameOrBefore(endDate)) {
                if (current.isAfter(moment())) {
                    let item = current.format("YYYY-MM-DD")
                result[item] = { selectedColor: AQUWA_MARINE, selected: false, marked: true, dotColor: PINK_RED, subSlotId: subSlotId, disabled: false }
                }
            }
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.popup}>
                    <IconButton
                        icon={'close'}
                        size={24}
                        style={{ alignSelf: 'flex-end' }}
                        color={PINK_RED}
                        onPress={() => {
                            Actions.pop()
                        }}
                    />
                    <Calendar
                        ref={ref => this.calendar = ref}
                        minDate={new Date()}
                        current={new Date()}
                        firstDay={1}
                        monthFormat={'MMM yyyy'}
                        hideExtraDays={true}
                        disabledByDefault={true}
                        disableAllTouchEventsForDisabledDays={true}
                        onMonthChange={(month) => {
                            
                            try {
                                let eventId = this.props.eventId
                                const value = {
                                    id: eventId,
                                    current_date: moment(month.timestamp).format('YYYY-MM-DDT00:00:00.000+0000'),
                                    start_date: moment(month.timestamp).startOf("month").format("YYYY-MM-DDT00:00:00.000+0000"),
                                    end_date: moment(month.timestamp).endOf('month').format('YYYY-MM-DDT00:00:00.000+0000')
                                }
                                this.fetchAllBookingSlotByDate(value, true)    
                            } catch (error) {
                                console.log(error)
                            }
                            
                        }}
                        onDayPress={(date) => {

                            let strDate = date.dateString
                            let objDate = this.state.objData
                            let object = objDate[strDate]
                            if (this.state.previousSel != undefined) {
                                let strPrevious = moment(this.state.previousSel).format("YYYY-MM-DD")
                                console.log("Previous sel:", strPrevious)
                                let objPreviousSel = objDate[strPrevious]
                                if (objPreviousSel != undefined) {
                                    objDate[strPrevious] = { selected: !objPreviousSel.selected, marked: objPreviousSel.marked, dotColor: PINK_RED, disabled: false , subSlotId: objPreviousSel.subSlotId != undefined ? objPreviousSel.subSlotId : undefined }
                                }
                                if (strPrevious == strDate) {
                                    this.setState({
                                        previousSel: undefined
                                    })
                                    return
                                }
                            }

                            if (object != undefined) {
                                objDate[strDate] = { selected: !object.selected, marked: object.marked, dotColor: PINK_RED, disabled: false, subSlotId: object.subSlotId }
                            } else {
                                objDate[strDate] = { selected: true }
                            }

                            this.setState({
                                objData: objDate,
                                previousSel: date.timestamp
                            })
                        }}
                        markedDates={this.state.objData}
                    />

                    <View
                        style={{
                            marginVertical: 15,
                            alignSelf: 'center',
                            width: '80%'
                        }}>

                        <CustomButton
                            text={translate('seeBooking')}
                            isDisable={this.state.previousSel == undefined}
                            onPress={() => {
                                Actions.pop()
                                setTimeout(() => {
                                    let objDate = this.state.objData
                                    let subSlotId = undefined
                                    let subEventId = undefined
                                    if (this.state.previousSel != undefined) {
                                        let strPrevious = moment(this.state.previousSel).format("YYYY-MM-DD")
                                        console.log("Previous sel:", strPrevious)
                                        let objPreviousSel = objDate[strPrevious]
                                        console.log("Previous sel sub index:", objPreviousSel.subSlotId)
                                        if (objPreviousSel.subSlotId != undefined)
                                            subSlotId = objPreviousSel.subSlotId
                                        else 
                                            subEventId = objPreviousSel.subEventId
                                    }
                                    Actions.refresh({
                                        eventDate: this.state.previousSel,
                                        subSlotId: subSlotId,
                                        subEventId: subEventId
                                    })
                                }, 500);
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(2,2,2,0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 25,
        paddingBottom: 20,
        paddingHorizontal: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

});

mapStateToProps = (state) => ({
    authData: state.authReducer.authData,
});

export default connect(
    mapStateToProps,
    null
)(SelectCalender);