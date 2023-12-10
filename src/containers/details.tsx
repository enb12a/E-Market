import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import normalize from "react-native-normalize";
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomNavBar from "../components/BottomNavBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromFav, addToFav } from "../store/actions/favoriteActions";
import { addToCart, removeFromCart } from "../store/actions/cartActions";

const DetailPage = ({ route }: { route: any }) => {
    const { item } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const getFavList = useSelector((state: RootState) => state.favReducer);

    const onPressAddToCardButton = () => {
        dispatch(addToCart(item));
    };
    const AddItemToFav = () => {
        // Öğenin favori listesinde olup olmadığını kontrol et
        const isItemInFavList = getFavList.favItems.some(
            (favItem) => favItem.id === item.id
        );

        if (isItemInFavList) {

            // Öğe favori listesindeyse, kaldır
            dispatch(removeFromFav(item.id));
        } else {
            // Eğer öğe favori listesinde değilse, ekle
            dispatch(addToFav(item));
        }
    };
    const starColor = getFavList.favItems.some(
        (favItem) => favItem.id === item.id
    )
        ? "yellow"
        : "#D9D9D9";
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
                <Icon size={normalize(25)} style={{ fontWeight: "500", color: "#FFF" }} onPress={() => { navigation.goBack(); }} name="arrowleft"></Icon>
                <Text style={styles.headerTextStyle}>{item.name}</Text>
                <Icon disabled size={normalize(25)} style={{ color: "#2A59FE" }} name="arrowleft"></Icon>
            </View>
            <View style={styles.ImageContainer}>
                <Image source={{ uri: item.image }} style={{ height: normalize(255) }} ></Image>
                <View style={styles.starContainer}>
                    {/* <Text style={styles.star}>⭐</Text> */}
                    <Icon onPress={AddItemToFav} color={starColor} name="star" size={normalize(24)}></Icon>
                </View>
            </View>
            <Text style={styles.nameTextStyle}>{item.name}</Text>
            <ScrollView style={{ marginHorizontal: normalize(16), marginBottom: normalize(120) }}>
                <Text style={styles.descriptionTextStyle}>{item.description} </Text>
            </ScrollView>

            <View style={styles.PriceAndAddCardContainer} >
                <View style={{ marginLeft: normalize(16) }}>
                    <Text style={{ fontSize: normalize(18), fontWeight: "400", color: "#2A59FE" }}>Price:</Text>
                    <Text style={{ fontSize: normalize(18), fontWeight: "700", color: "#000" }}>{item.price + " ₺"}</Text>
                </View>
                <TouchableOpacity onPress={onPressAddToCardButton} style={styles.addToCardContainer}>
                    <Text style={{ color: "#FFF", fontSize: normalize(18), fontWeight: "700" }}>Add To Card</Text>
                </TouchableOpacity>
            </View>
            <BottomNavBar ></BottomNavBar>

        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: normalize(49),
        backgroundColor: "#2A59FE",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: normalize(16)
    },
    headerTextStyle: {
        color: "#FFFFFF",
        fontSize: normalize(24),
        marginLeft: normalize(16),
        fontWeight: "800",

    },
    ImageContainer: {
        margin: normalize(16)
    },
    PriceAndAddCardContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: normalize(60),
        width: "100%"
    },
    addToCardContainer: {
        backgroundColor: "#2A59FE",
        justifyContent: "center",
        alignItems: "center",
        gap: normalize(10),
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(8),
        marginRight: normalize(16)
    },
    nameTextStyle: {
        fontSize: normalize(20),
        fontWeight: "700",
        color: "#000",
        marginLeft: normalize(16),
        marginBottom: normalize(16)
    },
    descriptionTextStyle: {
        fontSize: normalize(14),
        fontWeight: "400",
        color: "#000",
        textAlign: "justify"
    },
    starContainer: {
        position: 'absolute',
        top: normalize(10),
        right: normalize(10),
    },
})
export default DetailPage;