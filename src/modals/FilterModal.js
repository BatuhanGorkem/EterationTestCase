import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo, useState, useCallback } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

const FilterModal = ({ modalRef, onApplyFilters }) => {
  const [selectedSort, setSelectedSort] = useState(null);
  const snapPoints = useMemo(() => ["25%", "70%"], []);

  const handleApplyFilters = useCallback(() => {
    onApplyFilters(selectedSort);
    modalRef.current?.dismiss();
  }, [selectedSort, onApplyFilters, modalRef]);

  const deleteAllFilters = () => {
    setSelectedSort(null);
    onApplyFilters(null);
    modalRef.current?.dismiss();
  };

  const getOptionStyle = (option) => {
    return {
      ...styles.option,
      backgroundColor: selectedSort === option ? "#007BFF" : "white",
      color: selectedSort === option ? "white" : "black",
    };
  };

  return (
    <BottomSheetModal ref={modalRef} index={1} snapPoints={snapPoints} enablePanDownToClose={true}>
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Sort By</Text>
        <TouchableOpacity style={getOptionStyle("priceDesc")} onPress={() => setSelectedSort("priceDesc")}>
          <Text style={styles.optionText}>Price: High to Low</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getOptionStyle("priceAsc")} onPress={() => setSelectedSort("priceAsc")}>
          <Text style={styles.optionText}>Price: Low to High</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getOptionStyle("nameAsc")} onPress={() => setSelectedSort("nameAsc")}>
          <Text style={styles.optionText}>Name: A to Z</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getOptionStyle("nameDesc")} onPress={() => setSelectedSort("nameDesc")}>
          <Text style={styles.optionText}>Name: Z to A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={deleteAllFilters}>
          <Text style={styles.applyButtonText}>Delete All Filters</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  applyButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FilterModal;
