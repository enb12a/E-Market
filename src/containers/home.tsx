import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from "react-native";
import HomePageHeaderComponent from "../components/HomePageHeader";
import ProducsCard from "../components/productsCard";
import normalize from "react-native-normalize";
import Icon from '../config/icons';
import BottomNavBar from "../components/BottomNavBar";
import FilterModal from "../components/FilterModal";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { getAllProducts } from "../store/actions/getAllProductsActions";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state: RootState) => state.productsReducer);
    const sortOptions = useSelector((state: any) => state.sortReducer)
    const brandList = useSelector((state: any) => state.brandReducer);
    const filterModelList = useSelector((state: RootState) => state.FilterModelReducer)
    const [search, setSearch] = useState('');
    const [displayFilter, setDisplayFilter] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Tüm ürünleri almak için Redux eylemini çağırır
        dispatch(getAllProducts());
    }, [])
    useEffect(() => {
        // Ürünler değiştiğinde, görüntülenecek veriyi günceller
        setData(products);
    }, [products]);

    const sortedData = useMemo(() => {
        // Sıralama ve filtreleme işlemlerini uygular
        const sorted = [...data];
        const selectedSortOption = sortOptions.find((option: any) => option.selected);

        if (selectedSortOption) {
            switch (selectedSortOption.name) {
                case 'Old to new':
                    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case 'New to old':
                    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case 'Price high to low':
                    sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                    break;
                case 'Price low to high':
                    sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                    break;
                default:
                    break;
            }
        }
        const modelListFilter = filterModelList.modelList.filter((model: any) => model.selected);
        const brandListFilter = brandList.brandList.filter((brand: any) => brand.selected);

        const additionalFilter = (item: any) => {

            const brandFilter =
                brandListFilter.length === 0 || brandListFilter.some((brand: any) => brand.name === item.brand);

            const modelFilter =
                modelListFilter.length === 0 ||
                modelListFilter.some((model: any) => model.name === item.model);
            return brandFilter && modelFilter;
        };

        return sorted.filter(additionalFilter);

    }, [data, sortOptions, brandList, filterModelList]);
    // Filtreleme modalını kapatır
    const onCancelFilter = () => {
        setDisplayFilter(false)
    }

    // Arama terimi değiştiğinde, filtreleme işlemini gerçekleştirir
    useEffect(() => {
        handleSearch(search);
    }, [search]);
    // Arama işlemini gerçekleştirir ve filtrelenmiş veriyi günceller
    const handleSearch = (searchTerm: any) => {
        if (searchTerm != "") {
            const filteredData = sortedData.filter((products: any) => products.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setData(filteredData);
        } else {
            setData(products);
        }

    }

    const [page, setPage] = useState(1); // Sayfa numarasını takip etmek için state ekledik
    const pageSize = 6; // Sayfa başına gösterilecek ürün sayısı

    const handleLoadMore = () => {
        // Infinite scroll işlemi için sayfa numarasını arttırıyoruz
        setPage(page + 1);
   
    };

    // const renderFooter = () => {
    //     // Veriler yüklenirken kullanıcıya bir loading gösterebilirsiniz
    //     return  <ActivityIndicator size="large" color="#2A59FE" /> ;
    // };


    return (
        <View style={styles.container} >
            <HomePageHeaderComponent headerText={"E-Market"}  ></HomePageHeaderComponent>
            <View style={styles.searchSection}>
                <Icon
                    name="search"
                    size={normalize(19)}
                    style={styles.searchIconStyle}
                    color={"#000000"}></Icon>
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={"#000"}
                    style={styles.textInputStyle}
                    onChangeText={(searchTerm) => setSearch(searchTerm)}
                    onSubmitEditing={() => handleSearch(search)}
                >
                </TextInput>
            </View>
            <View style={styles.filtersViewStyle} >
                <Text style={{ color: "#000", fontSize: normalize(18), fontWeight: "500" }} >Filters:</Text>
                <TouchableOpacity onPress={() => { setDisplayFilter(true) }} style={styles.filterButtonStyle}>
                    <Text style={{ color: "#000", fontSize: normalize(14), fontWeight: "400" }}> Select Filter </Text>
                </TouchableOpacity>
            </View>
            {loading == true && <ActivityIndicator></ActivityIndicator>}
            <FlatList
                style={{ marginTop: normalize(24), marginBottom: normalize(40) }}
                data={page == 1 ? sortedData.slice(0, page * pageSize) : sortedData} // Gösterilecek ürünleri sayfa numarasına göre filtreledik
                renderItem={({ item }) => (
                    <ProducsCard
                        item={item}
                    ></ProducsCard>
                )}
                numColumns={2}
                keyExtractor={(item: any) => `${item.id}`}
                onEndReached={handleLoadMore} // FlatList en sona ulaştığında çağrılacak fonksiyonu belirtiyoruz
                onEndReachedThreshold={0.1} // onEndReached fonksiyonunun ne zaman çağrılacağını belirleyen eşik değeri
                // ListFooterComponent={renderFooter} // Sayfa sonuna gelindiğinde gösterilecek component
             
            >
            </FlatList>
            <FilterModal key={products.length} AllDatas={products} display={displayFilter} onCancel={onCancelFilter}></FilterModal>
            <BottomNavBar ></BottomNavBar>
        </View >
    )

};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF"
    },
    searchSection: {
        height: normalize(48),
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: normalize(16),
        paddingHorizontal: normalize(12),
        marginTop: normalize(14),
    },
    textInputStyle: {
        paddingHorizontal: normalize(12),
        color: "#000000",
        justifyContent: "center",
        alignItems: "center",
        fontSize: normalize(18),
        fontWeight: "500",
    },
    searchIconStyle: {
        paddingRight: normalize(8),
        justifyContent: "center",
        alignItems: "center",
    },
    filtersViewStyle: {
        marginHorizontal: normalize(16),
        marginTop: normalize(19),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    filterButtonStyle: {
        width: normalize(158),
        height: normalize(36),
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center"
    }



});

export default Home;