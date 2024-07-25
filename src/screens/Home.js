import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { URL } from "../api";
import AppView from "../components/high-level/AppView";
import EmptyComponent from "../components/low-level/EmptyComponent";
import ProductItem from "../components/low-level/ProductItem";
import { hp } from "../helpers/common";
import useDebounce from "../hooks/debounce";
import useFetch from "../hooks/useFetch";
import FilterModal from "../modals/FilterModal";
import SearchBar from "../components/low-level/SearchBar";

const Home = () => {
  const [query, setQuery] = useState(""); // Arama sorgusu için durum
  const debouncedQuery = useDebounce(query, 300); // Arama sorgusunun debounced hali
  const modalRef = useRef(null); // Filtreler modalının referansı
  const { data, loading, error, refetch } = useFetch(URL); // API'den veri çekmek için hook
  const [filteredData, setFilteredData] = useState([]); // Filtrelenmiş veri
  const [displayedData, setDisplayedData] = useState([]); // Görüntülenen veri
  const [page, setPage] = useState(1); // Sayfa numarası
  const [refreshing, setRefreshing] = useState(false); // Yenileme durumu
  const [sortOption, setSortOption] = useState(null); // Sıralama seçeneği
  const [hasFilters, setHasFilters] = useState(false); // Filtre uygulanıp uygulanmadığını belirten durum
  const itemsPerPage = 12; // Sayfada gösterilen ürün sayısı

  // Filtreleri uygulama fonksiyonu
  const applyFilters = useCallback(
    (dataToFilter) => {
      // Arama sorgusuna göre filtreleme
      let filtered = dataToFilter.filter((item) => item.name.toLowerCase().includes(debouncedQuery.toLowerCase()));

      // Sıralama seçeneklerine göre sıralama
      if (sortOption === "priceAsc") {
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (sortOption === "priceDesc") {
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (sortOption === "nameAsc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === "nameDesc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      // Filtrelenmiş veriyi güncelle
      setFilteredData(filtered);
      setDisplayedData(filtered.slice(0, itemsPerPage));
    },
    [debouncedQuery, sortOption] // Bu değişkenler değiştiğinde filtreleri yeniden uygula
  );

  // Veri veya filtreler değiştiğinde filtreleri uygula
  useEffect(() => {
    if (data) {
      applyFilters(data);
    }
  }, [debouncedQuery, data, sortOption, applyFilters]);

  // Arama sorgusu sıfırlandığında sayfayı birinci sayfaya döndür
  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setPage(1);
    }
  }, [debouncedQuery]);

  // Daha fazla ürün yükleme fonksiyonu
  const handleLoadMore = () => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedData((prevData) => [...prevData, ...filteredData.slice(start, end)]);
    setPage((prevPage) => prevPage + 1);
  };

  // Sayfayı yenileme fonksiyonu
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Veriyi yeniden yükle
    setQuery(""); // Arama sorgusunu sıfırla
    setRefreshing(false);
  };

  // Filtreler modalını açma fonksiyonu
  const openFiltersModal = () => {
    modalRef.current?.present();
  };

  // Filtreleri uygulama fonksiyonu
  const handleApplyFilters = (sortOption) => {
    if (sortOption === null) {
      setQuery(""); // Filtreler sıfırlandığında arama sorgusunu sıfırla
      setSortOption(null); // Sıralama seçeneğini sıfırla
      setHasFilters(false); // Filtreler uygulanmadığını belirt
      applyFilters(data); // Filtreleri tekrar uygula
      return;
    }
    setSortOption(sortOption); // Sıralama seçeneğini güncelle
    setHasFilters(true); // Filtreler uygulandığını belirt
    applyFilters(data); // Filtreleri uygula
    setPage(1); // Sayfayı birinci sayfaya döndür
  };

  return (
    <AppView customHeader={true}>
      <FilterModal modalRef={modalRef} onApplyFilters={handleApplyFilters} />
      <View style={styles.header}>
        <Text style={styles.title}>Eteration</Text>
        <TouchableOpacity onPress={openFiltersModal} style={styles.filterButton}>
          <Ionicons name="filter-sharp" size={24} color="black" />
          {hasFilters && <View style={styles.filterIndicator} />}
        </TouchableOpacity>
      </View>
      <SearchBar query={query} onChangeQuery={setQuery} onClearQuery={() => setQuery("")} />
      {loading && !refreshing && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error.message}</Text>}
      <FlashList
        ListEmptyComponent={!loading && EmptyComponent}
        showsVerticalScrollIndicator={true}
        data={displayedData}
        numColumns={2}
        renderItem={({ item }) => <ProductItem item={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        estimatedItemSize={200}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: "600",
  },
  filterButton: {
    position: "relative",
  },
  filterIndicator: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
});

export default Home;
