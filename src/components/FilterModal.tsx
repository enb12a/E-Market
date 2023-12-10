import React, { useEffect, useState } from "react";
import {
    View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from 'react-native'
import normalize from "react-native-normalize";
import Icon from 'react-native-vector-icons/EvilIcons'
import Divider from "./Divider";
import ConfigIcon from '../config/icons'
import { useSelector, useDispatch } from "react-redux";
import { toggleSortOption } from "../store/actions/sortByProdsActions";
import { addToBrandList, removeFromBrandList } from "../store/actions/filterByBrandActions";
import { RootState } from "../store/store";
import { addToModelList, removeFromModelList } from "../store/actions/filterByModelActions";
interface FilterModalProps {
    display: boolean;
    onCancel: () => void;
    AllDatas: any;
}

const FilterModal = ({ display, onCancel, AllDatas }: FilterModalProps) => {
    const dispatch = useDispatch();
    const sortDatas = useSelector((state: any) => state.sortReducer);

    const [brandDataFromHome, setBrandData] = useState(Array)
    const [modelDataFromHome, setModelData] = useState(Array)
    const [searchBrand, setSearchBrand] = useState("")
    const [searchModel, setSearchModel] = useState("")

    //Gelen data içinden modeli ayırıp selected seçeneği ile yeni bir array oluşturuyor
    const getModelData = (data: any) => {
        const modelData = data.map((item: any) => ({
            id: item.id,
            value: false,
            name: item.model,
            selected: false,
        }))
        setModelData(modelData)

    }
    //Gelen data içinden brandı ayırıp selected seçeneği ile yeni bir array oluşturuyor
    const getBradData = (data: any) => {
        const branddata = data.map((item: any) => ({
            id: item.id,
            value: false,
            name: item.brand,
            selected: false,
        }))
        setBrandData(branddata);


    }
    // Home sayfasından gelen datayı ayırıp statelere yerleştiriyor.

    useEffect(() => {
        getModelData(AllDatas);
        getBradData(AllDatas);
    }, [AllDatas])
    //Brand listesi checkbox fonksiyonu
    const onCheckedBtnClick = (id: any) => {
        if (id.selected == false) {
            dispatch(addToBrandList({ ...id, selected: true }))
        }
        else {
            dispatch(removeFromBrandList(id.id))
        }

        var newitem = brandDataFromHome?.map((item: any) => {
            item.id === id.id ? item.selected = !id.selected : item.selected = item.selected
            return item;
        });
        setBrandData(newitem)
    };

    //Model listesi checkbox fonksiyonu
    const onCheckedBtnClickModel = (id: any) => {

        if (id.selected == false) {
            dispatch(addToModelList({ ...id, selected: true }))
        }
        else {
            dispatch(removeFromModelList(id.id))
        }

        var newitem = modelDataFromHome.map((item: any) => {
            item.id === id.id ? item.selected = !id.selected : item.selected = item.selected
            return item;
        });
        setModelData(newitem)


    };
    //Sort By radio button fonksiyonu
    const onRadioBtnClickSortBy = (item: any) => {
        dispatch(toggleSortOption(item.id))
    };

    //Primary butonu press fonksiyonu
    const onPressPrimaryButton = () => {
        onCancel();
    }

    ///////////////////////klavye açılır kapanır durum kontrolu 
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            }
        );


        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    ////////////////search işlemleri
    useEffect(() => {
        handleSearchBrand(searchBrand);
        handleSearchModel(searchModel);

    }, [searchBrand, searchModel]);


    const handleSearchBrand = (searchTerm: string) => {
        if (!brandDataFromHome) return;
        if (searchTerm != "") {
            const filteredData = brandDataFromHome.filter((products: any) => products.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setBrandData(filteredData);
        } else {
            getBradData(AllDatas);
        }


    }
    const handleSearchModel = (searchTerm: string) => {
        if (!modelDataFromHome) return;
        if (searchTerm != "") {
            const filteredData = modelDataFromHome.filter((products: any) => products.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setModelData(filteredData);
        } else {
            getModelData(AllDatas);
        }


    }

    
    return (

        <Modal
            style={{ height: "100%", display: "flex", }}
            visible={display}

        >
            {/* Filter Header */}
            <View style={styles.headerStyle} >
                <Icon color={"#000"} size={normalize(26)} onPress={() => { onCancel(); }} name="close" />
                <Text style={{ color: "#000", fontSize: normalize(20), fontWeight: "300" }} >Filter</Text>
                <Icon size={normalize(26)} name="close" color={"white"} />
            </View>
            {/* Sort By */}
            <View style={{

                marginHorizontal: normalize(17),
                marginVertical: normalize(16),
                height: "25%",
                display: "flex",
                flex: 1,
            }}>
                <Text style={styles.smallTitleStyle}>Sort By</Text>
                <ScrollView keyboardShouldPersistTaps="handled" style={{ marginTop: normalize(6), padding: normalize(15) }}>
                    {sortDatas.map((item: any) => (
                        <TouchableOpacity onPress={() => { onRadioBtnClickSortBy(item) }} key={item.id} style={{ display: "flex", flexDirection: "row", marginBottom: normalize(15) }}>
                            <View style={item.selected === true ? styles.radioChecked : styles.radio}>
                                {item.selected && <View style={{ width: normalize(10), height: normalize(10), borderRadius: normalize(12), backgroundColor: "#2A59FE", }} />}
                            </View>
                            <Text style={{ color: "black", fontSize: normalize(14), marginLeft: normalize(9) }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Divider></Divider>
            {/* Brand  Filter */}

            <View style={{
                padding: normalize(15),
                marginBottom: normalize(16),
                height: "25%",
                display: "flex",
                flex: 1,

            }} >
                <View style={{ marginBottom: normalize(9) }}>
                    <Text style={styles.smallTitleStyle}>Brand</Text>
                </View>
                <View style={styles.searchSection}>
                    <Icon
                        name="search"
                        size={normalize(24)}
                        style={styles.searchIconStyle}
                        color={"#868DA5"}></Icon>
                    <TextInput
                        onChangeText={(searchTerm) => setSearchBrand(searchTerm)}
                        onSubmitEditing={() => handleSearchBrand(searchBrand)}
                        placeholder="Search"
                        placeholderTextColor={"#868DA5"}
                        style={styles.textInputStyle}>
                    </TextInput>

                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    persistentScrollbar={true}
                    style={{ marginTop: normalize(12), padding: normalize(15) }}>

                    {brandDataFromHome.map((item: any) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => { onCheckedBtnClick(item) }}
                            style={{ display: "flex", flexDirection: "row", marginBottom: normalize(15) }}>
                            <View style={item.selected === true ? styles.checkedBox : styles.checkbox}>
                                {item.selected && <ConfigIcon name="approve" color={"#FFFFFF"} size={normalize(12)} />}
                            </View>
                            <Text style={{ color: "black", fontSize: normalize(14), marginLeft: normalize(9) }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
            <Divider></Divider>
            {/* Model  Filter */}
            <View style={{
                padding: normalize(15),
                display: "flex",
                flex: 1,
                height: "25%"
            }} >
                <View style={{
                    marginHorizontal: normalize(17),
                    marginBottom: normalize(9),
                }}>
                    <Text style={styles.smallTitleStyle}>Model</Text>
                </View>
                <View style={styles.searchSection}>
                    <Icon
                        name="search"
                        size={normalize(24)}
                        style={styles.searchIconStyle}
                        color={"#868DA5"}></Icon>
                    <TextInput
                        onChangeText={(searchTerm) => setSearchModel(searchTerm)}
                        onSubmitEditing={() => handleSearchModel(searchModel)}
                        placeholder="Search"
                        placeholderTextColor={"#868DA5"}
                        style={styles.textInputStyle}>
                    </TextInput>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    persistentScrollbar={true}
                    style={{ marginTop: normalize(12), padding: normalize(15), height: "15%" }}>
                    {modelDataFromHome.map((item: any) => (
                        <TouchableOpacity
                            onPress={() => { onCheckedBtnClickModel(item) }}
                            key={item.id}
                            style={{ display: "flex", flexDirection: "row", marginBottom: normalize(15) }}>
                            <View style={item.selected === true ? styles.checkedBox : styles.checkbox}>
                                {item.selected == true && <ConfigIcon name="approve" color={"#FFFFFF"} size={normalize(12)} />}
                            </View>
                            <Text style={{ color: "black", fontSize: normalize(14), marginLeft: normalize(9) }}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
            {/* Primary button */}

            {keyboardOpen == false ? <TouchableOpacity onPress={onPressPrimaryButton} style={{
                height: normalize(38),
                marginHorizontal: normalize(18),
                backgroundColor: "#2A59FE",
                marginTop: normalize(30),
                justifyContent: "center",
                alignItems: "center",
                marginBottom: normalize(20),


            }}>
                <Text style={{ color: "#FFF", fontSize: normalize(18), fontWeight: "700" }}>Primary</Text>
            </TouchableOpacity> :
                null}

        </Modal>

    )
};
const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: normalize(70),
        paddingHorizontal: normalize(20),
        borderBottomColor: "#0000001a",
        borderBottomWidth: 1
    },
    smallTitleStyle: {
        color: "#333333b3",
        fontSize: normalize(12),
        fontWeight: "400",

    },
    radio: {
        height: normalize(20),
        width: normalize(20),
        borderRadius: normalize(20),
        borderWidth: 2,
        borderColor: "#2A59FE"

    },
    radioChecked: {
        height: normalize(20),
        width: normalize(20),
        borderRadius: normalize(20),
        borderWidth: 2,
        borderColor: "#2A59FE",
        justifyContent: 'center',
        alignItems: 'center',

    },
    searchSection: {
        height: normalize(40),
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: '#FAFBFB',
        marginHorizontal: normalize(16),
        paddingHorizontal: normalize(12),
        display: "flex",


    },
    searchIconStyle: {
        paddingRight: normalize(8),
        justifyContent: "center",
        alignItems: "center",
    },
    textInputStyle: {
        paddingHorizontal: normalize(12),
        color: "#000000",
        justifyContent: "center",
        alignItems: "center",
        fontSize: normalize(18),
        fontWeight: "300",
    },
    checkbox: {
        height: normalize(20),
        width: normalize(20),
        borderRadius: normalize(4),
        borderWidth: 2,
        borderColor: "#2A59FE"
    },
    checkedBox: {
        height: normalize(20),
        width: normalize(20),
        borderRadius: normalize(4),
        backgroundColor: "#2A59FE",
        justifyContent: 'center',
        alignItems: 'center',
    }


})
export default FilterModal;
