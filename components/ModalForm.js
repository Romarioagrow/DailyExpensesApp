import React from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PurchaseForm from './PurchaseForm';

const ModalForm = ({ showModal, setShowModal, newPurchase, onTypeChange, onDescriptionChange, onPriceChange, onDateChange, addPurchase }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <PurchaseForm
            newPurchase={newPurchase}
            onTypeChange={onTypeChange}
            onDescriptionChange={onDescriptionChange}
            onPriceChange={onPriceChange}
            onDateChange={onDateChange} // Передаем обработку изменения даты
            addPurchase={addPurchase}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalForm;
