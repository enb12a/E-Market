import React from "react";
import { View, Text, StyleSheet } from "react-native";
import normalize from 'react-native-normalize'
interface HomePageHeaderProps {
    headerText: string;
}
const HomePageHeaderComponent = ({ headerText }: HomePageHeaderProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTextStyle}>{headerText}</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: normalize(49),
        backgroundColor: "#2A59FE",
        justifyContent: "center"
    },
    headerTextStyle: {
        color: "#FFFFFF",
        fontSize: normalize(24),
        marginLeft: normalize(16),
        fontWeight: "800",

    }

});
export default HomePageHeaderComponent;