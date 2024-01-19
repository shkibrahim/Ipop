import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import GlobleStyles from '../helper/GlobleStyles';
import { DUSK } from '../helper/Color';
import Avatar from '../components/Avatar';
import { getAvatarInitials } from '../helper/Helper';
import { TouchableOpacity } from 'react-native-gesture-handler';


class PeopleRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            // <Card style={{ marginVertical: 10, marginHorizontal: 5 }}>

                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10, 
                        marginHorizontal: 5
                    }}
                    onPress={this.props.onPress}
                    >

                    <Avatar
                        img={
                            this.props.objProfile != undefined && (this.props.objProfile.preview_profile_picture != undefined || this.props.objProfile.profile_picture != undefined)
                                ? { uri: this.props.objProfile.preview_profile_picture ?? this.props.objProfile.profile_picture }
                                : undefined
                        }
                        placeholder={getAvatarInitials(this.props.objProfile.user_name == undefined ? this.props.objProfile.first_name + " " + this.props.objProfile.last_name : this.props.objProfile.user_name)}
                        width={50}
                        height={50}
                        roundedImage={false}
                        roundedPlaceholder={false}
                    />

                    <Text
                        style={[GlobleStyles.font16RegularCharCoalGrey,
                        {
                            color: DUSK,
                            marginStart: 15,
                            flex: 1
                        }]}>
                        {this.props.objProfile.user_name == undefined ? this.props.objProfile.first_name + " " + this.props.objProfile.last_name : this.props.objProfile.user_name}
                    </Text>

                </TouchableOpacity>

            // </Card>
        );
    }
}

export default PeopleRow;
