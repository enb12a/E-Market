import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import normalize from "react-native-normalize";
import HomePageHeaderComponent from "../components/HomePageHeader";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addToCart, removeFromCart } from "../store/actions/cartActions";
const BasketPage = () => {
    const cartItems = useSelector((state: RootState) => state.cartReducer);
    const dispatch = useDispatch();

    // Sepetteki benzer ürünleri gruplamak için bir işlev
    const groupItems = (items: any[]) => {
        const groupedItems: any[] = [];

        items.forEach((item) => {
            const existingItem = groupedItems.find((groupedItem) => groupedItem.id === item.id);

            if (existingItem) {
                // Eğer ürün zaten gruplanmışsa, sadece miktarını artır
                existingItem.quantity += 1;
            } else {
                // Yeni bir grup oluştur
                groupedItems.push({ ...item, quantity: 1 });
            }
        });

        return groupedItems;
    };

    const groupedCartItems = groupItems(cartItems.cartItems);

    const addItemMore = (item: any) => {
        dispatch(addToCart(item));
    };

    const removeItem = (id: any) => {
        dispatch(removeFromCart(id));
    };

    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "#FFF" }}>
            <HomePageHeaderComponent headerText="E-Market"></HomePageHeaderComponent>
            <ScrollView style={{marginBottom:normalize(120)}}>
            {groupedCartItems.length !== 0 &&
                groupedCartItems.map((item) => (
                   
                        <View style={styles.PriceAndAddCardContainer} key={item.id}>
                        <View style={{ marginLeft: normalize(16) }}>
                            <Text style={{ fontSize: normalize(16), fontWeight: "400", color: "#000" }}>{item.name}</Text>
                            <Text style={{ fontSize: normalize(13), fontWeight: "500", color: "#2A59FE" }}>{item.price + " ₺"}</Text>
                        </View>
                        <View style={{
                            borderWidth: 0.8,
                            borderColor: "#F3F3F6",
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            marginVertical: normalize(8),
                            height: normalize(48),
                            marginHorizontal: normalize(16),
                            borderRadius: normalize(4),
                        }}>
                            <TouchableOpacity
                                onPress={() => { removeItem(item.id) }}
                                style={{
                                    height: normalize(48),
                                    width: normalize(48),
                                    backgroundColor: "#F3F3F6",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: normalize(4)
                                }}>
                                <Text style={{ color: "#333", fontSize: normalize(25) }} >-</Text>
                            </TouchableOpacity>
                            <View style={{
                                borderRadius: normalize(4),
                                height: normalize(48),
                                width: normalize(48),
                                backgroundColor: "#2A59FE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#FFF", }} >{item.quantity}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => { addItemMore(item) }}
                                style={{
                                    borderRadius: normalize(4),
                                    height: normalize(48),
                                    width: normalize(48),
                                    backgroundColor: "#F3F3F6",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <Text style={{ color: "#333", fontSize: normalize(25) }}>+</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                
                ))
            }
            </ScrollView>
            <View style={styles.PriceAndAddCardContainer2} >
                <View style={{ marginLeft: normalize(16) }}>
                    <Text style={{ fontSize: normalize(18), fontWeight: "400", color: "#2A59FE" }}>Total:</Text>
                    <Text style={{ fontSize: normalize(18), fontWeight: "700", color: "#000" }}>{calculateTotal(groupedCartItems) + " ₺"}</Text>
                </View>
                <TouchableOpacity style={styles.addToCardContainer}>
                    <Text style={{ color: "#FFF", fontSize: normalize(18), fontWeight: "700" }}>Complete</Text>
                </TouchableOpacity>
            </View>
            <BottomNavBar></BottomNavBar>
        </View>
    );
};

// Toplu ürün fiyatını hesaplayan yardımcı bir fonksiyon
const calculateTotal = (items: any[]) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};
const styles = StyleSheet.create({
    PriceAndAddCardContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: normalize(27),
        

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
    PriceAndAddCardContainer2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: normalize(60),
        width: "100%"
    }
});

export default BasketPage;