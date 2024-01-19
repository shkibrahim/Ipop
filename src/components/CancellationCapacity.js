import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Divider,
    IconButton,
    RadioButton,
    Checkbox
} from 'react-native-paper';
import { connect } from 'react-redux';
import {
    BLACK,
    BLACK_FOUR,
    DUSK,
    PINKISH_GREY,
    PINK_RED,
    RGB_161_161_181,
} from '../helper/Color';
import { MEDIUM, SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { BusinessUserSubscription, showToastMessage } from '../helper/Helper';
import { translate } from '../helper/Language';

export default class CancellationCapacity extends Component {
    constructor(props) {
        super(props);
        var cancellationPolicy = 0
        if (props.objCancellationCapacity != undefined) {
            if (props.objCancellationCapacity.cancellationPolicy == 'FreeOfCharge') {
                cancellationPolicy = 0
            } else if (props.objCancellationCapacity.cancellationPolicy == 'NoRefund') {
                cancellationPolicy = 1
            } else {
                cancellationPolicy = 2
            }
        }
        this.state = {
            eventCancellation: cancellationPolicy, //0-Free , 1-0% refund, 2-50% refund before
            eventCancellationRefundBefore: (props.objCancellationCapacity != undefined && cancellationPolicy == 2) ? (props.objCancellationCapacity.duration_type == 'Days' ? 0 : 1) : 0, //0-Day, 1-Hour
            numDay: (props.objCancellationCapacity != undefined && props.objCancellationCapacity.duration_type == 'Days') ? props.objCancellationCapacity.duration : '',
            numHour: (props.objCancellationCapacity != undefined && props.objCancellationCapacity.duration_type == 'Hours') ? props.objCancellationCapacity.duration : '',
            guestNumber: props.objCancellationCapacity != undefined ? props.objCancellationCapacity.maximumCapacity.toString() : ''
        };
    }

    shouldComponentUpdate(nextProps) {
        if (this.props != nextProps && nextProps.objCancellationCapacity != this.props.objCancellationCapacity) {
            var cancellationPolicy = 0
            if (nextProps.objCancellationCapacity != undefined) {
                if (nextProps.objCancellationCapacity.cancellationPolicy == 'FreeOfCharge') {
                    cancellationPolicy = 0
                } else if (nextProps.objCancellationCapacity.cancellationPolicy == 'NoRefund') {
                    cancellationPolicy = 1
                } else {
                    cancellationPolicy = 2
                }
            }
            this.setState({
                eventCancellation: cancellationPolicy, //0-Free , 1-0% refund, 2-50% refund before
                eventCancellationRefundBefore: (props.objCancellationCapacity != undefined && cancellationPolicy == 2) ? (props.objCancellationCapacity.duration_type == 'Days' ? 0 : 1) : 0, //0-Day, 1-Hour                numDay: (props.objCancellationCapacity != undefined && props.objCancellationCapacity.duration_type == 'Days') ? props.objCancellationCapacity.duration : '',
                numHour: (props.objCancellationCapacity != undefined && props.objCancellationCapacity.duration_type == 'Hours') ? props.objCancellationCapacity.duration : '',
                guestNumber: props.objCancellationCapacity != undefined ? props.objCancellationCapacity.maximumCapacity : ''
            })
        }
        return true
    }

    getJson() {
        let objData = {
            maximumCapacity: this.state.guestNumber,
            cancellationPolicy: this.state.eventCancellation == 0 ? 'FreeOfCharge' : this.state.eventCancellation == 1 ? 'NoRefund' : 'HalfRefund'
        }
        if (this.state.eventCancellation == 2) {
            if (this.state.eventCancellationRefundBefore == 0) {
                objData.duration_type = 'Days'
                objData.duration = this.state.numDay
            } else {
                objData.duration_type = 'Hours'
                objData.duration = this.state.numHour
            }
        }
        return objData
    }

    validate() {


        if (this.state.eventCancellation == 2 && this.props.isAdvanceAcc) {
            if (this.state.eventCancellationRefundBefore == 0 && (this.state.numDay == '' || this.state.numDay == '0')) {
                showToastMessage(translate("Please_select_valid_number_of_days_for_event_cancellation"))
                return false
            } else if (this.state.eventCancellationRefundBefore == 1 && (this.state.numHour == '' || this.state.numHour == '0')) {
                showToastMessage(translate("Please_select_valid_number_of_hours_for_event_cancellation"))
                return false
            }
        } else if (parseInt(this.state.guestNumber) > 200) {
            showToastMessage("You can not add more then 200 guest")
        }
        return true
    }
    RenderManageTicket({ numTicket, onManageTicketPress }) {
        return (
            <View style={{ marginVertical: 15, flex: 1 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        if (numTicket > 0) {
                            onManageTicketPress(numTicket)
                        } else {
                            showToastMessage(translate("Please_enter_guest_number"))
                        }
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            style={{
                                marginVertical: 10,
                                resizeMode: 'cover'
                            }}
                            source={require('../images/AddEvent/SelectTicket/manageTicket.png')}
                        />
                        <Text
                            style={{
                                fontFamily: MEDIUM,
                                fontSize: normalize(15),
                                color: PINK_RED,
                                marginLeft: 10
                            }}
                        >
                            {translate('Manage_tickets')}
                        </Text>
                    </View>
                    <IconButton
                        size={25}
                        icon={'chevron-right'}
                        color={DUSK}
                    />
                </TouchableOpacity>

                <Divider style={{ height: 2 }} theme={{
                    colors: {
                        primary: RGB_161_161_181
                    }
                }} />
            </View>

        )
    }


    EventCancellationPolicy = () => {

        return (
            <View style={{ marginVertical: 10 }}>

                <View>

                    <Text style={[styles.floatingLabel, { flex: 1, marginTop: 1, color: RGB_161_161_181 }]}> {translate('Event_Cancellation_Policy')} </Text>


                    <View
                        style={{
                            marginVertical: 10,
                            flexDirection: 'row',
                        }}>

                        <Checkbox.Android
                            value={0}
                            color={PINK_RED}
                            uncheckedColor={PINKISH_GREY}
                            status={this.state.eventCancellation === 0 ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ eventCancellation: 0 })}
                        />

                        <Text style={[styles.floatingValue, { color: BLACK_FOUR }]}> {translate('Free_of_charge')} </Text>

                    </View>

                    <View
                        style={{
                            marginVertical: 6,
                            flexDirection: 'row',
                        }}>

                        <Checkbox.Android
                            value={1}
                            color={PINK_RED}
                            uncheckedColor={PINKISH_GREY}
                            status={this.state.eventCancellation === 1 ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ eventCancellation: 1 })}
                        />

                        <Text style={[styles.floatingValue, { color: BLACK_FOUR }]}> {translate('0_refund')} </Text>


                    </View>

                    <View
                        style={{
                            marginVertical: 6,
                            flexDirection: 'row',
                        }}>

                        <Checkbox.Android
                            value={2}
                            color={PINK_RED}
                            uncheckedColor={PINKISH_GREY}
                            status={this.state.eventCancellation === 2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                this.setState({
                                    eventCancellation: 2,
                                    eventCancellationRefundBefore: 0
                                })
                            }}
                        />

                        <Text style={[styles.floatingValue, { color: BLACK_FOUR }]}> {translate('50_refund_before')} </Text>


                    </View>
                    {
                        this.state.eventCancellation === 2 && <View style={{ marginStart: 25, flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <RadioButton.Android
                                    value={0}
                                    color={PINK_RED}
                                    uncheckedColor={PINKISH_GREY}
                                    status={this.state.eventCancellationRefundBefore === 0 ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({ eventCancellationRefundBefore: 0 })}
                                />

                                <Text style={[styles.floatingLabel, { marginTop: 1, color: BLACK_FOUR }]}> {translate('Day')} </Text>

                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <RadioButton.Android
                                    value={1}
                                    color={PINK_RED}
                                    uncheckedColor={PINKISH_GREY}
                                    status={this.state.eventCancellationRefundBefore === 1 ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({ eventCancellationRefundBefore: 1 })}
                                />

                                <Text style={[styles.floatingLabel, { marginTop: 1, color: BLACK_FOUR }]}> {translate('Hour')} </Text>

                            </View>

                            <TextInput
                                name="refundBefore"
                                style={styles.textInputGuest}
                                textAlignVertical='center'
                                keyboardType='number-pad'
                                returnKeyType='done'
                                maxLength={this.state.eventCancellationRefundBefore === 0 ? 3 : 2}
                                value={
                                    this.state.eventCancellationRefundBefore == 0 ?
                                        this.state.numDay :
                                        this.state.numHour
                                }
                                onChangeText={(text) => {
                                    if (this.state.eventCancellationRefundBefore == 0) {
                                        this.setState({ numDay: text })
                                    } else {
                                        this.setState({ numHour: text })
                                    }
                                }}

                            />

                        </View>
                    }
                </View>

                <Divider style={{ marginTop: 15, height: 2 }} theme={{
                    colors: {
                        primary: RGB_161_161_181
                    }
                }} />

            </View>

        )

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.ticketLabel}>
                    {translate('Tickets')}
                </Text>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.floatingValue, { flex: 1, marginTop: 5 }]}>
                        {translate('Maximum_capacity')}
                    </Text>

                    <TextInput
                        name="guestNumber"
                        style={styles.textInputGuest}
                        textAlignVertical="center"
                        keyboardType="number-pad"
                        returnKeyType="done"
                        value={this.state.guestNumber}
                        onChangeText={(text) => {
                            this.setState({ guestNumber: text })
                        }}
                        maxLength={5}
                    />
                </View>
                <this.RenderManageTicket
                    numTicket={this.state.guestNumber ?? 0}
                    onManageTicketPress={(numTicket) => {
                        this.props.onManageTicketPress(numTicket)
                    }}
                />
                {/* {
                    this.props.isAdvancePopup && <this.EventCancellationPolicy />
                } */}

            </View>
        );
    }
}


const styles = StyleSheet.create({
    ticketLabel: {
        fontFamily: MEDIUM,
        fontSize: normalize(15),
        color: RGB_161_161_181,
        marginVertical: 20

    },
    floatingValue: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(15),
        color: DUSK,
        marginTop: 8,
    },
    textInputGuest: {
        minWidth: '25%',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 4,
        borderColor: PINK_RED,
        borderRadius: 6,
        textAlign: 'center',
        fontFamily: SEMI_BOLD,
        color: BLACK,
        fontSize: normalize(15),
    },
})
