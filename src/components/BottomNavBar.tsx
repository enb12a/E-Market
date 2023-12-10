import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";



const BottomNavBar = () => {
    const navigation = useNavigation();
    const cartItems = useSelector((state: RootState) => state.cartReducer);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={styles.containerIcon}>
                <Icon size={normalize(25)} color={"#000"} name="home" ></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("BasketPage") }} style={styles.containerIcon}>
                <View style={styles.shoppingBagContainer}>
                    <Icon size={normalize(25)} color={"#000"} name="shopping-bag" ></Icon>
                    {/* Yuvarlak kırmızı etiket */}
                    {cartItems.cartItems.length != 0 && <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{cartItems.cartItems.length}</Text>
                    </View>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.containerIcon}>
                <Icon size={normalize(25)} color={"#000"} name="star" ></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.containerIcon}>
                <Icon size={normalize(25)} color={"#000"} name="user" ></Icon>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: normalize(40),
        position: 'absolute',
        bottom: 0,
        justifyContent: "space-around",
        backgroundColor: "#FFF",
        flexDirection: "row",
        alignItems: "center",
        borderTopColor: "#0000004d",
        borderTopWidth: 1,
        elevation: 5
    },
    shoppingBagContainer: {
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: normalize(20),
        height: normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: normalize(12),
    },
    containerIcon: {
        height: '100%',
        width: normalize(30),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default BottomNavBar;
