import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles';


const ConfirmModal = ({ visible, onRequestClose, onConfirm, header, message }) => {

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onRequestClose} // Called when the user taps the hardware back button
        >
            <View style={AppStyles.modalOverlay}>
                <View style={AppStyles.modalContainer}>
                    <Text style={[AppStyles.boldText, {textAlign: 'center'}]}>{header}</Text>                    
                    <Text style={[AppStyles.normalText, {textAlign: 'center'}]}>{message}</Text>
                    <View style={AppStyles.buttonContainer}>
                        <TouchableOpacity style={AppStyles.modalButton} onPress={onConfirm}>
                            <Text style={AppStyles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={AppStyles.modalButton} onPress={onRequestClose}>
                            <Text style={AppStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmModal