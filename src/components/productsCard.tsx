import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
import { addToFav, removeFromFav } from "../store/actions/favoriteActions";
import { RootState } from "../store/store";

interface ProducsCardProps {
    item: any
}
const ProducsCard = ({ item }: ProducsCardProps) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    const getFavList = useSelector((state: RootState) => state.favReducer);

    //Seçilen itemin detay sayfasına git.
    const onPressCard = () => {
        navigation.navigate("DetailPage", { item: item })
    }
    //Seçilen itemi Sepete ekle
    const onPressAddToCardButton = () => {
        dispatch(addToCart(item));
    };

    const AddItemToFav = () => {
        // Öğenin favori listesinde olup olmadığını kontrol et
        const isItemInFavList = getFavList.favItems.some(
            (favItem) => favItem.id === item.id
        );

        if (isItemInFavList) {
            console.log("qaaaaaaaa")
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
        <TouchableOpacity onPress={onPressCard} style={styles.container}>
            {item.image != null ?
                <Image
                    source={{ uri: item.image }}
                    style={{ width: normalize(150), height: normalize(150) }} >
                </Image> :
                <View
                    style={{ width: normalize(150), height: normalize(150), backgroundColor: "gray" }}
                >
                </View>
            }
            <TouchableOpacity onPress={AddItemToFav} style={styles.starContainer}>
                {/* <Text style={styles.star}>⭐</Text> */}
                <Icon color={starColor} name="star" size={normalize(30)}></Icon>
            </TouchableOpacity>
            <Text style={styles.priceTextStyle}>{item.price + " ₺"}</Text>
            <Text style={styles.nameTextStyle}>{item.name}</Text>
            <TouchableOpacity onPress={() => { onPressAddToCardButton(); }} style={styles.addToCardButtonStyle}>
                <Text style={{ color: "#FFF" }}> Add To Cart</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        height: "auto",
        padding: normalize(10),
        marginLeft: normalize(15),
        marginRight: normalize(14),
        marginBottom: normalize(14),
        elevation: 1,
    },
    starContainer: {
        position: 'absolute',
        top: normalize(10),
        right: normalize(10),
    },
    star: {
        fontSize: normalize(30),
        color: 'yellow',
    },
    priceTextStyle: {
        color: "#2A59FE",
        fontWeight: "500",
        fontSize: normalize(14),
        marginTop: normalize(14)
    },
    nameTextStyle: {
        color: "#000000",
        fontWeight: "500",
        fontSize: normalize(14),
        marginTop: normalize(14)
    },
    addToCardButtonStyle: {
        backgroundColor: "#2A59FE",
        borderRadius: 4,
        marginTop: normalize(14),
        height: normalize(36),
        justifyContent: "center",
        alignItems: "center"
    }

})
export default ProducsCard;
