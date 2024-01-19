import { StyleSheet, } from 'react-native';
import { normalize } from './FontSIze';
import { SEMI_BOLD, BOLD, MEDIUM } from './FontName';
import { RGB_51_51_51, RGB_161_161_181, CORAL, BLACK, BLACK_TWO, DUSK, CHARCOAL_GREY, PINK_RED, WHITE } from './Color';


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: WHITE
    },
    container1: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: WHITE
    },
    font34SemiBoldBlack: {
        fontSize: normalize(34),
        fontFamily: BOLD,
        color: RGB_51_51_51
    },
    font12RegularGrey: {
        fontSize: normalize(12),
        fontFamily: SEMI_BOLD,
        color: RGB_161_161_181
    },
    font14RegularBlack: {
        fontSize: normalize(14),
        fontFamily: SEMI_BOLD,
        color: BLACK
    },
    font15RegularBlackTwo: {
        fontSize: normalize(15),
        fontFamily: SEMI_BOLD,
        color: BLACK_TWO
    },
    font15RegularCoral: {
        fontSize: normalize(15),
        fontFamily: BOLD,
        color: PINK_RED
    },
    font24RegularDusk: {
        fontSize: normalize(24),
        fontFamily: SEMI_BOLD,
        color: DUSK
    },
    font16RegularCharCoalGrey: {
        fontSize: normalize(16),
        fontFamily: SEMI_BOLD,
        color: CHARCOAL_GREY
    },
    font10RegularPinkRed: {
        fontSize: normalize(10),
        fontFamily: SEMI_BOLD,
        color: PINK_RED
    },
    font17MediumDusk: {
        fontSize: normalize(17),
        fontFamily: SEMI_BOLD,
        color: DUSK
    },
    font28MediumDusk: {
        fontSize: normalize(28),
        fontFamily: BOLD,
        color: DUSK
    },
    errorText: {
        fontSize: normalize(12),
        color: 'red',
        fontFamily: MEDIUM,
    },
    refreshView: {
        width: '100%',
        height: '100%',
        marginTop: 10
    },

})